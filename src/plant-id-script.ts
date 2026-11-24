// Standalone PlantNet identification helper (previously src/app.ts)
// This file is kept for optional standalone usage outside React.

interface PlantNetResponse {
  results?: Array<{
    score: number;
    species: {
      scientificNameWithoutAuthor?: string;
      scientificName?: string;
      commonNames?: string[];
    };
  }>;
}

function initPlantNetScript() {
  const video = document.getElementById('camera') as HTMLVideoElement | null;
  const canvas = document.getElementById('snapshot') as HTMLCanvasElement | null;
  const captureBtn = document.getElementById('capture-btn') as HTMLButtonElement | null;
  const resultBox = document.getElementById('result-box') as HTMLDivElement | null;
  const statusMessage = document.getElementById('status-message') as HTMLDivElement | null;
  const plantNameEl = document.getElementById('plant-name') as HTMLHeadingElement | null;
  const commonNamesEl = document.getElementById('common-names') as HTMLSpanElement | null;
  const probabilityEl = document.getElementById('probability') as HTMLSpanElement | null;

  if (!video || !canvas || !captureBtn) {
    console.warn('Plant identification DOM elements not found; standalone script will not run.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream: MediaStream) => {
      if (video) video.srcObject = stream;
    })
    .catch((error: Error) => {
      console.error('Error accessing the camera:', error);
      alert('Could not access the camera. Please make sure you have given permission.');
    });

  captureBtn.addEventListener('click', async () => {
    if (!video || !canvas || !statusMessage) return;

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Canvas context not found');
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    statusMessage.style.display = 'block';
    if (resultBox) resultBox.style.display = 'none';

    try {
      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg');
      });
      if (!imageBlob) {
        throw new Error('Could not prepare the captured image for PlantNet.');
      }

      const formData = new FormData();
      formData.append('images', imageBlob, 'plant.jpg');
      formData.append('organs', 'leaf');

      const res = await fetch('/.netlify/functions/plant-identify', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Plant identification API Error (${res.status}): ${errorText || 'Unknown error'}`);
      }

      const apiResult = await res.json() as PlantNetResponse;
      statusMessage.style.display = 'none';
      const bestMatch = apiResult.results?.[0];
      const plantName = bestMatch?.species.scientificNameWithoutAuthor
        || bestMatch?.species.scientificName;

      if (bestMatch && plantName) {
        if (plantNameEl) plantNameEl.innerText = plantName;
        if (commonNamesEl) commonNamesEl.innerText = (bestMatch.species.commonNames || []).join(', ') || 'Unknown';
        const confidence = Number.isFinite(bestMatch.score)
          ? Math.min(1, Math.max(0, bestMatch.score))
          : 0;
        if (probabilityEl) probabilityEl.innerText = (confidence * 100).toFixed(2) + '%';
        if (resultBox) resultBox.style.display = 'block';
      } else {
        alert("Couldn't identify any plant in this image. Try taking a clearer picture of the leaves!");
      }
    } catch (err) {
      if (statusMessage) statusMessage.style.display = 'none';
      console.error('API Error:', err);
      alert('There was an error communicating with PlantNet. Check the console for details.');
    }
  });
}

// Initialize when DOM is ready (only for pages that include the standalone elements)
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initPlantNetScript, 0);
  } else {
    window.addEventListener('DOMContentLoaded', initPlantNetScript);
  }
}

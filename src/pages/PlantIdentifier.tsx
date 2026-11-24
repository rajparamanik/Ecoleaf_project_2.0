import { useEffect, useRef, useState } from 'react';


// ==========================================
// 📝 TYPESCRIPT INTERFACES FOR API RESPONSE
// ==========================================
interface PlantDetails {
  common_names?: string[];
  url?: string;
  wiki_description?: { value: string };
  taxonomy?: Record<string, string>;
}

interface PlantSuggestion {
  plant_name: string;
  probability: number;
  plant_details?: PlantDetails;
}

interface PlantNetTaxon {
  scientificNameWithoutAuthor?: string;
  scientificName?: string;
}

interface PlantNetResponse {
  results?: Array<{
    score: number;
    species: {
      scientificNameWithoutAuthor?: string;
      scientificName?: string;
      commonNames?: string[];
      genus?: PlantNetTaxon;
      family?: PlantNetTaxon;
    };
  }>;
  error?: string;
}

export default function PlantIdentifier() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlantSuggestion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

  // ==========================================
  // 📷 START CAMERA
  // ==========================================
  useEffect(() => {
    let metadataListener: (() => void) | null = null;
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (!videoRef.current) {
          return;
        }

        videoRef.current.srcObject = stream;

        metadataListener = () => {
          setCameraReady(true);
        };

        videoRef.current.addEventListener('loadedmetadata', metadataListener);
        if (videoRef.current.readyState >= 1) {
          setCameraReady(true);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError('Could not access the camera. Please check permissions: ' + errorMsg);
      }
    };

    startCamera();

    return () => {
      if (metadataListener && videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', metadataListener);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ==========================================
  // 🚀 CAPTURE AND SEND IMAGE
  // ==========================================
  const handleCapture = async () => {
    if (!apiAvailable) {
      setError('Plant identification is temporarily unavailable because the PlantNet API quota has been reached. Please try again later.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      setError('Video or canvas element not found');
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      setError('Canvas context not found');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check if video dimensions are available
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setError('Camera video dimensions not available. Try again.');
        setIsLoading(false);
        return;
      }

      // Set canvas to video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw frame and convert to Base64
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg');
      });
      if (!imageBlob) {
        throw new Error('Could not prepare the captured image for PlantNet.');
      }

      const formData = new FormData();
      formData.append('images', imageBlob, 'plant.jpg');
      formData.append('organs', 'leaf');

      const response = await fetch('/.netlify/functions/plant-identify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        const isPlantNetFunctionResponse = response.headers.get('X-PlantNet-Proxy') === 'true';
        let errorMessage = errorText || 'Unknown error';
        try {
          const parsed = JSON.parse(errorText) as { error?: string; message?: string };
          errorMessage = parsed.message || parsed.error || errorMessage;
        } catch {
          // Keep the response text when PlantNet does not return JSON.
        }

        if (response.status === 429) {
          setApiAvailable(false);
          errorMessage = 'The PlantNet API quota has been reached. Check your API plan and try again later.';
        } else if (response.status === 401 || response.status === 403) {
          errorMessage = `PlantNet rejected the API key or this API request is not authorized. Check that PLANTNET_API_KEY is an active key from my.plantnet.org and that your API access is enabled. ${errorMessage}`;
        } else if (response.status === 404 && !isPlantNetFunctionResponse) {
          errorMessage = 'The PlantNet proxy function was not found. Locally, run the app with "netlify dev"; when deployed, make sure the Netlify Functions deployment completed.';
        } else if (response.status === 404) {
          errorMessage = `The PlantNet API returned 404. Verify the API endpoint and that the server key has access to PlantNet identification. ${errorMessage}`;
        } else if (response.status === 503) {
          errorMessage = 'PlantNet is temporarily unavailable. Please try again in a moment.';
        }

        throw new Error(`Plant identification API Error (${response.status}): ${errorMessage}`);
      }

      const apiResult = await response.json() as PlantNetResponse;
      const bestMatch = apiResult.results?.[0];
      const plantName = bestMatch?.species.scientificNameWithoutAuthor
        || bestMatch?.species.scientificName;

      if (!bestMatch || !plantName) {
        setError('Couldn\'t identify any plant in this image. Try taking a clearer picture of the leaves!');
      } else {
        const probability = Number.isFinite(bestMatch.score)
          ? Math.min(1, Math.max(0, bestMatch.score))
          : 0;
        setResult({
          plant_name: plantName,
          probability,
          plant_details: {
            common_names: bestMatch.species.commonNames,
            taxonomy: {
              ...(bestMatch.species.family?.scientificNameWithoutAuthor
                ? { family: bestMatch.species.family.scientificNameWithoutAuthor }
                : {}),
              ...(bestMatch.species.genus?.scientificNameWithoutAuthor
                ? { genus: bestMatch.species.genus.scientificNameWithoutAuthor }
                : {}),
              species: plantName,
            },
          },
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError('Error: ' + errorMsg);
      console.error('Plant identification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🌿 Plant Identifier</h1>
          <p className="text-gray-600">
            Take a photo of any plant leaf to identify the species and learn more about it!
          </p>
        </div>

        {/* Camera Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="aspect-square bg-black relative overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {!cameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="text-white text-center">
                  <div className="mb-4">📷 Loading camera...</div>
                </div>
              </div>
            )}
          </div>

          {/* Canvas for image processing (hidden) */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Buttons */}
          <div className="bg-gray-100 p-6 flex flex-col gap-4 justify-center">
            <button
              onClick={handleCapture}
              disabled={!cameraReady || isLoading || !apiAvailable}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              {isLoading ? '🔄 Processing...' : '📸 Capture & Identify'}
            </button>
            {!apiAvailable && (
              <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3">
                Plant identification is temporarily unavailable because the PlantNet API quota was reached.
                Please check your PlantNet API plan or try again later.
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-4">{result.plant_name}</h2>

            {result.plant_details?.common_names && (
              <div className="mb-4">
                <p className="text-gray-700 font-semibold">Common Names:</p>
                <p className="text-gray-600">{result.plant_details.common_names.join(', ')}</p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Confidence:</p>
              <p className="text-green-600 text-lg font-bold">{(result.probability * 100).toFixed(2)}%</p>
            </div>

            {result.plant_details?.wiki_description?.value && (
              <div className="mb-4">
                <p className="text-gray-700 font-semibold mb-2">Description:</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {result.plant_details.wiki_description.value}
                </p>
              </div>
            )}

            {result.plant_details?.taxonomy && (
              <div>
                <p className="text-gray-700 font-semibold mb-2">Taxonomy:</p>
                <div className="bg-gray-50 p-4 rounded text-sm space-y-1">
                  {Object.entries(result.plant_details.taxonomy).map(([key, value]) => (
                    <p key={key} className="text-gray-600">
                      <span className="font-semibold capitalize">{key}:</span> {value}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setResult(null)}
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Take Another Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const FUNCTION_HEADERS = {
  'X-PlantNet-Proxy': 'true',
  'Cache-Control': 'no-store',
};

export default async (request, apiKey = process.env.PLANTNET_API_KEY) => {
  if (request.method !== 'POST') {
    return Response.json({ message: 'Method not allowed.' }, {
      status: 405,
      headers: FUNCTION_HEADERS,
    });
  }

  if (!apiKey) {
    return Response.json(
      { message: 'PlantNet API key is not configured on the server.' },
      { status: 500, headers: FUNCTION_HEADERS },
    );
  }

  const incomingForm = await request.formData();
  const images = incomingForm.getAll('images');
  if (
    images.length === 0
    || images.some((image) => !(image instanceof File) || image.size > MAX_IMAGE_SIZE_BYTES)
  ) {
    return Response.json(
      { message: 'Provide a plant image smaller than 5 MB.' },
      { status: 400, headers: FUNCTION_HEADERS },
    );
  }

  const plantNetForm = new FormData();
  for (const image of images) {
    plantNetForm.append('images', image);
  }
  const organ = incomingForm.get('organs');
  if (typeof organ === 'string' && organ) {
    plantNetForm.append('organs', organ);
  }

  const plantNetUrl = new URL('https://my-api.plantnet.org/v2/identify/all');
  plantNetUrl.searchParams.set('include-related-images', 'false');
  plantNetUrl.searchParams.set('no-reject', 'false');
  plantNetUrl.searchParams.set('lang', 'en');
  plantNetUrl.searchParams.set('api-key', apiKey);

  const upstreamResponse = await fetch(plantNetUrl, {
    method: 'POST',
    body: plantNetForm,
  });
  const responseBody = await upstreamResponse.text();

  return new Response(responseBody, {
    status: upstreamResponse.status,
    headers: {
      ...FUNCTION_HEADERS,
      'Content-Type': upstreamResponse.headers.get('Content-Type') || 'application/json',
    },
  });
};

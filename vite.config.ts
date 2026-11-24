import { loadEnv, defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import handlePlantIdentify from './netlify/functions/plant-identify.mjs'

const MAX_PROXY_BODY_BYTES = 6 * 1024 * 1024

function localPlantIdentifyFunction(apiKey: string | undefined): Plugin {
  return {
    name: 'local-plant-identify-function',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestUrl = new URL(request.url || '/', 'http://localhost')
        if (requestUrl.pathname !== '/.netlify/functions/plant-identify') {
          next()
          return
        }

        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end('{"message":"Method not allowed."}')
          return
        }

        try {
          const chunks: Uint8Array[] = []
          let bodySize = 0
          for await (const chunk of request) {
            const bytes = typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk
            bodySize += bytes.byteLength
            if (bodySize > MAX_PROXY_BODY_BYTES) {
              response.statusCode = 413
              response.end('{"message":"Image upload is too large."}')
              return
            }
            chunks.push(bytes)
          }

          const body = new Uint8Array(bodySize)
          let offset = 0
          for (const chunk of chunks) {
            body.set(chunk, offset)
            offset += chunk.byteLength
          }

          const headers = new Headers()
          const contentType = request.headers['content-type']
          if (contentType) {
            headers.set('Content-Type', contentType)
          }

          const functionResponse = await handlePlantIdentify(
            new Request(new URL(request.url || '/', 'http://localhost'), {
              method: request.method,
              headers,
              body,
            }),
            apiKey,
          )

          response.statusCode = functionResponse.status
          functionResponse.headers.forEach((value, name) => response.setHeader(name, value))
          response.end(new Uint8Array(await functionResponse.arrayBuffer()))
        } catch (error) {
          console.error('Local PlantNet function failed:', error)
          if (!response.headersSent) {
            response.statusCode = 502
            response.setHeader('Content-Type', 'application/json')
            response.end('{"message":"Local PlantNet function failed. Check the Vite server logs."}')
          }
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      localPlantIdentifyFunction(env.PLANTNET_API_KEY),
    ],
    server: {
      port: 5173,
      strictPort: false,
      cors: true,
    },
    build: {
      sourcemap: true,
    },
  }
})

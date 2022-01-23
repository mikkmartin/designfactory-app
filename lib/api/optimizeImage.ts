import baseURL from 'lib/static/baseURL'
import type { ImageRef } from './getFigmaImages'
const privateKey = process.env.SUPABASE_SECRET_KEY

export const optimizeImage = async (ref: ImageRef): Promise<Blob> =>
  fetch(`${baseURL}/api/optimize-image`, {
    method: 'POST',
    body: JSON.stringify({
      url: ref.url,
      width: ref.width * 2,
      height: ref.height * 2,
      privateKey,
    }),
  }).then(res => res.blob())

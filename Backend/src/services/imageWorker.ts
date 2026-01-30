import { callImageAI } from "./aiClient"

export async function runImageWorker(
  imageBuffer: Buffer,
  filename: string
): Promise<{ enhancedImageUrl: string }> {

  const processedImage = await callImageAI(imageBuffer, filename)
  const base64 = processedImage.toString("base64")

  return {
    enhancedImageUrl: `data:image/png;base64,${base64}`
  }
}

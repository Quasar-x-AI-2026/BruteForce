// import axios from "axios";
// import FormData from "form-data";

// export async function callImageAI(
//   fileBuffer: Buffer,
//   filename: string
// ): Promise<Buffer> {

//   const form = new FormData();
//   form.append("file", fileBuffer, {
//     filename,
//     contentType: "image/jpeg"
//   });

//   const response = await axios.post<ArrayBuffer>(
//     "http://localhost:8000/process",
//     form,
//     {
//       headers: form.getHeaders(),
//       responseType: "arraybuffer",
//       timeout: 15000
//     }
//   );

//   return Buffer.from(response.data);
// }
import axios from "axios"
import FormData from "form-data"

const AI_SERVICE_URL = process.env.AI_SERVICE_URL

if (!AI_SERVICE_URL) {
  throw new Error("AI_SERVICE_URL is not set")
}

export async function callImageAI(
  fileBuffer: Buffer,
  filename: string
) {
  const form = new FormData()
  form.append("file", fileBuffer, filename)

  const response = await axios.post(
    `${AI_SERVICE_URL}/enhance`,
    form,
    {
      headers: form.getHeaders(),
      timeout: 60000, // AI inference can be slow
    }
  )

  return response.data
}

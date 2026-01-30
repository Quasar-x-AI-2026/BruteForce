import axios from "axios";
import FormData from "form-data";

export async function callImageAI(
  fileBuffer: Buffer,
  filename: string
): Promise<Buffer> {

  const form = new FormData();
  form.append("file", fileBuffer, {
    filename,
    contentType: "image/jpeg"
  });

  const response = await axios.post<ArrayBuffer>(
    "http://localhost:8000/process",
    form,
    {
      headers: form.getHeaders(),
      responseType: "arraybuffer",
      timeout: 15000
    }
  );

  return Buffer.from(response.data);
}

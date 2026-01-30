export async function enhanceImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("http://127.0.0.1:8000/enhance", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    throw new Error("Enhancement failed")
  }

  return res.json()
}

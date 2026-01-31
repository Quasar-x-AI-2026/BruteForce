// export async function enhanceImage(file: File) {
//   const formData = new FormData()
//   formData.append("file", file)

//   const res = await fetch("http://127.0.0.1:8000/enhance", {
//     method: "POST",
//     body: formData,
//   })

//   if (!res.ok) {
//     throw new Error("Enhancement failed")
//   }

//   return res.json()
// }
export async function enhanceImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/upload`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!res.ok) {
    throw new Error("Enhance failed")
  }

  return await res.json()
}

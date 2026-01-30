
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setProgress(5)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://localhost:8000/enhance", {
        method: "POST",
        body: formData
      })

      if (!res.ok) {
        throw new Error("Enhance failed")
      }

      const data = await res.json()

      setProgress(92)

      navigate("/result", {
        state: {
          image: data.image,
          title: data.title,
          description: data.description,
          price: data.price
        }
      })
    } catch {
      alert("Upload failed. Please try again.")
      setUploading(false)
      setProgress(0)
    }
  }

  useEffect(() => {
    if (!uploading) return

    let current = 5
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3
      if (current >= 90) {
        current = 90
        clearInterval(interval)
      }
      setProgress(current)
    }, 250)

    return () => clearInterval(interval)
  }, [uploading])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="card w-full max-w-sm min-h-[90vh] flex flex-col">

        {/* BRAND */}
        <div className="brand mb-6">
          <span className="brand-icon"><img src="/images/letter-k.ico" className="brand-logo" alt="brand logo" /></span>
          <span>Krafti</span>
        </div>

        {/* UPLOAD STATE */}
        {!uploading && (
          <>
            <h1 className="heading">
              Upload Your Craft
            </h1>

            <p className="subtitle mt-3">
              Turn a simple photo into a professional product listing
            </p>

            <div
              onClick={handleUploadClick}
              className="upload-box mt-10"
            >
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />

              <div className="icon-circle">
                📷
              </div>
            </div>

            <p className="mt-4 text-sm text-center text-[var(--text-muted)]">
              Tap to upload a product photo
            </p>
          </>
        )}

        {/* LOADING STATE */}
        {uploading && (
          <>
            <h1 className="heading">
              Creating Your Listing
            </h1>

            <p className="subtitle mt-3">
              Enhancing image and generating details
            </p>

            <div className="mt-12">

              <div className="flex justify-between text-sm font-semibold text-[var(--text-muted)] mb-2">
                <span>Analyzing…</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full h-3 rounded-full overflow-hidden bg-[var(--border-glass)]">
                <div
                  className="h-full bg-[var(--primary)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  )
}

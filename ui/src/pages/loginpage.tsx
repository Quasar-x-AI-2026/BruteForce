import { useEffect } from "react"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    /* Changed bg-[#e7ded3] to bg-[var(--bg)] */
    <div className="min-h-screen bg-[var(--bg)] px-4 py-10 flex justify-center items-center">
      
      {/* Added the .card class here */}
      <div className="card relative w-full max-w-sm flex flex-col overflow-hidden">

        {/* Brand Header */}
        <div className="brand mb-6">
          <div className="brand-icon"></div>
          <span>Krafti</span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <h1 className="heading">
            Enhance Your Craft
          </h1>

          <p className="subtitle mt-4">
            Turn simple phone photos into professional product images
          </p>

          <button
            onClick={handleGoogleLogin}
            className="cta-btn mt-8 w-full"
          >
            Continue with Google
          </button>

          <div className="my-10 h-px bg-[var(--border-glass)]" />

          {/* AI Preview Section */}
          <div className="preview w-full h-40 flex items-center justify-center text-[var(--text-muted)] text-sm font-medium">
            Product photo → Enhanced image
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-main)]">
                Studio-Quality Photos, Instantly
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                Upload a raw mobile photo. Krafti’s AI automatically enhances lighting, 
                background, and clarity — no studio needed.
              </p>
            </div>
          </div>

          <p className="mt-auto pt-10 text-[10px] text-center text-[var(--text-muted)] opacity-50">
            By continuing, you agree to Krafti’s Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
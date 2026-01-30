

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google"
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="card w-full max-w-sm min-h-[90vh] flex flex-col relative overflow-hidden">

        {/* WATERMARK */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <span className="text-[120px] font-black tracking-tight">
            Krafti
          </span>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full">

          {/* BRAND */}
          <div className="brand mb-4">
            <span className="brand-icon"><img src="/images/letter-k.ico" className="brand-logo" alt="brand logo" /></span>
            <span>Krafti</span>
          </div>

          {/* TITLE */}
          <h1 className="heading mt-4">
            Enhance Your Craft
          </h1>

          <p className="subtitle mt-3">
            Get paid for the heart you put in.
          </p>

          {/* CTA */}
          <button
            onClick={handleGoogleLogin}
            className="cta-btn mt-8"
          >
            Continue with Google
          </button>

          {/* DIVIDER */}
          <div className="my-10 h-px bg-[var(--border-glass)]" />

          {/* PREVIEW 1 */}
          <div className="preview h-50 flex items-center justify-center text-sm text-[var(--text-muted)]">
            <img src="/images/BeforeAfter.png" alt="BeforeAfter" />
          </div>

          {/* STORY */}
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">

            <div>
              <h3 className="font-bold text-[var(--text-main)] mb-1">
                Studio-Quality Photos, Instantly
              </h3>
              <p>
                Upload a raw mobile photo of your product. Krafti’s AI
                automatically enhances lighting, background, and clarity —
                no studio required.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[var(--text-main)] mb-1">
                Faster Than Traditional Editing
              </h3>
              <p>
                Skip photographers, editing tools, and long delays.
                What once took days now takes minutes.
              </p>
            </div>

          </div>

          

          {/* VALUE */}
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">

            <div>
              <h3 className="font-semibold text-[var(--text-main)] mb-1">
                Ready for Global Marketplaces
              </h3>
              <p>
                Designed to meet product listing standards for platforms
                like Amazon, Etsy, Flipkart, and eBay.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[var(--text-main)] mb-1">
                Built for Local Artisans
              </h3>
              <p>
                Empowering independent creators to present their work
                professionally without technical complexity.
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <p className="mt-auto pt-8 text-xs text-center text-[var(--text-muted)]">
            By continuing, you agree to Krafti’s Terms & Privacy Policy
          </p>

        </div>
      </div>
    </div>
  )
}

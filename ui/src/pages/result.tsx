
import { useLocation, useNavigate } from "react-router-dom"
import { confidenceLabel } from "../utils/priceConfidence"
import { underpricingHint } from "../utils/underpricingHint"

export default function ResultPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-sm w-full">
          <p className="text-sm text-[var(--text-muted)]">
            No result found.
          </p>
          <button
            onClick={() => navigate("/upload")}
            className="cta-btn mt-6"
          >
            Upload Product
          </button>
        </div>
      </div>
    )
  }


  function handleDownload() {
    if (!state.image) return

    const link = document.createElement("a")
    link.href = state.image
    link.download =
      `${state.title ?? "krafti-product"}`
        .replace(/\s+/g, "-")
        .toLowerCase() + ".jpg"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function handleShare() {
    if (!state.image) return

    const title = state.title ?? "Krafti Product"
    const text =
      Array.isArray(state.description)
        ? state.description.join(" ")
        : state.description ?? "Created using Krafti"

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: state.image
        })
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(state.image)
      alert("Image link copied to clipboard")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center px-4 pb-24">

      <div className="card w-full max-w-sm flex flex-col relative overflow-hidden">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 text-[var(--text-muted)] text-lg"
        >
          ←
        </button>

        {/* TITLE */}
        <h1 className="heading mt-6">
          {state.title}
        </h1>

        {/* IMAGE */}
        <div className="preview mt-6 h-72 flex items-center justify-center">
          <img
            src={state.image}
            alt="Enhanced"
            className="w-full h-full object-contain"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="subtitle mt-5">
          {Array.isArray(state.description)
            ? state.description.join(" ")
            : state.description}
        </p>

        {/* PRICE BLOCK */}
        <div className="mt-8 p-5 rounded-2xl border border-[var(--border-glass)] text-center">

          <p className="text-xs text-[var(--text-muted)]">
            Suggested Price
          </p>

          <p className="text-2xl font-bold mt-1 text-[var(--text-main)]">
            {typeof state.price === "string"
              ? state.price
              : state.price && typeof state.price === "object"
                ? `₹${state.price.min} – ₹${state.price.max}`
                : "—"}
          </p>

          <p className="text-xs text-[var(--text-muted)] mt-1">
            {confidenceLabel(state.price?.confidence)}
          </p>

          <p className="text-xs text-[var(--text-muted)] mt-2">
            Estimated from material, craftsmanship, and category
          </p>

          {state.price?.rationale && (
            <details className="mt-2">
              <summary className="text-xs cursor-pointer text-[var(--primary)]">
                Why this price?
              </summary>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                {state.price.rationale}
              </p>
            </details>
          )}

          {underpricingHint(state.price?.confidence) && (
            <p className="text-xs text-[var(--accent)] mt-3">
              {underpricingHint(state.price?.confidence)}
            </p>
          )}
        </div>
{/* MARKETPLACE READY */}
<div className="mt-8 p-5 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border-glass)]">
  <p className="text-sm font-medium text-[var(--text-main)] mb-3">
    Ready for marketplaces
  </p>

  <ul className="space-y-2 text-sm">
    <li className="flex items-center gap-2">
      <span className="text-[var(--primary)]">✔</span>
      <a
        href="https://sellercentral.amazon.in"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Amazon Seller Central
      </a>
    </li>

    <li className="flex items-center gap-2">
      <span className="text-[var(--primary)]">✔</span>
      <a
        href="https://seller.flipkart.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Flipkart Seller Hub
      </a>
    </li>

    <li className="flex items-center gap-2">
      <span className="text-[var(--primary)]">✔</span>
      <a
        href="https://www.etsy.com/your/shops/me"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Etsy Shop Manager
      </a>
    </li>

    <li className="flex items-center gap-2">
      <span className="text-[var(--primary)]">✔</span>
      <a
        href="https://www.ebay.com/sh/ovw"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        eBay Seller Hub
      </a>
    </li>
  </ul>
</div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleShare}
            className="cta-btn-secondary flex-1"
          >
            📤 Share
          </button>

          <button
            onClick={handleDownload}
            className="cta-btn flex-1"
          >
            ⬇️ Download
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/upload")}
          className="cta-btn mt-6"
        >
          Upload Another Product
        </button>

      </div>
    </div>
  )
}

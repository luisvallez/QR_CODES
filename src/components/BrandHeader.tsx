import { QrCode, Sparkles } from "lucide-react"

export function BrandHeader() {
  return (
    <header className="brand-header">
      <div className="brand-mark" aria-hidden="true">
        <QrCode size={26} strokeWidth={2.2} />
      </div>
      <div>
        <p className="eyebrow">
          <Sparkles size={13} /> Quick utility
        </p>
        <h1>Generador QR</h1>
      </div>
      <span className="status-dot" title="Listo para generar" />
    </header>
  )
}

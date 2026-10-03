import { Download } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { QR_CANVAS_ID, QR_SIZE } from "../constants/qr"

type QrResultProps = {
  value: string
  onDownload: () => void
}

export function QrResult({ value, onDownload }: QrResultProps) {
  return (
    <section className="result-section" aria-label="Código QR generado">
      <div className="result-heading">
        <div>
          <p className="eyebrow">Resultado</p>
          <h2>Tu código está listo</h2>
        </div>
        <span className="resolution-badge">{QR_SIZE} px</span>
      </div>
      <div className="qr-frame">
        <QRCodeCanvas
          id={QR_CANVAS_ID}
          value={value}
          size={QR_SIZE}
          level="H"
          includeMargin
          className="qr-canvas"
        />
      </div>
      <button className="secondary-button" onClick={onDownload} type="button">
        <Download size={18} />
        Descargar PNG
      </button>
    </section>
  )
}

import { useState, type FormEvent } from "react"
import { QRCodeCanvas } from "qrcode.react"
import {
  AlertCircle,
  ArrowUpRight,
  Download,
  QrCode,
  Sparkles,
} from "lucide-react"
import "./App.css"

const QR_CANVAS_ID = "qr-canvas-1000"

type GeneratorFormProps = {
  value: string
  error: string
  isGenerating: boolean
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function BrandHeader() {
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

function GeneratorForm({
  value,
  error,
  isGenerating,
  onChange,
  onSubmit,
}: GeneratorFormProps) {
  return (
    <form className="generator-form" onSubmit={onSubmit}>
      <label htmlFor="qr-input">Contenido del código</label>
      <div className={`input-shell ${error ? "has-error" : ""}`}>
        <input
          id="qr-input"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://tu-sitio.com"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "qr-error" : undefined}
        />
        <ArrowUpRight size={19} aria-hidden="true" />
      </div>
      {error && (
        <p id="qr-error" className="error-message" role="alert">
          <AlertCircle size={16} />
          {error}
        </p>
      )}
      <button className="primary-button" type="submit" disabled={isGenerating}>
        <span>{isGenerating ? "Generando..." : "Crear código QR"}</span>
        <ArrowUpRight size={19} />
      </button>
    </form>
  )
}

type QrResultProps = {
  value: string
  onDownload: () => void
}

function QrResult({ value, onDownload }: QrResultProps) {
  return (
    <section className="result-section" aria-label="Código QR generado">
      <div className="result-heading">
        <div>
          <p className="eyebrow">Resultado</p>
          <h2>Tu código está listo</h2>
        </div>
        <span className="resolution-badge">1000 px</span>
      </div>
      <div className="qr-frame">
        <QRCodeCanvas
          id={QR_CANVAS_ID}
          value={value}
          size={1000}
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

export default function App() {
  const [inputValue, setInputValue] = useState("")
  const [qrValue, setQrValue] = useState("")
  const [error, setError] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!inputValue.trim()) {
      setError("Por favor, ingresa un enlace o texto válido.")
      return
    }

    setError("")
    setIsGenerating(true)

    setTimeout(() => {
      setQrValue(inputValue.trim())
      setIsGenerating(false)
    }, 400)
  }

  const handleDownload = () => {
    const canvas = document.getElementById(
      QR_CANVAS_ID,
    ) as HTMLCanvasElement | null
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "mi-codigo-qr-1000px.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="glass-card">
        <div className="glass-highlight" aria-hidden="true" />
        <div className="card-content">
          <BrandHeader />
          <p className="intro-copy">
            Convierte cualquier enlace o texto en una pieza digital lista para
            compartir.
          </p>
          <GeneratorForm
            value={inputValue}
            error={error}
            isGenerating={isGenerating}
            onChange={(value) => {
              setInputValue(value)
              if (error) setError("")
            }}
            onSubmit={handleGenerate}
          />
          {qrValue && <QrResult value={qrValue} onDownload={handleDownload} />}
        </div>
        <footer className="card-footer">
          <span>Privado por diseño</span>
          <span>•</span>
          <span>Sin registro</span>
        </footer>
      </section>
    </main>
  )
}

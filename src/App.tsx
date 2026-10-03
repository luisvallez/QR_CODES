import { BrandHeader } from "./components/BrandHeader"
import { GeneratorForm } from "./components/GeneratorForm"
import { QrResult } from "./components/QrResult"
import { useQrGenerator } from "./hooks/useQrGenerator"
import { downloadQrCode } from "./utils/downloadQr"
import "./App.css"

export default function App() {
  const {
    inputValue,
    qrValue,
    error,
    isGenerating,
    handleInputChange,
    handleGenerate,
  } = useQrGenerator()

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
            onChange={handleInputChange}
            onSubmit={handleGenerate}
          />
          {qrValue && (
            <QrResult value={qrValue} onDownload={downloadQrCode} />
          )}
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

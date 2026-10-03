import { AlertCircle, ArrowUpRight } from "lucide-react"
import type { FormEvent } from "react"

type GeneratorFormProps = {
  value: string
  error: string
  isGenerating: boolean
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function GeneratorForm({
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

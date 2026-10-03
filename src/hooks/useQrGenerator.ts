import { useEffect, useRef, useState, type FormEvent } from "react"
import { GENERATION_DELAY_MS } from "../constants/qr"

const EMPTY_VALUE_ERROR = "Por favor, ingresa un enlace o texto válido."

export function useQrGenerator() {
  const [inputValue, setInputValue] = useState("")
  const [qrValue, setQrValue] = useState("")
  const [error, setError] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const generationTimeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (generationTimeout.current) {
        window.clearTimeout(generationTimeout.current)
      }
    }
  }, [])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (error) setError("")
  }

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedValue = inputValue.trim()
    if (!normalizedValue) {
      setError(EMPTY_VALUE_ERROR)
      return
    }

    setError("")
    setIsGenerating(true)

    generationTimeout.current = window.setTimeout(() => {
      setQrValue(normalizedValue)
      setIsGenerating(false)
    }, GENERATION_DELAY_MS)
  }

  return {
    inputValue,
    qrValue,
    error,
    isGenerating,
    handleInputChange,
    handleGenerate,
  }
}

import { QR_CANVAS_ID, QR_DOWNLOAD_NAME } from "../constants/qr"

export function downloadQrCode() {
  const canvas = document.getElementById(QR_CANVAS_ID)
  if (!(canvas instanceof HTMLCanvasElement)) {
    return
  }

  const link = document.createElement("a")
  link.href = canvas.toDataURL("image/png")
  link.download = QR_DOWNLOAD_NAME
  document.body.appendChild(link)
  link.click()
  link.remove()
}

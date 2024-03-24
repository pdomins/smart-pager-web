import { Restaurant } from '@/types/restaurant'
import { useQRCode } from 'next-qrcode'
import React, { useState } from 'react'
import qrframe from '../../../../../app/images/printqr.png'
import QRCode from 'qrcode-svg'

export default function RestaurantQR({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const { Canvas } = useQRCode() // esto no setea un QR nuevo cada vez? no deberia estar guardado siempre el mismo?
  const [qrUrl, setQrUrl] = useState(
    'https://smart-pager-web.vercel.app/' + restaurantData.slug
  )

  const handlePrintQR = () => {
    const qr = new QRCode(qrUrl)

    const imgWindow = window.open('')

    const loadImg = () => {
      if (imgWindow) {
        imgWindow.document.write(`
          <html>
            <head>
              <title>QR Code Image</title>
              <style>
                body {
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                .container {
                  position: relative;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .overlay {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  margin-top: 10px;
                }
                img {
                  width: 100%;
                  height: auto;
                  margin: 20px;
                }
                .print-area {
                  position: relative;
                  margin: 0 auto;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-items: center;
                }
                .print-info {
                  display: none;
                }
                @media print {
                  img {
                    width: 100%;
                    height: 100%; 
                  }
                  .print-info {
                    display: none !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="print-area">
                  <img src="${qrframe.src}" alt="QR Code Frame">
                  <div class="overlay">
                    ${qr.svg()}
                  </div>
                </div>
              </div>
            </body>
          </html>
        `)
      }
    }

    loadImg()

    setTimeout(() => {
      if (imgWindow) {
        imgWindow.print()
      }
    }, 50)
  }

  return (
    <>
      <div className="flex items-center justify-center text-center mt-4 mb-4">
        <Canvas
          text={qrUrl}
          options={{
            errorCorrectionLevel: 'M',
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: '#000000',
              light: '#FFFFFFFF',
            },
          }}
        />
      </div>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-mó">
        <form action="upload.php">
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">
              Utilice este código QR para que sus clientes puedan anotarse
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4 mb-4"
              onClick={() => {
                const updatedUrl =
                  'https://smartpager.com.ar/' + restaurantData.slug
                setQrUrl(updatedUrl)
              }}
            >
              Actualizar QR
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
              onClick={handlePrintQR}
            >
              Imprimir QR
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

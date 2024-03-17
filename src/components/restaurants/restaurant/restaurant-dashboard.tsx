'use client'
import { Tab, Tabs } from '@mui/material'
import React, { useState, useRef } from 'react'
import RestaurantCard from './restaurant-card'
import TabPanel from './tab-panel'
import { useQRCode } from 'next-qrcode'
import { Restaurant } from '@/types/restaurant'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/navigation'
import qrframe from '../../../app/images/printqr.png'
import QRCode from 'qrcode-svg'
import {updateRestaurantMenu, getRestaurantMenu} from '@/repositories/restaurant-respository'

export default function RestaurantDashboard({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const [value, setValue] = useState(0)
  const { Canvas } = useQRCode()
  const router = useRouter()
  const [qrUrl, setQrUrl] = useState(
    'https://smartpager.com.ar/' + restaurantData.slug
  )
  const inputFileRef = useRef<HTMLInputElement>(null);



  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

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

  const tabStyle = 'capitalize'

  return (
    <div>
      <div className="flex justify-between align-center">
        <div></div>
        <p className="text-5xl mb-4 mt-2 text-center pt-2">
          <b>{restaurantData.name}</b>
        </p>
        <button
          onClick={() => router.push('/restaurants/profile')}
          className="text-3xl hover:text-sky-700"
        >
          <AccountCircleIcon
            style={{ fontSize: '50px' }}
            className="mt-3 hover:text-sky-700"
          />
        </button>
      </div>
      <div className="flex justify-center">
        <Tabs
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile
          scrollButtons="auto"
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="tabs"
        >
          <Tab className={tabStyle} label={'Fila de comensales'} />
          <Tab className={tabStyle} label={'Retiro de pedidos'} />
          <Tab className={tabStyle} label={'Menú'} />
          <Tab className={tabStyle} label={'QR'} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0} other={''}>
        <RestaurantCard
          orderNumber="Orden 001 - "
          description="Tres Personas"
        />
        <RestaurantCard orderNumber="Orden 002 - " description="Dos Personas" />
        <RestaurantCard
          orderNumber="Orden 003 - "
          description="Cinco Personas"
        />
      </TabPanel>
      <TabPanel value={value} index={1} other={''}>
        <RestaurantCard
          orderNumber="Orden 001 - "
          description="Pedido: milanesa con papas"
        />
        <RestaurantCard
          orderNumber="Orden 002 - "
          description="Pedido: coca cola grande"
        />
        <RestaurantCard
          orderNumber="Orden 003 - "
          description="Pedido: papas con cheddar"
        />
      </TabPanel>
      <TabPanel value={value} index={2} other={''}>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Subir el menú</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!inputFileRef.current || !inputFileRef.current.files) {
                alert("Ningún archivo seleccionado"); //TODO MODAL?
                return;
              }

              const file = inputFileRef.current.files[0];

              if (!file.name.toLowerCase().endsWith('.pdf')) {
                alert('El archivo debe estar en formato PDF.'); //TODO MODAL?
                return;
              }

              const response = await fetch(`/api/restaurants/upload?filename=${restaurantData.id}`, {
                method: 'POST',
                body: file,
              });

              if(response.ok) {
                alert("Menú subido con éxito.") //TODO MODAL ?
                const menu_response = await getRestaurantMenu(restaurantData.id);
             
                console.log(menu_response)

                await fetch(`/api/restaurants/upload?url=${menu_response}`, {
                  method: 'DELETE'
                });

                const responseData = await response.json();
                updateRestaurantMenu(restaurantData.id, responseData.url);
              }
              else
                alert("Error al subir el menú.")// TODO MODAL ?
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                Elige un archivo en formato PDF - esto es lo que verán sus clientes:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                ref={inputFileRef}
                accept=".pdf"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Subir archivo
            </button>
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3} other={''}>
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
      </TabPanel>
    </div>
  )
}


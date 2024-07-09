import React from 'react'
import Container from '../style/container'
import Gradient from '../style/gradient'

export default function RestaurantGetStarted() {
  return (
    <div className="relative" id="get-started">
      <Gradient />
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="font-bold text-5xl md:text-6xl xl:text-7xl">
              Usar <span className="text-purple-800">Smart Pager</span> es
              rápido.
            </h1>
            <p className="mt-8 text-gray-700">
              Seguí estos sencillos pasos y optimizá la gestión de tu
              restaurante en minutos.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-lg font-semibold">1. Registrarse</h2>
                <p className="mt-2 text-sm">
                  Hacé click en el botón de{' '}
                  <span className="text-violet-500 font-semibold">
                    Registrarse
                  </span>
                  , ubicado en la esquina superior derecha, y creá tu cuenta.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-lg font-semibold">
                  2. Llenar la información
                </h2>
                <p className="mt-2 text-sm">
                  Completá los detalles de tu restaurante en nuestro formulario.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-lg font-semibold">
                  3. Esperar verificación
                </h2>
                <p className="mt-2 text-sm">
                  Podemos demorar hasta 24 horas, pero nos pondremos en contacto
                  con vos.
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-lg bg-white">
                <h2 className="text-lg font-semibold">
                  4. Disfruta de Smart Pager
                </h2>
                <p className="mt-2 text-sm">
                  ¡Empezá a gestionar las colas y pedidos de tu restaurante
                  eficientemente!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

import React from 'react'
import Container from '../style/container'
import Gradient from '../style/gradient'

export default function RestautantMoreInfo() {
  return (
    <div className="relative" id="info">
      <Gradient />
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl">
              Todo lo que <span className="text-purple-800">necesitas</span>{' '}
              saber
            </h1>
            <p className="mt-8 text-gray-700">
              Descubre cómo Smart Pager puede revolucionar la forma en que tu
              restaurante interactúa con los clientes.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h2 className="text-lg font-semibold text-purple-800">
                Fácil Integración
              </h2>
              <p className="mt-4 text-gray-600">
                Integrar Smart Pager en tu negocio es fácil y rápido.
                Contáctanos para saber cómo.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h2 className="text-lg font-semibold text-purple-800">
                Mejora la Experiencia del Cliente
              </h2>
              <p className="mt-4 text-gray-600">
                Ofrece a tus clientes una experiencia sin igual, minimizando
                tiempos de espera.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white">
              <h2 className="text-lg font-semibold text-purple-800">
                Análisis y Reportes
              </h2>
              <p className="mt-4 text-gray-600">
                Toma decisiones informadas con nuestros detallados análisis y
                reportes.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center px-6 py-3 mb-6 text-white bg-purple-700 rounded-full font-semibold hover:bg-purple-800 transition duration-300"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

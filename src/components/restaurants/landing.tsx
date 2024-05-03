'use client'

import React from 'react'
import Container from '../style/container'
import { useRouter } from 'next/navigation'
import Gradient from '../style/gradient'

export default function RestaurantLanding() {
  const router = useRouter()

  return (
    <div className="relative" id="home">
      <Gradient />
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <h1 className="font-bold text-5xl md:text-6xl xl:text-7xl">
              Decile <span className="text-purple-800">adiós</span> a las filas
              eternas.
            </h1>
            <p className="mt-8 text-gray-700">
              Smart Pager transforma tu comercio, centralizando en una sola
              plataforma la gestión de tu menú y la atención de clientes en
              espera. Eficiencia y comodidad en un solo lugar. ¿Listo para la
              innovación?
            </p>
            <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <button className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max">
                <span className="relative text-white font-semibold text-white">
                  Comenzar
                </span>
              </button>
              <button
                onClick={() => router.push('info')}
                className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-violet-700/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-purple-700 font-semibold">
                  Más Información
                </span>
              </button>
            </div>

            <div className="hidden py-8 mt-16 border-y border-gray-100  sm:flex justify-between">
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700">
                  El precio más bajo
                </h6>
                <p className="mt-2 text-gray-500">
                  Ofrecemos el mejor servicio al precio más competitivo.
                </p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 ">
                  El más rápido del mercado
                </h6>
                <p className="mt-2 text-gray-500">
                  Velocidad sin precedentes en cada orden, maximizando la
                  satisfacción de tus clientes.
                </p>
              </div>
              <div className="text-left">
                <h6 className="text-lg font-semibold text-gray-700 ">
                  El más querido
                </h6>
                <p className="mt-2 text-gray-500">
                  La opción favorita de restaurantes y comensales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

import React from 'react'

import { SignInWithGoogleButton } from '../login/google-button'
import InfoIcon from '@mui/icons-material/Info'

export default function RestaurantsSignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 w-full lg:w-1/2">
        <h1 className="text-3xl font-bold text-center mb-4">
          Despídete de las filas eternas
        </h1>
        <div className="bg-blue-100 text-blue-800 text-sm font-semibold mb-4 p-4 rounded-lg flex items-center text-justify">
          <InfoIcon
            className="w-6 h-6 text-blue-800 mr-2"
            aria-label="Información"
          />
          <span>
            Smart Pager transforma su comercio, centralizando en una sola
            plataforma la gestión de su menú y la atención de clientes en
            espera. Eficiencia y comodidad en un solo lugar. ¿Listo para la
            innovación? ¡Comience ahora mismo!
          </span>
        </div>
        <div className="text-center mt-10">
          <SignInWithGoogleButton />
        </div>
        <p className="text-xs text-center mt-4">
          Al iniciar sesión con Smart Pager, aceptas los{' '}
          <a
            href="/#"
            className="text-blue-600 hover:underline"
            rel="noopener noreferrer"
          >
            Términos de Servicio
          </a>{' '}
          y la{' '}
          <a
            href="/#"
            className="text-blue-600 hover:underline"
            rel="noopener noreferrer"
          >
            Política de Privacidad
          </a>
          .
        </p>
      </div>
    </div>
  )
}

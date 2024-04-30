import React from 'react'
import { useRouter } from 'next/navigation'
import Gradient from '@/components/style/gradient'
import Container from '@/components/style/container'

export default function RegistrationSuccess() {
  const router = useRouter()

  return (
    <div className="relative" id="registration-success">
      <Gradient />
      <Container>
        <div className="pt-36 text-center mx-auto">
          <h1 className="font-bold text-5xl md:text-6xl xl:text-7xl">
            ¡Gracias por <span className="text-purple-800">registrarte</span>!
          </h1>
          <p className="mt-8 text-gray-700">
            Tu registro fue exitoso. Pronto nos vamos a poner en contacto con
            vos.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="mt-16 relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-white font-semibold">
                Volver al inicio
              </span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

'use client'
import React from 'react'
import Container from '@/components/style/container'
import Gradient from '@/components/style/gradient'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="relative" id="error">
      <title>Página No Encontrada - Smart Pager</title>
      <Gradient />
      <Container>
        <div className="relative pt-36 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <img
              src="/404.png"
              alt="404 illustration"
              className="w-64 mx-auto mb-8 animate-float"
              width="256"
              height="256"
              role="img"
            />
            <h1
              className="font-bold text-5xl md:text-6xl xl:text-7xl text-violet-800"
              role="alert"
            >
              ¡Oops! Parece que esta página no existe.
            </h1>
            <p className="mt-8 text-gray-700">
              Parece que la página que estás buscando no existe. Pero no te
              preocupes, siempre puedes
              <span className="text-violet-700">
                {' '}
                <button onClick={() => router.push('/')}>
                  volver al inicio
                </button>{' '}
              </span>
              y explorar desde allí.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

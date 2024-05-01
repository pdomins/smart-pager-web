import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Gradient from '../style/gradient'
import { CommensalData } from '@/types/queues'
import { removeCommensalFromEmail } from '@/services/queue-service'
import Spinner from '../utils/spinner'

export default function SelfServiceQueueManager({
  restaurantSlug,
  client,
}: {
  restaurantSlug: string
  client: CommensalData
}) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Gradient />
      <div className="text-center p-4">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          ¿Estás seguro que queres{' '}
          <span className="text-purple-800">salir</span> de la fila?
        </h1>
        <p className="mt-4 text-gray-700">
          Una vez que estés fuera, vas a tener que anotarte otra vez.
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center gap-y-4">
        {isDeleting ? (
          <Spinner />
        ) : (
          <button
            onClick={async () => {
              setIsDeleting(true)
              await removeCommensalFromEmail({ restaurantSlug, client })
              router.push(`/restaurants/${restaurantSlug}/queued/removed`)
            }}
            className="relative flex h-11 w-full max-w-xs items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
          >
            <span className="relative text-white font-semibold">
              Sacarme de la Fila
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

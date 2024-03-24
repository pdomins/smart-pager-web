import React, { useRef, useEffect, useState } from 'react'
import QueueForm from '../forms/queueForm'
import RetireForm from '../forms/retirementForm'
import { useRouter } from 'next/navigation'

export default function ClientLanding() {
  const aboutUsRef = useRef<HTMLDivElement | null>(null)
  const [showQueueForm, setShowQueueForm] = useState(false)
  const [showRetireForm, setShowRetireForm] = useState(false)
  const router = useRouter()

  const scrollToElement = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = ref.current.offsetTop
      window.scrollTo({ top: yOffset, behavior: 'smooth' })
    }
  }

  const toggleQueueFormVisibility = () => {
    setShowQueueForm(!showQueueForm) // Toggle the visibility state
  }

  const toggleRetireFormVisibility = () => {
    setShowRetireForm(!showRetireForm) // Toggle the visibility state
  }

  useEffect(() => {
    // Add an event listener to handle scrolling to the aboutUsRef element
    const handleScrollToAboutUs = () => {
      scrollToElement(aboutUsRef)
    }

    // Attach the event listener to a button or any other trigger
    const scrollButton = document.getElementById('scrollButton')
    if (scrollButton) {
      scrollButton.addEventListener('click', handleScrollToAboutUs)
    }

    return () => {
      // Remove the event listener when the component unmounts
      if (scrollButton) {
        scrollButton.removeEventListener('click', handleScrollToAboutUs)
      }
    }
  }, [aboutUsRef])

  return (
    <>
      {/* si en algun momento queremos agregar el logo del resto
      <div className="flex absolute top-1/2 left-1/2  translate-x-1/2 -translate-y-1/2  w-1/3 flex-row items-center">
        <img
          className="object-contain blur-sm box-content"
          src={foodtrcuckLogo.src}
          alt="logo"
        />
      </div> */}
      {showQueueForm && (
        <QueueForm toggleQueueFormVisibility={toggleQueueFormVisibility} />
      )}
      {showRetireForm && (
        <RetireForm toggleRetireFormVisibility={toggleRetireFormVisibility} />
      )}
      {!showQueueForm && !showRetireForm && (
        <div className="min-h-screen flex flex-col justify-center relative ">
          <div className="p-4">
            <p className="text-7xl mb-2 text-center">
              {/* TODO: traer el nombre del restaurante del back. Todavia no se como vamos a manejar el slug */}
              <b>the food truck shop</b>
            </p>

            <div className="flex flex-col">
              <button
                onClick={toggleQueueFormVisibility}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Anotarse para comer
              </button>
              <button
                onClick={toggleRetireFormVisibility}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Retirar pedido
              </button>
              <button
                onClick={() => router.push('/commensal/menu')}
                className="bg-complementary-blue hover:bg-custom-beige text-white font-bold m-3 py-2 px-4 rounded"
              >
                Ver menú
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

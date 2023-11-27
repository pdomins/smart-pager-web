import React, { useRef, useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import foodtrcuckLogo from '../../app/images/food_truck_logo.png'
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
      <div className="flex absolute top-1/2 left-1/2  translate-x-1/2 -translate-y-1/2  w-1/3 flex-row items-center">
        <img
          className="object-contain blur-sm box-content"
          src={foodtrcuckLogo.src}
          alt="logo"
        />
      </div>
      {showQueueForm && <QueueForm />}
      {showRetireForm && <RetireForm />}
      <div className="min-h-screen flex flex-col justify-center relative ">
        <div className="p-4">
          <p className="text-7xl font-sans mb-2 text-center">
            <b>the food truck shop</b>
          </p>
          <p className="text-2sm font-sans text-custom-blue text-center italic mb-2 ">
            <b>
              Te traemos una solución
              <br className="block md:inline" /> a las filas eternas
            </b>
          </p>
          <div className="flex font-sans flex-col">
            <button
              onClick={toggleQueueFormVisibility}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded"
            >
              Anotarse para comer
            </button>
            <button
              onClick={toggleRetireFormVisibility}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded"
            >
              Retirar pedido
            </button>
            <button
              onClick={() => router.push('/commensal/menu')}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold m-3 py-2 px-4 rounded"
            >
              Ver menú
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

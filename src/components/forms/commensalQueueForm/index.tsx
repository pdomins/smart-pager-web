import React, { FormEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useRouter } from 'next/navigation'

import CommensalQueueInnerForm from './form'
import { pattern } from '@/lib/phone'
import { addCommensal } from '@/services/commensal-queue-service'

export default function CommensalQueueForm({
  toggleCommensalFormVisibility,
}: {
  toggleCommensalFormVisibility: () => void
}) {
  const { restaurant: restaurantSlug } = useParams<{ restaurant: string }>()
  const router = useRouter()

  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const [commensals, setCommensals] = useState('1')
  const [phone, setPhone] = useState<string>()
  const [description, setDescription] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!restaurantSlug || typeof restaurantSlug !== 'string') {
      console.error('Restaurant slug is missing')
      return
    }

    if (!isSubmittable) return

    console.log({
      restaurantSlug,
      email,
      clientData: {
        name,
        groupSize: commensals,
        description,
        phoneNumber: phone,
      },
    })

    const success = await addCommensal({
      restaurantSlug,
      email,
      clientData: {
        name,
        groupSize: commensals,
        description,
        phoneNumber: phone,
      },
    })

    if (success) {
      router.push(`/restaurants/${restaurantSlug}/queued/commensal`)
    } else {
      console.error('Failed to add commensal')
    }
  }

  const isSubmittable =
    email && name && commensals && phone && pattern.test(phone)

  return (
    <div className="min-h-screen flex flex-col justify-center relative">
      <div
        className="absolute top-2 left-2 cursor-pointer"
        onClick={toggleCommensalFormVisibility}
      >
        <CloseIcon style={{ fontSize: '30px' }} />
      </div>
      <div className="py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Anótese en la cola
        </h1>
        <p className="mt-2 text-gray-700">
          Deje sus datos y le avisaremos cuando su mesa esté preparada.
        </p>
      </div>
      <div className="flex justify-center">
        <form className="mt-6 w-full max-w-lg" onSubmit={handleSubmit}>
          <CommensalQueueInnerForm
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            commensals={commensals}
            setCommensals={setCommensals}
            phone={phone}
            setPhone={setPhone}
          />
          {/* Botón de enviar */}
          <div className="px-3">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold mt-4 py-2 rounded rounded-full w-full disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
              disabled={!isSubmittable}
            >
              Anotarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

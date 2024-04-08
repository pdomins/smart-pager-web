import React, { FormEvent, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useParams, useRouter } from 'next/navigation'
import { addCommensal } from '@/repositories/queue-repository'

export default function CommensalQueueForm({
  toggleCommensalFormVisibility,
}: {
  toggleCommensalFormVisibility: () => void
}) {
  const { restaurant: restaurantSlug } = useParams<{ restaurant: string }>()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [commensals, setCommensals] = useState('1')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!restaurantSlug || typeof restaurantSlug !== 'string') {
      console.error('Restaurant slug is missing')
      return
    }
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
          {/* Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="ejemplo@mail.com"
            value={email}
            onChange={setEmail}
            required={true}
          />

          {/* Nombre Completo */}
          <InputField
            label="Nombre Completo"
            type="text"
            placeholder="Su nombre y apellido"
            value={name}
            onChange={setName}
            required={true}
          />

          {/* Cantidad de comensales */}
          <div className="w-full px-3 mb-6 md:mb-0">
            <LabelField label="Cantidad de comensales" required={true} />
            <select
              className="block w-full bg-white border hover:border-gray-500 px-4 py-2 pr-8 mb-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              value={commensals}
              onChange={(e) => setCommensals(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option value="6 o más">6 o más</option>
            </select>
          </div>

          {/* Número de Teléfono */}
          <InputField
            label="Número de Teléfono"
            type="tel"
            placeholder="Su número de teléfono"
            value={phone}
            onChange={setPhone}
            required={true}
          />

          {/* Descripción */}
          <div className="w-full px-3 mb-6 md:mb-0">
            <LabelField label="Descripción" />
            <textarea
              className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Detalles adicionales"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Botón de enviar */}
          <div className="px-3">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold mt-4 py-2 rounded rounded-full w-full"
            >
              Anotarse
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface InputFieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}
function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <LabelField label={label} required={required} />
      <input
        type={type}
        placeholder={placeholder}
        className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}

function LabelField({
  label,
  required = false,
}: {
  label: string
  required?: boolean
}) {
  return (
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  )
}

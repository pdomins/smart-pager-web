// No lo voy a hacer reutilizable, despues para la queue de retiros hacemos otro :)
'use client'
import CommensalQueueInnerForm from '@/components/forms/commensalQueueForm/form'
import { pattern } from '@/lib/phone'
import { addCommensal } from '@/services/kv/commensal-queue-service'
import { Dialog } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const AddToQueueDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  restaurantSlug,
  getCommensalList,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  restaurantSlug: string
  getCommensalList: () => Promise<void>
}) => {
  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const [commensals, setCommensals] = useState('1')
  const [phone, setPhone] = useState<string>()
  const [description, setDescription] = useState<string>('')

  const isSubmittable =
    email && name && commensals && phone && pattern.test(phone)

  const handleClose = () => {
    setIsOpenDialog(false)
    setEmail(undefined)
    setName(undefined)
    setCommensals('1')
    setPhone(undefined)
    setDescription('')
  }

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

    await addCommensal({
      restaurantSlug,
      email,
      clientData: {
        name,
        groupSize: commensals,
        description,
        phoneNumber: phone,
      },
    })

    handleClose()
    getCommensalList()
  }

  return (
    <Dialog open={isOpenDialog} onClose={handleClose}>
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
            Añadir comensales a la lista
          </h1>
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
                Añadir
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default AddToQueueDialog

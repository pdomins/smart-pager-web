'use client'

import PickUpQueueInnerForm from '@/components/forms/pickUpQueueForm/form'
import { pattern } from '@/lib/phone'
import { addPickUp } from '@/services/kv/pickup-queue-service'
import { Dialog } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const AddPickUpDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  restaurantSlug,
  getPickUpList,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  restaurantSlug: string
  getPickUpList: () => Promise<void>
}) => {
  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [pickUpId, setPickUpId] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const isSubmittable = email && name && phone && pattern.test(phone)

  const handleClose = () => {
    setIsOpenDialog(false)
    setEmail(undefined)
    setName(undefined)
    setPhone(undefined)
    setPickUpId('')
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
        pickUpId,
        phoneNumber: phone,
      },
    })

    await addPickUp({
      restaurantSlug,
      email,
      clientData: {
        name,
        phoneNumber: phone,
        pickUpId,
        description,
      },
    })

    handleClose()
    getPickUpList()
  }

  return (
    <Dialog open={isOpenDialog} onClose={handleClose}>
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-700">
            Añadir una nueva orden
          </h1>
        </div>
        <div className="flex justify-center">
          <form className="mt-6 w-full max-w-lg" onSubmit={handleSubmit}>
            <PickUpQueueInnerForm
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              pickUpId={pickUpId}
              setPickUpId={setPickUpId}
              description={description}
              setDescription={setDescription}
            />
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

export default AddPickUpDialog

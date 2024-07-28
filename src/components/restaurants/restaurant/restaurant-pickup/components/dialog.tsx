'use client'

import PickUpQueueInnerForm from '@/components/forms/pickUpQueueForm/form'
import Snackbar from '@/components/utils/snackbar'
import Spinner from '@/components/utils/spinner'
import { pattern } from '@/lib/phone'
import { sendPickUpAddedEmail } from '@/repositories/email-repository'
import { addPickUp } from '@/services/kv/pickup-queue-service'
import { Dialog } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const AddPickUpDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  restaurantSlug,
  restaurantName,
  getPickUpList,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  restaurantSlug: string
  restaurantName: string
  getPickUpList: () => Promise<void>
}) => {
  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [pickUpId, setPickUpId] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)

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
    try {
      setIsSubmitting(true)

      console.log({
        restaurantSlug,
        email,
        clientData: {
          name,
          pickUpId,
          phoneNumber: phone,
        },
      })

      const success = await addPickUp({
        restaurantSlug,
        email,
        clientData: {
          name,
          phoneNumber: phone,
          pickUpId,
          description,
          restaurantSlug,
        },
      })

      if (!success) {
        setIsError(true)
      } else {
        await sendPickUpAddedEmail({
          restaurantName,
          name,
          email,
          orderNumber: pickUpId,
        })
        handleClose()
        getPickUpList()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Snackbar
        type="error"
        isOpen={isError}
        variant="filled"
        setIsOpen={setIsError}
        text="El email o teléfono del cliente ya está registrado en una lista de espera de comensales o de pedidos para retirar. Por favor, asegúrate de cancelar el pedido existente antes de registrar esta información de nuevo."
      />
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
                {!isSubmitting ? (
                  <button
                    type="submit"
                    className="bg-violet-500 hover:bg-violet-700 text-white font-bold mt-4 py-2 rounded rounded-full w-full disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-75"
                    disabled={!isSubmittable}
                  >
                    Añadir
                  </button>
                ) : (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddPickUpDialog

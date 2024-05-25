// No lo voy a hacer reutilizable, despues para la queue de retiros hacemos otro :)
'use client'
import CommensalQueueInnerForm from '@/components/forms/commensalQueueForm/form'
import Snackbar from '@/components/utils/snackbar'
import Spinner from '@/components/utils/spinner'
import { pattern } from '@/lib/phone'
import { addClientToQueue } from '@/services/queue-service'
import { Dialog } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'

const AddToQueueDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  restaurantSlug,
  restaurantName,
  getCommensalList,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  restaurantSlug: string
  restaurantName: string
  getCommensalList: () => Promise<void>
}) => {
  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const [commensals, setCommensals] = useState('1')
  const [phone, setPhone] = useState<string>()
  const [description, setDescription] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)

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

    try {
      setIsSubmitting(true)
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

      const { response: success } = await addClientToQueue({
        restaurantSlug,
        restaurantName,
        email,
        name,
        groupSize: commensals,
        description,
        phoneNumber: phone,
      })

      if (!success) setIsError(true)
      else {
        handleClose()
        getCommensalList()
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

export default AddToQueueDialog

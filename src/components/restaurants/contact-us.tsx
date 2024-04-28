import { Dialog } from '@mui/material'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import Spinner from '../utils/spinner'

export type MailParams = {
  email: string
  message: string
}

const ContactUsDialog = ({
  isOpenDialog,
  setIsOpenDialog,
  mailContent,
  setMailContent,
  onSubmit,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  mailContent: MailParams
  setMailContent: React.Dispatch<React.SetStateAction<MailParams>>
  onSubmit: () => Promise<void>
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    setIsSubmitting(false)
    setIsOpenDialog(false)
  }
  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSubmit()
    handleClose()
  }

  const isSubmittable = !!mailContent.message && !!mailContent.email

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <div className="p-8 bg-violet-50">
        <div className="text-center">
          <h1 className="text-base md:text-4xl font-bold text-gray-700">
            ¡Contáctanos!
          </h1>
        </div>
        <div className="flex justify-center">
          <form className="mt-6 w-full max-w-lg" onSubmit={handleSend}>
            <label className="block mb-6">
              <span className="text-gray-700">
                Tu mail: <span className="text-red-500">*</span>
              </span>
              <input
                type="email"
                className="form-input mt-1 block w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                placeholder="Ingresa tu email aquí"
                value={mailContent.email}
                onChange={(e) =>
                  setMailContent((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                required
              />
            </label>
            <label className="block mb-6">
              <span className="text-gray-700">
                Mensaje: <span className="text-red-500">*</span>
              </span>
              <textarea
                className="form-input mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-violet-700 transition-colors"
                placeholder="Escribe aquí tu mensaje"
                value={mailContent.message}
                onChange={(e) =>
                  setMailContent((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                required
              />
            </label>
            {!isSubmitting ? (
              <button
                className="bg-violet-700 w-full hover:bg-violet-800 text-white my-3 py-2 px-4 rounded-full transition-colors disabled:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-75"
                type="submit"
                disabled={!isSubmittable}
              >
                Send Email
              </button>
            ) : (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default ContactUsDialog

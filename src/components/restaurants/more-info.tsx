import React, { useState } from 'react'
import Container from '../style/container'
import Gradient from '../style/gradient'
import ContactUsDialog, { MailParams } from './contact-us'
import { sendContactUsEmail } from '@/repositories/email-repository'
import Snackbar from '../utils/snackbar'
import { HTTP_RESPONSE_STATUS } from '@/types/https'

export default function RestautantMoreInfo() {
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [mailContent, setMailContent] = useState<MailParams>({
    email: '',
    message: '',
  })
  const [isSuccessfullySent, setIsSuccessfullySent] = useState(false)
  const [hasError, setHasError] = useState(false)

  const sendEmail = async () => {
    const ans = await sendContactUsEmail({ ...mailContent })
    if (ans.status === HTTP_RESPONSE_STATUS.SUCCESS) {
      setIsSuccessfullySent(true)
    } else {
      setHasError(true)
    }
  }

  return (
    <>
      <ContactUsDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
        mailContent={mailContent}
        setMailContent={setMailContent}
        onSubmit={sendEmail}
      />
      <Snackbar
        type="success"
        isOpen={isSuccessfullySent}
        variant="filled"
        setIsOpen={setIsSuccessfullySent}
        text="¡Tu mail se ha enviado correctamente! Nos comunicaremos con vos a la brevedad."
      />
      <Snackbar
        type="error"
        isOpen={hasError}
        variant="filled"
        setIsOpen={setHasError}
        text="Ha ocurrido un error con tu mail. Por favor, intenta nuevamente mas tarde."
      />
      <div className="relative" id="info">
        <Gradient />
        <Container>
          <div className="relative pt-36 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
              <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl">
                Todo lo que <span className="text-purple-800">necesitas</span>{' '}
                saber
              </h1>
              <p className="mt-8 text-gray-700">
                Descubre cómo Smart Pager puede revolucionar la forma en que tu
                restaurante interactúa con los clientes.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
              <div className="p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-purple-800">
                  Fácil Integración
                </h2>
                <p className="mt-4 text-gray-600">
                  Integrar Smart Pager en tu negocio es fácil y rápido.
                  Contáctanos para saber cómo.
                </p>
              </div>
              <div className="p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-purple-800">
                  Mejora la Experiencia del Cliente
                </h2>
                <p className="mt-4 text-gray-600">
                  Ofrece a tus clientes una experiencia sin igual, minimizando
                  tiempos de espera.
                </p>
              </div>
              <div className="p-6 shadow-lg rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-purple-800">
                  Análisis y Reportes
                </h2>
                <p className="mt-4 text-gray-600">
                  Toma decisiones informadas con nuestros detallados análisis y
                  reportes.
                </p>
              </div>
            </div>
            <div className="mt-16 text-center">
              <button
                onClick={() => {
                  setIsOpenDialog(true)
                }}
                className="relative flex inline-flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-violet-700 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-white font-semibold text-white">
                  Contáctanos
                </span>
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

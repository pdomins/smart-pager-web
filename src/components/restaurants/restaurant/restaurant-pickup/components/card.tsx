import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DoneIcon from '@mui/icons-material/Done'
import { Tooltip } from '@mui/material'
import { differenceInMinutes, intervalToDuration } from 'date-fns'
import { PickUpData } from '@/types/queues'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useState } from 'react'
import Spinner from '@/components/utils/spinner'
import ConfirmationModal from '../../components/confirmation-modal'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { formatPhoneNumber } from '@/lib/phone'

const PickUpCard = ({
  order,
  restaurantName,
  onCallOrder,
  onRemoveOrder,
  onAcceptOrder,
}: {
  order: PickUpData
  restaurantName: string
  onCallOrder: () => Promise<void>
  onRemoveOrder: () => Promise<void>
  onAcceptOrder?: () => Promise<void>
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const {
    name,
    pickUpId,
    timesCalled,
    joinedAt: reservationTime,
    description,
    phoneNumber,
  } = order

  const diffMinutes = differenceInMinutes(new Date(), reservationTime)

  const duration = intervalToDuration({
    start: 0,
    end: diffMinutes * 60 * 1000,
  })

  const hours = duration.hours || 0
  const minutes = duration.minutes || 0

  const formattedDuration =
    hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-center">
      <ConfirmationModal
        isOpenDialog={dialogIsOpen}
        setIsOpenDialog={setDialogIsOpen}
        name={name}
        onSubmit={async () => {
          try {
            setIsLoading(true)
            setDialogIsOpen(false)
            await onRemoveOrder()
          } finally {
            setIsLoading(false)
          }
        }}
      />
      <div className="flex-1">
        <div className="flex items-start">
          <p className="text-lg font-bold">
            {pickUpId !== '' && (
              <>
                <span className="text-purple-500">{pickUpId}</span> -{' '}
              </>
            )}
            {name}
          </p>
          {description && (
            <Tooltip
              title={'Descripción del pedido: ' + description}
              placement="right"
              arrow
            >
              <button className="relative text-violet-500 pl-1">
                <InfoOutlinedIcon />
              </button>
            </Tooltip>
          )}
        </div>
        {phoneNumber && (
          <div className="flex space-x-1">
            <p className="text-sm mt-2 relative">
              {formatPhoneNumber(phoneNumber)}{' '}
            </p>
            <Tooltip
              title={'Enviar un mensaje por Whatsapp Web'}
              placement="right"
              arrow
            >
              <button
                className="relative text-green-500 text-xs"
                onClick={() =>
                  window.open(
                    `https://wa.me/${phoneNumber}?text=${encodeURI(
                      `Hola ${name}! Nos comunicamos con vos desde ${restaurantName} por el pedido que realizaste. Por favor, acercate al mostrador!`
                    )}`
                  )
                }
              >
                <WhatsAppIcon />
              </button>
            </Tooltip>
          </div>
        )}
        <div className="flex space-x-1 ">
          <p className="text-sm mt-2">Tiempo en espera: {formattedDuration}</p>
          {timesCalled > 0 && (
            <p className="text-sm mt-2">
              {' '}
              - Cantidad de Llamados: {timesCalled}
            </p>
          )}
        </div>
      </div>
      {!isLoading ? (
        <div className="flex-initial">
          {onAcceptOrder && (
            <Tooltip title="Pedido retirado" placement="top" arrow>
              <button
                onClick={async () => {
                  try {
                    setIsLoading(true)
                    await onAcceptOrder()
                  } finally {
                    setIsLoading(false)
                  }
                }}
                className="relative bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                <DoneIcon />
              </button>
            </Tooltip>
          )}
          <Tooltip title="Llamar cliente" placement="top" arrow>
            <button
              onClick={async () => {
                try {
                  setIsLoading(true)
                  await onCallOrder()
                } finally {
                  setIsLoading(false)
                }
              }}
              className="relative bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              <NotificationsActiveIcon />
            </button>
          </Tooltip>
          <Tooltip title="Remover pedido" placement="top" arrow>
            <button
              onClick={() => setDialogIsOpen(true)}
              className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              <CloseIcon />
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="flex justify-center items-center px-4">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default PickUpCard

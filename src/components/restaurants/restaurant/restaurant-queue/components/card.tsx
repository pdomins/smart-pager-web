import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DoneIcon from '@mui/icons-material/Done'
import { Tooltip } from '@mui/material'
import { differenceInMinutes, intervalToDuration } from 'date-fns'
import { CommensalData } from '@/types/queues'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import PeopleIcon from '@mui/icons-material/People'

const ClientCard = ({
  client,
  onCallClient,
  onRemoveClient,
  onAcceptClient,
}: {
  client: CommensalData
  onCallClient: () => void
  onRemoveClient: () => void
  onAcceptClient?: () => void
}) => {
  const {
    name,
    groupSize: commensals,
    description,
    timesCalled,
    joinedAt: reservationTime,
  } = client

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
      <div className="flex-1">
        <div className="flex items-start">
          <p className="text-lg font-bold">{name}</p>
          {description && (
            <Tooltip
              title={'Comentario del cliente: ' + description}
              placement="right"
              arrow
            >
              <button className="relative text-violet-500 pl-1">
                <InfoOutlinedIcon />
              </button>
            </Tooltip>
          )}
          <button className="flex pl-2">
            <PeopleIcon />
            <p className="text-lg font-bold pl-1">{commensals}</p>
          </button>
        </div>
        {/* <p>Personas: {commensals}</p> */}
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
      <div className="flex-initial">
        {onAcceptClient && (
          <Tooltip title="Cliente atendido" placement="top" arrow>
            <button
              onClick={onAcceptClient}
              className="relative bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              <DoneIcon />
            </button>
          </Tooltip>
        )}
        <Tooltip title="Llamar cliente" placement="top" arrow>
          <button
            onClick={onCallClient}
            className="relative bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <NotificationsActiveIcon />
          </button>
        </Tooltip>
        <Tooltip title="Remover cliente" placement="top" arrow>
          <button
            onClick={onRemoveClient}
            className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <CloseIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}

export default ClientCard

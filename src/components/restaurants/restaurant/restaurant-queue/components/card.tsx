import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DoneIcon from '@mui/icons-material/Done'
import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CommensalData } from '@/types/queues'

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
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex-1">
        <p className="text-lg font-bold">{name}</p>
        <p>Personas: {commensals}</p>
        {description && (
          <p className="text-sm mt-2">Descripcion: {description}</p>
        )}
        <div className="flex space-x-1 ">
          <p className="text-sm mt-2">
            Horario: {format(reservationTime, 'PPPpp', { locale: es })}
          </p>
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

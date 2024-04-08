import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import DoneIcon from '@mui/icons-material/Done'
import { Tooltip } from '@mui/material'

const ClientCard = ({
  name,
  commensals,
  description,
  onCallClient,
  onRemoveClient,
  onAcceptClient,
}: {
  name: string
  commensals: string
  description?: string
  onCallClient: () => void
  onRemoveClient: () => void
  onAcceptClient?: () => void
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <p className="text-lg font-bold">{name}</p>
        <p>Personas: {commensals}</p>
        {!!description && (
          <p className="text-sm mt-2">Descripcion: {description}</p>
        )}
      </div>
      <div>
        {onAcceptClient && (
          <Tooltip title={'Cliente atendido'} placement="top" arrow>
            <button
              onClick={onAcceptClient}
              className="relative bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              <DoneIcon />
            </button>
          </Tooltip>
        )}
        <Tooltip title={'Llamar cliente'} placement="top" arrow>
          <button
            onClick={onCallClient}
            className="relative bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <NotificationsActiveIcon />
          </button>
        </Tooltip>
        <Tooltip title={'Remover cliente'} placement="top" arrow>
          <button
            onClick={onRemoveClient}
            title="Remover cliente"
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

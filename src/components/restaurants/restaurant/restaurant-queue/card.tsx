import CloseIcon from '@mui/icons-material/Close'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
const ClientCard = ({
  name,
  commensals,
}: {
  name: string
  commensals: string
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <p className="text-lg font-bold">{name}</p>
        <p>{commensals} comensales</p>
      </div>
      <div>
        <button
          onClick={() => {}}
          className="relative bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          <NotificationsActiveIcon />
        </button>
        <button
          onClick={() => {}}
          className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}

export default ClientCard

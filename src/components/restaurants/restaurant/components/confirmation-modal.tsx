import { Dialog } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

const confirmationModal = ({
  isOpenDialog,
  setIsOpenDialog,
  name,
  onSubmit,
}: {
  isOpenDialog: boolean
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>
  name: string
  onSubmit: () => Promise<void>
}) => {
  const handleClose = () => {
    setIsOpenDialog(false)
  }

  return (
    <Dialog open={isOpenDialog} onClose={handleClose}>
      <div className="p-6 bg-violet-50">
        <div className="text-center">
          <h1 className="text-3xl md:text-3xl font-bold text-gray-700">
            Eliminar de Lista
          </h1>
          <p className="text-gray-600 mt-4">
            ¿Estás seguro de que deseas eliminar a
            <span className="font-bold text-violet-700"> {name} </span>
            de la lista?
          </p>
        </div>
        <div className="mt-4 flex justify-around">
          <button
            type="button"
            className="bg-violet-700/10 hover:bg-violet-700/20 text-purple-700 py-2 px-4 rounded-full"
            onClick={handleClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-700 text-white text-white py-2 px-4 rounded-full"
            onClick={onSubmit}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Dialog>
  )
}
export default confirmationModal

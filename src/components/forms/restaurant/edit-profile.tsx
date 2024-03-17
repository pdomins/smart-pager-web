import Modal from '@/components/utils/confirmation-modal'
import DefaultInput from '@/components/utils/inputs/default-input'
import { Restaurant } from '@/types/restaurant'
import { useState } from 'react'

export default function EditRestaurantProfile({
  restaurantData,
  toggleProfileFormVisibility,
}: {
  restaurantData: Restaurant
  toggleProfileFormVisibility: () => void
}) {
  const [name, setName] = useState(restaurantData.name)
  const [email, setEmail] = useState(restaurantData.email)
  const [restaurantName, setRestaurantName] = useState(restaurantData.name) //TODO: Change to restaurantName
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalMesaage, setModalMessage] = useState('Are you sure?')
  const [modalAction, setModalAction] = useState<() => void>(() => {})

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible)
  }

  const handleAccept = () => {
    console.log('handleAccept') //TODO: Implement handleAccept
    toggleModalVisibility()
    toggleProfileFormVisibility()
  }

  return (
    <form>
        <div className="my-2 w-full bg-white overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out  relative">
            {isModalVisible && (
                <Modal
                message={modalMesaage}
                onAccept={modalAction}
                onCancel={toggleModalVisibility}
                />
            )}
            <div className="m-4">
                <div className="m-3 flex justify-center">
                <DefaultInput
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={setName}
                />
                </div>
                <div className="m-3 flex justify-center">
                <DefaultInput
                    label="Nombre"
                    name="name"
                    value={email}
                    onChange={setEmail}
                />
                </div>
                <div className="m-3 flex justify-center">
                <DefaultInput
                    label="Nombre"
                    name="name"
                    value={restaurantName}
                    onChange={setRestaurantName}
                />
                </div>
            </div>
            <div className="flex justify-evenly m-3 text-xl">
                <button
                className="text-red-500 hover:text-red-800"
                onClick={(e) => {
                    e.preventDefault()
                    setModalMessage(
                    'Si cancelas perderás los cambios realizados. ¿Estás seguro que quieres cancelar?'
                    )
                    setIsModalVisible(true)
                    setModalAction(() => toggleProfileFormVisibility)
                }}
                >
                Cancelar
                </button>
                <button
                className="text-green-500 ml-3 hover:text-green-800"
                onClick={(e) => {
                    e.preventDefault()
                    setModalMessage('¿Estás seguro que quieres guardar los cambios?')
                    setIsModalVisible(true)
                    setModalAction(() => handleAccept)
                }}
                >
                Guardar
                </button>
            </div>
        </div>
    </form>
  )
}

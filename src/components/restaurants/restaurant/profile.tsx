import { Restaurant } from '@/types/restaurant'
import EditIcon from '@mui/icons-material/Edit'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import EditRestaurantProfile from '@/components/forms/restaurant/edit-profile'

export default function RestaurantProfile({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const router = useRouter()
  const [showEditProfileForm, setShowEditProfileForm] = useState(false)

  const toggleProfileFormVisibility = () => {
    setShowEditProfileForm(!showEditProfileForm)
  }

  return (
    <div>
      <div className="flex justify-between align-center">
        <div>
          <button
            onClick={() => router.back()}
            className="text-3xl mt-3 hover:text-sky-700"
          >
            <ArrowBackIcon
              style={{ fontSize: '50px' }}
              className="mt-3 hover:text-sky-700"
            />
          </button>
        </div>
        <p className="text-5xl mb-4 mt-4 mr-8 text-center pt-2">
          <b>Perfil</b>
        </p>
        <div></div>
      </div>
      {showEditProfileForm ? (
        <EditRestaurantProfile
          restaurantData={restaurantData}
          toggleProfileFormVisibility={toggleProfileFormVisibility}
        />
      ) : (
        <div className="my-2 w-full bg-white overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out  relative">
          <div>
            <h4 className=" m-2 text-xl py-2 pl-4 font-normal tracking-tight">
              <b>Nombre:</b>
              {' ' + restaurantData.name}
            </h4>
            <h4 className=" m-2 text-xl py-2 pl-4 font-normal tracking-tight">
              <b>Nombre de tu restaurante:</b>
              {' ' + restaurantData.name}
            </h4>
            <h4 className=" m-2 text-xl py-2 pl-4 font-normal tracking-tight">
              <b>Email:</b>
              {' ' + restaurantData.email}
            </h4>
          </div>

          <div className="flex justify-end mr-4">
            <button
              onClick={toggleProfileFormVisibility}
              className="hover:text-sky-700"
            >
              <div className="flex hover:text-sky-700">
                <EditIcon
                  style={{ fontSize: '1.5rem' }}
                  className="mt-3 mb-2"
                />
                <p className="mt-4 ml-1 mr-1">Editar</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

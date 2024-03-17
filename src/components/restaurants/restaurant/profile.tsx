import { Restaurant } from "@/types/restaurant"
import EditIcon from '@mui/icons-material/Edit';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

export default function RestaurantProfile({restaurantData}: {restaurantData: Restaurant}) {
    const router = useRouter()
    
        
    return (
     <div>
        <div className="flex justify-between align-center">
            <div>
                <button
                    onClick={() => router.back()}
                    className="text-3xl hover:text-sky-700"
                >
                    <ArrowBackIcon style={{fontSize: '50px'}} className='mt-3 hover:text-sky-700'/>
                </button>
            </div>
            <p className="text-5xl mb-4 mt-4 text-center pt-2">
                <b>Perfil</b>
            </p>
            <div></div>
        </div>        
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
                <div className="flex hover:text-sky-700">
                    <EditIcon style={{fontSize: '1.5rem'}} className='mt-3 mb-2'/>
                    <p className="mt-4 ml-1 mr-1">
                        Editar
                    </p>
                </div>
            </div>
        </div>
     </div> 
    )

}
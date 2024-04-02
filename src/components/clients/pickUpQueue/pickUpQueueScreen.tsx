import React, { useEffect, useState } from 'react'
import foodtrcuckLogo from '../../../app/images/food_truck_logo.png'
import { getRestaurantMenuBySlug } from '@/repositories/restaurant-respository';
import { useParams } from 'next/navigation';
export default function PickUpQueueScreen() {

  const [menuUrl, setMenuUrl] = useState('');
  const restaurantSlug = useParams<{restaurant: string}>()


  const viewMenu = async () => {
    window.open(await menuUrl, '_blank');
  }

  useEffect(() => {
    const fetchMenuUrl = async () => {
      try {
        const menuUrl = await getRestaurantMenuBySlug(restaurantSlug.restaurant);
        setMenuUrl(menuUrl);
      } catch (error) {
        console.error('Error setting menu URL:', error);
      }
    };
    fetchMenuUrl();
  }, []);


  return (
    <>
      <div className="flex absolute top-1/2 left-1/2  translate-x-1/2 -translate-y-1/2  w-1/3 flex-row items-center">
        <img
          className="object-contain blur-sm box-content"
          src={foodtrcuckLogo.src}
          alt="logo"
        />
      </div>
      <div className="min-h-screen flex flex-col justify-center relative ">
        <p className="text-6xl font-sans mb-2 text-center">
          <b>¡Listo!</b>
        </p>
        <p className="text-2sm font-sans text-custom-blue text-center italic mb-2 ">
          <b>Le avisaremos por email cuando su pedido este listo.</b>
        </p>
        { menuUrl && (
        <button 
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-3 py-2 px-4 rounded"
        onClick={viewMenu}>
          Ver menú
        </button>
        )}
      </div>
    </>
  )
}

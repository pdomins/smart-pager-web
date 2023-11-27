'use client'
import React from 'react'
import foodtrcuckLogo from '../../app/images/food_truck_logo.png'
import { LeftOutlined } from '@ant-design/icons'

export default function CommensalMenu() {
  const menuItems = [
    {
      name: 'Smash Burger simple',
      description: 'Medallon de 100g doble cheddar',
      price: '$1500',
    },
    {
      name: 'Smash Burger doble',
      description: 'Dos medallones de 100g doble cheddar',
      price: '$3000',
    },
    {
      name: 'Mistery burger',
      description: 'Medallon de 100g doble cheddar, salsa secreta, panceta',
      price: '$2800',
    },
    // Add more menu items as needed
  ]

  return (
    <>
      <div className="flex justify-between m-3">
        <h1 className="text-2xl font-bold ">
          <LeftOutlined />
        </h1>

        <h1 className="text-2xl font-bold ">Menu</h1>
        <div className="w-12">
          <img
            className="object-contain box-content"
            src={foodtrcuckLogo.src}
            alt="logo"
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {menuItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-gray-500 mt-2">{item.description}</p>
              <p className="text-gray-700 font-bold mt-2">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

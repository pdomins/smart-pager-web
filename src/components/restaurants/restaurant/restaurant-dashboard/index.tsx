'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../new/gradient'
import Container from '../../new/container'
import { useState } from 'react'
import RestaurantQR from './tabs/qr'

export default function RestaurantDashboard({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const [activeTab, setActiveTab] = useState('menu')

  return (
    <div className="relative" id="dashboard">
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Panel de Control{' '}
            <span className="text-purple-800">del Restaurante</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Gestiona tu restaurante de manera eficiente.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="border-b border-gray-300 inline-block">
            <ul className="flex flex-wrap -mb-px text-sm font-medium justify-center items-center text-center">
              <li
                className={`${
                  activeTab === 'menu' ? 'border-purple-700' : ''
                } mr-2`}
              >
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`relative inline-block p-4 rounded-t-lg border-b-2 ${
                    activeTab === 'menu'
                      ? 'text-purple-700 border-purple-700'
                      : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Menú
                </button>
              </li>
              <li
                className={`${
                  activeTab === 'qr' ? 'border-purple-700' : ''
                } mr-2`}
              >
                <button
                  onClick={() => setActiveTab('qr')}
                  className={`relative inline-block p-4 rounded-t-lg border-b-2 ${
                    activeTab === 'qr'
                      ? 'text-purple-700 border-purple-700'
                      : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  QR
                </button>
              </li>
              <li
                className={`${activeTab === 'info' ? 'border-purple-700' : ''}`}
              >
                <button
                  onClick={() => setActiveTab('info')}
                  className={`relative inline-block p-4 rounded-t-lg border-b-2 ${
                    activeTab === 'info'
                      ? 'text-purple-700 border-purple-700'
                      : 'text-gray-500 hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Información
                </button>
              </li>
            </ul>
          </div>
        </div>

        {activeTab === 'menu' && (
          <div>
            <p>Sube y gestiona tu menú aquí.</p>
          </div>
        )}
        {activeTab === 'qr' && <RestaurantQR restaurantData={restaurantData} />}
        {activeTab === 'info' && (
          <div>
            <p>Actualiza la información de tu restaurante aquí.</p>
          </div>
        )}
      </Container>
    </div>
  )
}

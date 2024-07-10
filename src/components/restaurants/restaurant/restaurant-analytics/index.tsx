'use client'

import { Restaurant } from '@/types/restaurant'
import Gradient from '../../../style/gradient'
import Container from '../../../style/container'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import 'react-datepicker/dist/react-datepicker.css'

import { Bar } from 'react-chartjs-2'
import Filter from './filter'
import { useState } from 'react'
import { ANALYTICS_FILTER_TYPE } from '@/lib/analytics'
import CustomDatePicker from './date-picker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const clientsPerHour = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Cantidad de Comensales',
    },
  },
}

const averageWaitingTime = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Tiempo de Espera Promedio (minutos)',
    },
  },
}

const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`)

// function getRandomInt(max: number) {
//   return Math.floor(Math.random() * max)
// }

const clientsPerHourData = {
  labels,
  datasets: [
    {
      label: 'Cantidad de Comensales',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 3, 0, 0, 0, 0, 1, 4, 8, 5, 1,
      ],
      backgroundColor: 'rgba(139, 92, 246, 0.5)',
    },
  ],
}

const averageWaitingTimeData = {
  labels,
  datasets: [
    {
      label: 'Tiempo de Espera Promedio (minutos)',
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 25, 30, 0, 0, 0, 0, 20, 35, 40,
        25, 15,
      ],
      backgroundColor: 'rgba(139, 92, 246, 0.5)',
    },
  ],
}

export default function RestaurantAnalytics({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  console.log(restaurantData)
  const [filter, setFilter] = useState(ANALYTICS_FILTER_TYPE.DAY)

  return (
    <div className="relative" id="analytics">
      <Gradient />
      <Container>
        <div className="text-center pt-20 pb-10">
          <h1 className="font-bold text-4xl md:text-5xl">
            Panel de <span className="text-purple-800">Datos</span>
          </h1>
          <p className="mt-4 text-gray-700">
            Tomá tus decisiones bien informado.
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <Filter filter={filter} setFilter={setFilter} />
          <CustomDatePicker filter={filter} />
        </div>
        <div className="grid grid-cols-2 gap-20 py-5">
          <div className="col-span-1">
            <Bar
              className="relative"
              options={clientsPerHour}
              data={clientsPerHourData}
            />
          </div>
          <div className="col-span-1">
            <Bar
              className="relative"
              options={averageWaitingTime}
              data={averageWaitingTimeData}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

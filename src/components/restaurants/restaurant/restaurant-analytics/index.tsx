'use client'

import { Restaurant } from '@prisma/client'
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
import { useEffect, useState } from 'react'
import { ANALYTICS_FILTER_TYPE } from '@/lib/analytics'
import CustomDatePicker from './date-picker'
import Spinner from '@/components/utils/spinner'
import { getAnalytics } from '@/services/analytics-service'
import { assertAndReturn } from '@/lib/assertions'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function RestaurantAnalytics({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  const tailwindPurple = 'rgba(139, 92, 246, 0.5)'
  const [startDate, setStartDate] = useState(new Date())

  const [filter, setFilter] = useState(ANALYTICS_FILTER_TYPE.DAY)
  const [labels, setLabels] = useState<string[]>()
  const [restaurantClientsData, setRestaurantClientsData] = useState<number[]>()
  const [avgWaitingTimeData, setAvgWaitingTimeData] = useState<number[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async ({
      date,
      filter,
    }: {
      date: Date
      filter: string
    }) => {
      try {
        setIsLoading(true)
        const { label, avgWaitingTimeArray, restaurantClientsArray } =
          await getAnalytics({
            restaurantSlug: assertAndReturn(restaurantData.slug),
            date,
            filter,
          })
        setLabels(label)
        setRestaurantClientsData(restaurantClientsArray)
        setAvgWaitingTimeData(avgWaitingTimeArray)
      } catch (error) {
        setLabels([])
        setRestaurantClientsData([])
        setAvgWaitingTimeData([])
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics({ date: startDate, filter })
  }, [restaurantData, filter, startDate])

  const clientsOptions = {
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

  const averageWaitingTimeOptions = {
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

  const clientsData = {
    labels,
    datasets: [
      {
        label: 'Cantidad de Comensales',
        data: restaurantClientsData,
        backgroundColor: tailwindPurple,
      },
    ],
  }

  const averageWaitingTimeOptionsData = {
    labels,
    datasets: [
      {
        label: 'Tiempo de Espera Promedio (minutos)',
        data: avgWaitingTimeData,
        backgroundColor: tailwindPurple,
      },
    ],
  }

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
          <CustomDatePicker
            filter={filter}
            minDate={new Date(restaurantData.createdAt)}
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-10">
            <Spinner />
          </div>
        ) : labels &&
          restaurantClientsData &&
          avgWaitingTimeData &&
          restaurantClientsData.length > 0 &&
          avgWaitingTimeData.length > 0 ? (
          <div className="grid grid-cols-2 gap-20 py-5">
            <div className="col-span-1">
              <Bar
                className="relative"
                options={clientsOptions}
                data={clientsData}
              />
            </div>
            <div className="col-span-1">
              <Bar
                className="relative"
                options={averageWaitingTimeOptions}
                data={averageWaitingTimeOptionsData}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Lo sentimos, no hay informacion disponible para la fecha
            seleccionada.
          </p>
        )}
      </Container>
    </div>
  )
}

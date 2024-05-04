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
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Generic Chart',
    },
  },
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => getRandomInt(1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => getRandomInt(1000)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const chartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
export default function RestaurantAnalytics({
  restaurantData,
}: {
  restaurantData: Restaurant
}) {
  console.log(restaurantData)
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
        <div className="grid grid-cols-2 gap-20">
          <div className="col-span-1">
            <Bar className="relative" options={options} data={data} />
          </div>
          <div className="col-span-1">
            <Pie
              className="relative max-h-320px"
              data={chartData}
              style={{ maxHeight: '300px' }}
              options={{
                ...options,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

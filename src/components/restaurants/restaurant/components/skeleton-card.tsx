import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white/40 shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>{' '}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>{' '}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>{' '}
        <div className="flex space-x-1 ">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>{' '}
        </div>
      </div>
      <div className="flex justify-end pr-2">
        <div className="w-14 h-11 bg-gray-200 rounded py-2 px-4 rounded mr-2">
        </div>
        <div className="w-14 h-11 bg-gray-200 rounded py-2 px-4 rounded"></div>
      </div>
    </div>
  )
}

export default SkeletonCard

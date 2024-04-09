import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import React, { useMemo } from 'react'
import Spinner from '../utils/spinner'

export type Coordinates = {
  lat: number
  lng: number
} | null

const GoogleMaps = ({ coordinates }: { coordinates: Coordinates }) => {
  const libraries = useMemo(() => ['places'], [])
  const mapCenter = useMemo(
    () => ({ lat: -34.605646, lng: -58.37378 }), //-34.605646, -58.373780
    []
  )

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    libraries: libraries as any,
  })

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <div className="flex lg:w-full lg:mx-auto justify-center">
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={coordinates || mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '80%', height: 250 }}
      >
        {coordinates && <Marker position={coordinates} />}
      </GoogleMap>
    </div>
  )
}

export default GoogleMaps

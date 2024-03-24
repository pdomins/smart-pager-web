import RestaurantCard from '../../restaurant-card'

export default function RestaurantQueue() {
  return (
    <>
      <RestaurantCard orderNumber="Orden 001 - " description="Tres Personas" />
      <RestaurantCard orderNumber="Orden 002 - " description="Dos Personas" />
      <RestaurantCard orderNumber="Orden 003 - " description="Cinco Personas" />
    </>
  )
}

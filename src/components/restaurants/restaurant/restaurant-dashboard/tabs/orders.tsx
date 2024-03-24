import RestaurantCard from '../../restaurant-card'

export default function RestaurantOrders() {
  return (
    <>
      <RestaurantCard
        orderNumber="Orden 001 - "
        description="Pedido: milanesa con papas"
      />
      <RestaurantCard
        orderNumber="Orden 002 - "
        description="Pedido: coca cola grande"
      />
      <RestaurantCard
        orderNumber="Orden 003 - "
        description="Pedido: papas con cheddar"
      />
    </>
  )
}

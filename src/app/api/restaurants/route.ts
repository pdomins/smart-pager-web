
import { RestaurantController } from '@/controllers/restaurant.controller';

export default async function handler(request: Request) {
  const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance?
  const { method } = request
  if (method === 'GET') {
    const result = await restaurantController.getRestaurants()
    return result

  } else if (method === 'POST') {
    const { name, email, password } = await request.json()
    const result = await restaurantController.createRestaurant(name, email, password)
    return result

  } else if (method === 'DELETE') {
    const { id } = await request.json()
    const result = await restaurantController.retireRestaurant(id)
    return result

  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}



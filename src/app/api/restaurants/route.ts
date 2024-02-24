
import { RestaurantController } from '@/controllers/restaurant.controller';


export async function POST(request: Request) {
  const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance?

  const { email, password } = await request.json()
  const result = await restaurantController.login(email, password)
  return result
}

export async function GET() {
  const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance()
  const result = await restaurantController.getRestaurants()
  return result
}

export async function DELETE(request: Request) {
  const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance()
  const { id } = await request.json()
  const result = await restaurantController.retireRestaurant(id)
  return result
}



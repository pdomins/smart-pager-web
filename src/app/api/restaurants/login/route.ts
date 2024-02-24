
import { RestaurantController } from '@/controllers/restaurant.controller';

export async function POST(request: Request) {
    const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance?

    const { email, password } = await request.json()
    const result = await restaurantController.login(email, password)
    return result
}

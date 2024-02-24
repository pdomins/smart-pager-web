
import { RestaurantController } from '@/controllers/restaurant.controller';

export default async function handler(request: Request) {
    const restaurantController: RestaurantController = RestaurantController.getInstance() //TODO: dont use getInstance?
    const { method } = request

    if (method === 'POST') {
        const { email, password } = await request.json()
        const result = await restaurantController.login(email, password)
        return result
    
    } else {
        return new Response('Method not allowed', { status: 405 })
    }
}


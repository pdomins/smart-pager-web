import RestaurantService from "@/services/restaurant.service"
import { NextResponse } from "next/server"

export class RestaurantController {

    private static instance: RestaurantController
    private restaurantService: RestaurantService

    public static getInstance() {
        if (!RestaurantController.instance) {
            RestaurantController.instance = new RestaurantController()
        }
        return RestaurantController.instance
    }

    constructor () {
        this.restaurantService = RestaurantService.getInstance()
    }
    
    public async getRestaurants() {
        try {
            const result = await this.restaurantService.getRestaurants()
            return NextResponse.json(result)

        } catch (error) {
            return NextResponse.error()
        }
    }

    public async createRestaurant(name: string, email: string, password: string) {
        try {
            const result = await this.restaurantService.createRestaurant(name, email, password)
            return NextResponse.json(result)
        } catch (error) {
            return NextResponse.error()
        }
    }

    public async retireRestaurant(id: string) {
        try {
            const result = await this.restaurantService.retireRestaurant(id)
            return NextResponse.json(result)
        } catch (error) {
            return NextResponse.error()
        }
    }

    public async login(email: string, password: string) {
        try {
            const result = await this.restaurantService.login(email, password)
            return NextResponse.json(result)
        } catch (error) {
            return NextResponse.error()
        }
    }
}
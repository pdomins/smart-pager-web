import CryptoHelper from "@/utils/crypto.helpter"
import { sql } from "@vercel/postgres"

export default class RestaurantService {

    private static instance : RestaurantService
    private cryptoHelper: CryptoHelper

    static getInstance() {
        if (!RestaurantService.instance) {
            RestaurantService.instance = new RestaurantService()
        }
        return RestaurantService.instance
    }

    constructor() {
        this.cryptoHelper = CryptoHelper.getInstance()
    }

    public async getRestaurants() {
        const result = await sql`SELECT * FROM Restaurants`
        console.log(result)
        return result.rows
    }

    public async createRestaurant(email: string, name: string) {
        const result = await sql`INSERT INTO Restaurants (email, name) VALUES (${email}, ${name})`
        return result
    
    }

    public async retireRestaurant(id: string) {
        const result = await sql`DELETE FROM Restaurants WHERE id = ${id}`
        return result
    }

    public async retireRestaurantByEmail(email: string) {
        const result = await sql`DELETE FROM Restaurants WHERE email = ${email}`
        return result
    }
}
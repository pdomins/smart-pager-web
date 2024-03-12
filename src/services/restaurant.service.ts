import { sql } from "@vercel/postgres"
export default class RestaurantService {

    private static instance : RestaurantService

    static getInstance() {
        if (!RestaurantService.instance) {
            RestaurantService.instance = new RestaurantService()
        }
        return RestaurantService.instance
    }

    constructor() {
    }

    public async getRestaurants() {
        const result = await sql`SELECT * FROM Restaurants`
        console.log(result)
        return result.rows
    }

    public async getRestaurantById(id: string) {
        const result = await sql`SELECT * FROM Restaurants WHERE id = ${id}`
        return result.rows[0]
    }

    public async getRestaurantByEmail(email: string) {
        console.log({
            POSTGRES_URL: process.env.POSTGRES_URL,
            POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
      });
        const result = await sql`SELECT * FROM Restaurants WHERE email = ${email}`
        
        return result.rows[0]
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
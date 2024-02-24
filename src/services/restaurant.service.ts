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

    public async createRestaurant(name: string, email: string, password: string) {
        const hashedPassword = this.cryptoHelper.hashWithSalt(password)
        const result = await sql`INSERT INTO Restaurants (name, email, hashed_password) VALUES (${name}, ${email}, ${hashedPassword})`
        return result
    
    }

    public async retireRestaurant(id: string) {
        const result = await sql`DELETE FROM Restaurants WHERE id = ${id}`
        return result
    }

    public async login(email: string, password: string) {
        const result = await sql`SELECT * FROM Restaurants WHERE email = ${email}`
        
        if (result.rows.length === 0 || !this.cryptoHelper.validateSaltedHash(password, result.rows[0].hashed_password)) {
            return { error: 'error papi' } //TODO: ERROR CONSTANTS?
        }

        return result.rows
    }
}
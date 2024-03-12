"use server"
import { Restaurant } from "@/types/restaurant"
import { sql } from "@vercel/postgres"


export async function getRestaurants() {
    const result = await sql`SELECT * FROM Restaurants`
    console.log(result)
    return result.rows
}

export async function getRestaurantById(id: string) {
    const result = await sql`SELECT * FROM Restaurants WHERE id = ${id}`
    return result.rows[0]
}

export async function getRestaurantByEmail(email: string): Promise<Restaurant> {
    console.log({
        POSTGRES_URL: process.env.POSTGRES_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    });
    const result = await sql`SELECT * FROM Restaurants WHERE email = ${email}`
    
    return result.rows[0] as Restaurant
}

export async function createRestaurant(email: string, name: string) {
    const result = await sql`INSERT INTO Restaurants (email, name) VALUES (${email}, ${name})`
    return result

}

export async function retireRestaurant(id: string) {
    const result = await sql`DELETE FROM Restaurants WHERE id = ${id}`
    return result
}

export async function retireRestaurantByEmail(email: string) {
    const result = await sql`DELETE FROM Restaurants WHERE email = ${email}`
    return result
}

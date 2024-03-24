'use server'
import { Restaurant } from '@/types/restaurant'
import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export async function getRestaurants() {
  const result = await sql`SELECT * FROM Restaurants`
  return result.rows
}

export async function getRestaurantById(id: number) {
  const result = await sql`SELECT * FROM Restaurants WHERE id = ${id}`
  return result.rows[0]
}

export async function getRestaurantByEmail(email: string): Promise<Restaurant> {
  const result = await sql`SELECT * FROM Restaurants WHERE email = ${email}`

  return result.rows[0] as Restaurant
}

export async function createRestaurant(email: string, name: string) {
  const result =
    await sql`INSERT INTO Restaurants (email, name) VALUES (${email}, ${name})`
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

export async function updateRestaurantMenu(id: number, menuURL: string) {
  const result = await sql`UPDATE restaurants
  SET menu = ${menuURL}
  WHERE id = ${id};`
  return result.rows[0]
}

export async function getRestaurantMenu(id: number) {
  noStore()
  const result = await sql`SELECT menu FROM restaurants
  WHERE id = ${id};`

  return result.rows[0].menu
}

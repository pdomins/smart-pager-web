// export { GET, POST } from "@/auth";
// export const runtime = "edge";
import RestaurantService from "@/services/restaurant.service";
import { sql } from "@vercel/postgres";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn({ user }) {
            // console.log("user:", user,"account: ", account,"profile: ", profile,"email: ", email,"credentials: ", credentials)
            const restaurant = await sql`SELECT * FROM Restaurants WHERE email = ${user.email}`
            if (restaurant.rows.length === 0 && user.email) { //i.e. the user is new
                RestaurantService.getInstance().createRestaurant(user.email, user.name ?? '')
            } else {
                console.log("old user");//TODO: might wanna do something here
            }
          return true
        },
        // async redirect({ url, baseUrl }) {
        //     // console.log("redirect: ",url, baseUrl)
        //   return baseUrl
        // },
        // async session({ session, user, token }) {
        //     // console.log("session: ", session, user, token)
        //   return session
        // },
        // async jwt({ token, user, account, profile, isNewUser }) {
        //     // console.log("token: ", token, "user: ", user,"account: ", account,"profile: ", profile,"is new: ", isNewUser)
        //   return token
        // }
    }
})

export {handler as GET, handler as POST}
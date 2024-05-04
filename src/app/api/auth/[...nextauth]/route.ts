// export { GET, POST } from "@/auth";
// export const runtime = "edge";
import {
  createRestaurant,
  getRestaurantByEmail,
} from '@/repositories/restaurant-respository'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user }) {
      // console.log("user:", user,"account: ", account,"profile: ", profile,"email: ", email,"credentials: ", credentials)
      if (!user || !user.email) return false
      const restaurant = await getRestaurantByEmail(user.email) //TODO: call the service, maybe use id
      if (!restaurant) {
        //i.e. the user is new
        await createRestaurant(user.email, '')
        console.log('new user')
      } else {
        console.log('old user') //TODO: might wanna do something here
      }
      return true
    },
    // async redirect({ url, baseUrl }) {
    //     console.log("redirect: ",url, baseUrl)
    // //   return `${baseUrl}/restaurants/1`
    //     return baseUrl
    // },
    async session({ session }) {
      // console.log("session: ", session, user, token)
      if (session.user && session.user.email) {
        const restaurant = await getRestaurantByEmail(session.user.email) //TODO: call the service, maybe use id

        session.user.name = String(restaurant?.authorized)
      }
      return session
    },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //     // console.log("token: ", token, "user: ", user,"account: ", account,"profile: ", profile,"is new: ", isNewUser)
    //   return token
    // }
  },
})

export { handler as GET, handler as POST }

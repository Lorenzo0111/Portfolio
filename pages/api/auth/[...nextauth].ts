import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import DiscordProvider from "next-auth/providers/discord"
import prisma from "../../../lib/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) session.user.id = user.id;
      return session
    }
  }
}


export default NextAuth(authOptions)
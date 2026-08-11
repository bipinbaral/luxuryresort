import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
// Assuming bcrypt or similar will be used in real app, hardcoding for demo

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        // Simplistic password check for demo
        if (credentials.password === user.password) {
          return { id: user.id, email: user.email, name: user.name, role: user.role }
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  session: {
    strategy: "jwt"
  }
})

export { handler as GET, handler as POST }

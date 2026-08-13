import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string
                    }
                })

                if (!user) {
                    return null
                }

                if (credentials.password === user.password) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: (user as Record<string, any>).role || "admin"
                    }
                }

                return null
            }
        })
    ],

    pages: {
        signIn: "/admin/login"
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
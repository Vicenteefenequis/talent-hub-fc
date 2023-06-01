
import { prisma } from "@/prisma/prisma";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {};
                if (!email || !password) {
                    throw new Error("Missing credentials");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid credentials")
                }
                return user
            }
        })
    ]
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }
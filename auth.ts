import NextAuth, { User } from "next-auth"

import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"


import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

import Credentials from "next-auth/providers/credentials"
import { login } from "@/auth/actions/auth-actions"


const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  
  session: { strategy: "jwt" },

  providers: [ Google, GitHub,
    Credentials({
      credentials: {
        email: { label: "Correo electronico", type: "email", placeholder:"usuaio@email.com"},
        password: { label: "Contrasena", type: "password", placeholder: "*********"},
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>, request: any) {
        const response = await login(credentials.email as string, credentials.password as string);
        if (response) {
          return response as User;
        }
        return null;
      },
    }),
  ],

  callbacks: {

    async signIn({ user, account, profile, email, credentials }) {
      // console.log({user});
      return true;
    },

    async jwt({ token, user, account, profile }) {
      // console.log({ token });
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if ( dbUser?.isActive === false ) {
        throw Error('Usuario no está activo');
      }
    
      token.roles = dbUser?.roles as string[] ?? ['no-roles'];
      token.id    = dbUser?.id ?? 'no-uuid';
    
      return token;
    },

    async session({ session, token, user }) {
      
      if ( session && session.user ) {
        session.user.roles = token.roles as string[];
        session.user.id = token.id as string;

      }

      return session;
    },

    

  },

  
})
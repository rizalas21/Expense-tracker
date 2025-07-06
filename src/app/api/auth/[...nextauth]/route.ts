import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/lib/auth/Login";
import NextAuth, { AuthOptions } from "next-auth";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "auth-session",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        console.log("masuk authorize -> ", credentials);
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { email, password } = credentials;
          const User = await Login(email, password);
          console.log("USER BRO +> ", User);
          if (!User.email) return null;
          return User;
        } catch (err) {
          console.log("error when author => ", err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };

import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/lib/auth/Login";
import NextAuth from "next-auth";

export const authOptions = {
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
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const { email, password } = credentials;
          const User = await Login(email, password);
          if (!User) return null;
          return User;
        } catch (err) {
          console.log("error when author => ", err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.SECRET_AUTH,
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        email: token.email,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

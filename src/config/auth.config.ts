import { AuthServices } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        user: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.user || !credentials.password) return null;

        const res = await AuthServices.login(credentials);
        if (res.status === 401) {
          return null;
        }

        return res;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session, user }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      user = token.user;
      return session;
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },
  },

  pages: {
    signIn: "/login",
  },
};

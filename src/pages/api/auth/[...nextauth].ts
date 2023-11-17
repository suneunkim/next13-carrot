import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/helpers/client";

// 로그인 후 세션으로 유저정보 접근을 위해 Layout에 SessionProvider 추가 -> 삭제
// getServerSession 으로 세션 정보 가져오던걸 서버 컴포넌트에서 처리하도록 변경

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invaild credentials");
        }

        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          // auth 로그인한 경우
          throw new Error("Invaild credentials");
        }
        const isCoorectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCoorectPassword) {
          throw new Error("Invaild credentials password");
        }

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(client),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    }, // token 가져오기
    async session({ session, token }) {
      session.user = token;
      return session;
    }, // session.user에 token 넣기
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
};

export default NextAuth(authOptions);

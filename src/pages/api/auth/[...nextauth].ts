import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export default NextAuth({
  secret: process.env.NEXT_PUBLIC_JWT_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
    }),
  ],
});

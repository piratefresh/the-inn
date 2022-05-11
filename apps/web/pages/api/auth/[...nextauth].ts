//https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import { LoginDocument } from "generated/graphql";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "urql";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "backend/dist/index";

const client = createClient({
  url: "https://localhost:4000/graphql",
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [
      //credentials for store
      CredentialsProvider({
        id: "web_login",
        name: "web_credentials",
        credentials: {
          email: {
            label: "username",
            type: "text",
            placeholder: "username",
          },
          password: { label: "password", type: "password" },
        },
        authorize: async (credentials, req) => {
          //return a user or null if there are problems with the credentials
          //database lookup
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            return user;
          }

          return null;
          //   if (credentials.password === user.) {
          //     const storeObj = {
          //       id: store.id,
          //       username: store.username,
          //       role: store.role,
          //     };
          //     return storeObj;
          //   } else {
          //     //login failed
          //     return null;
          //   }
        },
      }),
    ],

    pages: {
      signIn: "/auth/signin",
    },
  });
}

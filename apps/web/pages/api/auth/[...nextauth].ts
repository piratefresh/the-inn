// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUrqlClient } from "@utils/createUrqlClient";
import { SignInDocument } from "@generated/graphql";
import jwt from "jsonwebtoken";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    // adapter: PrismaAdapter(prisma),
    debug: true,
    providers: [
      //credentials for store
      CredentialsProvider({
        credentials: {
          email: {
            label: "email",
            type: "text",
          },
          password: { label: "password", type: "password" },
        },
        authorize: async (credentials, req) => {
          const { email, password } = credentials;

          const { data, error } = await createUrqlClient
            .mutation(SignInDocument, {
              usernameOrEmail: email,
              password: password,
            })
            .toPromise();

          console.log("dataa: ", data);

          if (data?.signin) {
            return data.signin;
          }

          throw new Error(data.signin.message);
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async redirect({ url, baseUrl }) {
        return `${baseUrl}`;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id;
          token.name = `${user.firstName} ${user.lastName}`;
          token.picture = user.image;
          token.accessToken = user.accounts.refreshToken;
          token.expiresAt = user.accounts.expiresAt;
        }

        return token;
      },

      async session({ session, token, user }) {
        console.log("session: ", session);
        const newSession: Session = {
          ...session,
          accessToken: token.accessToken,
          expires: token.expiresAt,
          id: token?.id,
          user: {
            ...session.user,
          },
        };

        return newSession;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    // cookies: {
    //   sessionToken: {
    //     name: `next-auth.session-token`,
    //     options: { httpOnly: false },
    //   },
    // },
    session: {
      strategy: "jwt",
      maxAge: Date.now() + parseInt(process.env.TOKEN_REFRESH_PERIOD) * 1000,
    },
  });
}

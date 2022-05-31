// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "@utils/createUrqlClient";
import { SignInDocument } from "@generated/graphql";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
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
          //return a user or null if there are problems with the credentials
          //database lookup
          const { email, password } = credentials;

          const { data, error } = await client
            .mutation(SignInDocument, {
              usernameOrEmail: email,
              password: password,
            })
            .toPromise();

          console.log("data: ", data);

          if (!data) {
            throw new Error("Invalid Credentials");
          }

          if (data) {
            return data.signin;
          }

          return null;
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
        }

        return token;
      },

      async session({ session, token, user }) {
        const newSession: Session = {
          ...session,
          user: {
            ...session.user,
            //@ts-ignore
            id: token.id as string,
          },
        };

        return newSession;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  });
}

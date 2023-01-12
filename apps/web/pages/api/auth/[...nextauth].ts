// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextAuth, { Session, SessionOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prismadb";
import { PrismaAdapter } from "@lib/prismaAdapter";
import Cookies from "cookies";
import { setCookie } from "nookies";
import { decode, encode } from "next-auth/jwt";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const SIGN_IN_MUTATION = `
mutation SignIn($usernameOrEmail: String!, $password: String!) {
  signin(usernameOrEmail: $usernameOrEmail, password: $password) {
          ... on User {
            id
            email
            firstName
            lastName
            imageUrl
          }
        }
      }
`;

const SET_SESSION_SOCIAL = `mutation SetSessionSocial($usernameOrEmail: String!) {
  setSessionSocial(usernameOrEmail: $usernameOrEmail)
}`;
const SIGN_OUT_MUTATION = `mutation Logout {
  logout
}`;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, nextAuthOptions(req, res));
}

const session: Partial<SessionOptions> = {
  strategy: "database",
  maxAge: 30 * 24 * 60 * 60, // 30 days
  updateAge: 24 * 60 * 60, // 24 hours
};

const adapter = PrismaAdapter(prisma);

// To generate session
export const nextAuthOptions = (req, res) => ({
  debug: true,
  adapter: adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
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

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL as string,
            {
              query: SIGN_IN_MUTATION,
              variables: {
                usernameOrEmail: email,
                password: password,
              },
            }
          );

          console.log("response: ", response);

          return response.data.data.signin;
        } catch (err) {
          console.log("err3: ", err);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (
        req.query.nextauth?.includes("callback") &&
        req.query.nextauth?.includes("credentials") &&
        req.method === "POST"
      ) {
        if (user && "id" in user) {
          const sessionToken = randomUUID();
          const sessionExpiry = new Date(Date.now() + session.maxAge! * 1000);

          await adapter.createSession({
            sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          } as any);

          const cookies = new Cookies(req, res);
          cookies.set("next-auth.session-token", sessionToken, {
            expires: sessionExpiry,
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
          });
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },

    async session({ session, token, user }) {
      let newSession: Session;
      newSession = {
        ...session,
        id: user?.id,
        user: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          imageUrl: user.imageUrl,
          id: user.id,
        },
      };

      // SET SESSION COOKIE FROM SERVER
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL as string,
        {
          query: SET_SESSION_SOCIAL,
          variables: {
            usernameOrEmail: user.email,
          },
        }
      );
      if (response.data.data.setSessionSocial) {
        const cookies = response.headers["set-cookie"];
        res.setHeader("Set-Cookie", cookies);
      }

      return newSession;
    },
  },
  jwt: {
    encode(params) {
      if (
        req.query.nextauth?.includes("callback") &&
        req.query.nextauth?.includes("credentials") &&
        req.method === "POST"
      ) {
        const cookies = new Cookies(req, res);
        const cookie = cookies.get("next-auth.session-token");

        if (cookie) return cookie;
        else return "";
      }
      // Revert to default behaviour when not in the credentials provider callback flow
      return encode(params);
    },
    async decode(params) {
      if (
        req.query.nextauth?.includes("callback") &&
        req.query.nextauth?.includes("credentials") &&
        req.method === "POST"
      ) {
        return null;
      }
      // Revert to default behaviour when not in the credentials provider callback flow
      return decode(params);
    },
  },
  session,
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,

  events: {
    async signOut() {
      await axios.post(process.env.NEXT_PUBLIC_API_URL as string, {
        query: SIGN_OUT_MUTATION,
      });
      res.setHeader("Set-Cookie", [
        `rid=''; expires=${new Date(
          0
        )}; HttpOnly; Max-Age=0; Path=/; SameSite=Lax`,
      ]);
    },
  },
});

// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextAuth, { NextAuthOptions, Session, SessionOptions } from "next-auth";
import type { CookieOption } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "backend";
import { PrismaAdapter } from "@lib/prismaAdapter";
import Cookies from "cookies";
import { decode, encode } from "next-auth/jwt";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { Account, SignInMutation, User } from "@generated/graphql";
import { Adapter } from "next-auth/adapters";

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

// type JSONResponse = {
//   data?: {
//     signin: Omit<SignInMutation, "fetchedAt">;
//   };
//   errors?: Array<{ message: string }>;
// };

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
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            method: "POST",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: SIGN_IN_MUTATION,
              variables: {
                usernameOrEmail: email,
                password: password,
              },
            }),
            credentials: "include",
          });

          const data = await response.json();
          console.log("data: ", data);
          if (data.data.signin) {
            console.log("res: ", res.headers);
            // const cookie = res.headers.get("set-cookie");

            // res.setHeader("Set-Cookie", cookie);

            // const response = await axios.post(
            //   process.env.NEXT_PUBLIC_API_URL as string,
            //   {
            //     query: SIGN_IN_MUTATION,
            //     headers: {
            //       "Access-Control-Allow-Origin": "*",
            //       "Content-Type": "application/json",
            //     },
            //     variables: {
            //       usernameOrEmail: email,
            //       password: password,
            //     },
            //   }
            // );

            return data.data.signin;
          }
        } catch (err) {
          console.log("err3: ", err);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      console.log("user: ", user);
      console.log("email: ", email);
      console.log("account: ", account);

      if (!user.email) {
        return false;
      }

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

          const cookies = new Cookies(req, res, { secure: true });

          cookies.set(
            process.env.NODE_ENV === "production"
              ? `__Secure-next-auth.session-token`
              : `next-auth.session-token`,
            sessionToken,
            {
              expires: sessionExpiry,
              httpOnly: true,
              sameSite: "none" as "none",
              path: "/",
              secure: process.env.NODE_ENV === "production" ? true : false,
              domain: process.env.NEXT_PUBLIC_VERCEL_URL
                ? ".theinn.app"
                : undefined,
            }
          );

          return true;
        }
      }

      if (account.provider != "github" && account.provider != "google") {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        // User account already exists, check if it's linked to the account
        const linkedAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: existingUser.id,
            },
          },
        });

        if (linkedAccount) {
          return true;
        }

        await linkAccount(existingUser, account, adapter);
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },

    async session({ session, token, user }) {
      let newSession: Session;
      const jwtToken = jwt.sign(
        { userId: user?.id },
        process.env.JWT_SECRET_KEY
      );
      newSession = {
        ...session,
        id: user?.id,
        token: jwtToken,
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
          withCredentials: true,
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
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none" as "none",
        path: "/",
        secure: process.env.NODE_ENV === "production" ? true : false,
      },
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
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      res.setHeader(
        "Set-Cookie",
        `token=${process.env.JWT_COOKIE_NAME}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
    },
  },
});

const linkAccount = async (user: any, account: Account, adapter: Adapter) => {
  return await adapter.linkAccount({
    providerAccountId: account.providerAccountId,
    userId: user.id,
    provider: account.provider,
    type: "oauth",
    scope: account.scope,
    token_type: account.token_type,
    access_token: account.access_token,
  });
};

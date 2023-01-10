// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUrqlClient } from "@utils/createUrqlClient";
import { SignInDocument, SignoutDocument } from "@generated/graphql";
import { createClient } from "urql";

const urqlConfig = createUrqlClient();
const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    credentials: "include" as const,
  },
});

const SIGN_IN_MUTATION = `
mutation SignIn($usernameOrEmail: String!, $password: String!) {
  signin(usernameOrEmail: $usernameOrEmail, password: $password) {
          ... on User {
            id
            email
            firstName
            lastName
            imageUrl
            accounts {
              provider
              providerAccountId
              type
              expiresAt
              refreshToken
              userId
            }
          }
        }
      }
`;

const SIGN_OUT_MUTATION = `mutation Logout {
  logout
}`;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, nextAuthOptions(req, res));
}

// To generate session
export const nextAuthOptions = (req, res) => ({
  debug: true,
  providers: [
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

        if (response.data.data.signin) {
          console.log("headers: ", response.headers);
          console.log(response.headers["set-cookie"]);

          const cookies = response.headers["set-cookie"];
          res.setHeader("Set-Cookie", cookies);

          return response.data.data.signin;
        }

        throw new Error(response.data.data.signin.message);
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
        console.log("user: ", user);
        token.id = user.id;
        token.name = `${user.firstName} ${user.lastName}`;
        token.picture = user.imageUrl ?? "";
        token.accessToken = user.accounts.refreshToken;
        token.expiresAt = user.accounts.expiresAt;
      }

      return token;
    },

    async session({ session, token, user }) {
      const newSession: Session = {
        ...session,
        expires: token.exp,
        id: token?.id,
        user: {
          ...session.user,
          image: session.user.image ?? null,
        },
      };

      return newSession;
    },
  },
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

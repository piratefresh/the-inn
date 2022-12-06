// https://github.com/tericcabrel/tech-career-growth/blob/e5cd22c8184b7324b952a352c35697cc52c5faad/src/pages/api/auth/%5B...nextauth%5D.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUrqlClient } from "@utils/createUrqlClient";
import { SignInDocument } from "@generated/graphql";
import { createClient } from "urql";

const urqlConfig = createUrqlClient();
const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    credentials: "include" as const,
  },
});

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

          const { data, error } = await client
            .mutation(SignInDocument, {
              usernameOrEmail: email,
              password: password,
            })
            .toPromise();

          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL as string,
            {
              query: `
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
                      `,
              variables: {
                usernameOrEmail: email,
                password: password,
              },
            }
          );

          if (data?.signin) {
            const cookies = response.headers["set-cookie"];
            res.setHeader("Set-Cookie", cookies);

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
    events: {
      async signOut() {
        res.setHeader("Set-Cookie", [
          `rid=''; expires=${new Date(
            0
          )}; HttpOnly; Max-Age=0; Path=/; SameSite=Lax`,
        ]);
      },
    },
  });
}

export const nextAuthOptions = (req, res) => ({
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

        const { data, error } = await client
          .mutation(SignInDocument, {
            usernameOrEmail: email,
            password: password,
          })
          .toPromise();

        const response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL as string,
          {
            query: `
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
    `,
            variables: {
              usernameOrEmail: email,
              password: password,
            },
          }
        );

        console.log(response.headers["set-cookie"]);

        if (data?.signin) {
          const cookies = response.headers["set-cookie"];
          res.setHeader("Set-Cookie", cookies);

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
  events: {
    async signOut() {
      res.setHeader("Set-Cookie", [
        `rid=''; expires=${new Date(
          0
        )}; HttpOnly; Max-Age=0; Path=/; SameSite=Lax`,
      ]);
    },
  },
});

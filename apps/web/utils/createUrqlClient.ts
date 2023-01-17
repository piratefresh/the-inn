import {
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  errorExchange as urqlErrorExchange,
  ssrExchange as UrqlSSRExchange,
  Operation,
} from "urql";
import { makeOperation } from "@urql/core";
import { cacheExchange } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { authExchange } from "@urql/exchange-auth";
import { devtoolsExchange } from "@urql/devtools";
import Router from "next/router";
import { createClient as createWSClient } from "graphql-ws";
import {
  GetUnreadNotificationsDocument,
  GetUnreadNotificationsQuery,
  NewCampaignApplicationSubscription,
  NotificationType,
} from "@generated/graphql";
import { isServer } from "./isServer";
import { SSRExchange } from "next-urql";
import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

type AuthState = {
  token: string;
} | null;

export const errorExchange = urqlErrorExchange({
  onError: (error) => {
    if (error) {
      console.log("error: ", error);
      if (error?.message.includes("Not Authenticated")) {
        Router.replace("/login");
      }
    }
  },
});

const wsClient = () =>
  createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL,
  });

export const ssrExchange: SSRExchange = UrqlSSRExchange({
  isClient: !isServer,
});

const createUrqlClient = (ssrExchange?: any, ctx?: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
            "X-Forwarded-Proto": "https",
            "Access-Control-Allow-Origin": "*",
          }
        : undefined,
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          UserConnection: () => null,
        },
        resolvers: {
          Query: {
            getUsers: relayPagination({
              mergeMode: "inwards",
            }),
          },
        },
        updates: {
          Mutation: {
            setNotificationsRead(_result, args, cache, _info) {
              const fields = cache
                .inspectFields("Query")
                .filter((field) => field.fieldName === "todos")
                .forEach((field) => {
                  cache.updateQuery(
                    {
                      query: GetUnreadNotificationsDocument,
                    },
                    (data) => {
                      data.notification = data.notification.filter(
                        (n) => n.id !== args.id
                      );
                      return data;
                    }
                  );
                });
            },
          },
          Subscription: {
            newCampaignApplication: (
              result: NewCampaignApplicationSubscription,
              variables,
              cache
            ) => {
              cache.updateQuery<GetUnreadNotificationsQuery>(
                { query: GetUnreadNotificationsDocument },
                (data) => {
                  if (!data) return null;

                  const newNotifications: GetUnreadNotificationsQuery["getUnreadNotifications"][0] =
                    {
                      id: result.newCampaignApplication.notificationId,
                      message: result.newCampaignApplication.message,
                      read: result.newCampaignApplication.read,
                      relatedId: result.newCampaignApplication.relatedId,
                      createdAt: result.newCampaignApplication.createdAt,
                      updatedAt: result.newCampaignApplication.updatedAt,
                      type: result.newCampaignApplication
                        .type as NotificationType,
                      userId: result.newCampaignApplication.gameMasterId,
                      __typename: "Notification",
                      user: result.newCampaignApplication.user,
                      imageUrl: result.newCampaignApplication.imageUrl,
                    };
                  data.getUnreadNotifications.push(newNotifications);

                  return data;
                }
              );
            },
          },
        },
      }),
      // authExchange({
      //   getAuth: async ({ authState, mutate }: any) => {
      //     if (!authState) {
      //       const session = await getSession();
      //       // @ts-ignore
      //       if (session?.token) {
      //         // @ts-ignore
      //         return { token: session.token };
      //       }
      //       return null;
      //     }
      //   },
      //   willAuthError: ({ authState }) => {
      //     if (!authState) return true;
      //     // e.g. check for expiration, existence of auth etc
      //     return false;
      //   },
      //   addAuthToOperation: ({
      //     authState,
      //     operation,
      //   }: {
      //     authState: any;
      //     operation: Operation;
      //   }) => {
      //     if (!authState?.token) {
      //       return operation;
      //     }
      //     console.log("authstate: ", authState);
      //     const fetchOptions =
      //       typeof operation.context.fetchOptions === "function"
      //         ? operation.context.fetchOptions()
      //         : operation.context.fetchOptions || {};
      //     return makeOperation(operation.kind, operation, {
      //       ...operation.context,
      //       fetchOptions: {
      //         ...fetchOptions,
      //         headers: {
      //           ...fetchOptions.headers,
      //           Authorization: `Bearer ${authState.token}`,
      //         },
      //       },
      //     });
      //   },
      //   didAuthError: (params) => {
      //     console.error("didAuthError", params);
      //     return params.error.message.includes("JWT");
      //   },
      // }),
      errorExchange,
      ssrExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient().subscribe(operation, sink),
          }),
        }),
      }),
    ],
  };
};

export { createUrqlClient };

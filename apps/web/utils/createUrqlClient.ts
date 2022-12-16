import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  errorExchange as urqlErrorExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { createClient as createWSClient } from "graphql-ws";
import { isServer } from "./isServer";
import {
  GetUnreadNotificationsDocument,
  GetUnreadNotificationsQuery,
  NewCampaignApplicationSubscription,
  NotificationType,
} from "@generated/graphql";

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
    url: "ws://localhost:4000/graphql",
  });

const createUrqlClient = (ssrExchange?: any, ctx?: any) => {
  console.log("CTX: ", ctx);
  let cookie = "";
  // if (isServer()) {
  //   cookie = ctx?.req?.headers?.cookie;
  // }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
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
                  console.log("data: ", data);
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
                    };
                  data.getUnreadNotifications.push(newNotifications);

                  console.log("data: ", data);
                  return data;
                }
              );
            },
          },
        },
      }),
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

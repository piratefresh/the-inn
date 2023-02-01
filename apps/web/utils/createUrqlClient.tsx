import {
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  errorExchange as urqlErrorExchange,
  ssrExchange as UrqlSSRExchange,
} from "urql";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { devtoolsExchange } from "@urql/devtools";
import Router from "next/router";
import { createClient as createWSClient } from "graphql-ws";
import {
  GetUnreadNotificationsDocument,
  GetUnreadNotificationsQuery,
  GetUserPrivateMessagesDocument,
  GetUserPrivateMessagesQuery,
  NewCampaignApplicationSubscription,
  NewPrivateMessageSubscription,
  NotificationType,
} from "@generated/graphql";
import { isServer } from "./isServer";
import { SSRExchange } from "next-urql";

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

function invalidateQuery(cache: Cache, queryName: string) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === queryName);
  fieldInfos.map((field) => {
    cache.invalidate("Query", queryName, field.arguments);
  });
}

export const createUrqlClient = (ssrExchange?: any, ctx?: any) => {
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
            createCampaign: (_result, args, cache, info) => {
              invalidateQuery(cache, "getCampaigns");
            },
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
            newPrivateMessage: async (
              result: NewPrivateMessageSubscription,
              variables,
              cache,
              info
            ) => {
              cache.updateQuery<GetUserPrivateMessagesQuery>(
                {
                  query: GetUserPrivateMessagesDocument,
                },
                (data) => {
                  if (!data) return null;
                  const matchingMessage = data.getUserPrivateMessages.find(
                    (message) => {
                      return (
                        (message.senderId ===
                          result.newPrivateMessage.senderId &&
                          message.recipientId ===
                            result.newPrivateMessage.recipientId) ||
                        (message.senderId ===
                          result.newPrivateMessage.recipientId &&
                          message.recipientId ===
                            result.newPrivateMessage.senderId)
                      );
                    }
                  );

                  if (matchingMessage) {
                    Object.assign(matchingMessage, result.newPrivateMessage);
                  } else {
                    // @ts-ignore
                    data.getUserPrivateMessages.push(result.newPrivateMessage);
                  }

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

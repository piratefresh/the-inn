import {
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  ssrExchange,
  createClient,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { isServer } from "./isServer";

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          if (error?.message.includes("Not Authenticated")) {
            Router.replace("/login");
          }
        }
      })
    );
  };

const ssrCache = ssrExchange({ isClient: !isServer });

const client = createClient({
  url: process.env.API_SERVER,
  // fetchOptions: {
  //   credentials: "include" as const,
  // },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
    }),
    errorExchange,
    ssrCache,
    fetchExchange,
    // subscriptionExchange({
    //   forwardSubscription: (operation) => ({
    //     subscribe: (sink) => ({
    //       unsubscribe: wsClient.subscribe(operation, sink),
    //     }),
    //   }),
    // }),
  ],
});

export { client, ssrCache };

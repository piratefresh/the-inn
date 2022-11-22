import {
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
  subscriptionExchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { devtoolsExchange } from "@urql/devtools";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";
import { createClient as createWSClient } from "graphql-ws";
import { isServer } from "./isServer";

console.log("process.env.NEXT_PUBLIC_WS_URL: ", process.env.NEXT_PUBLIC_WS_URL);

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
      }),
      errorExchange,
      ssrCache,
      fetchExchange,
      // subscriptionExchange({
      //   forwardSubscription: (operation) => ({
      //     subscribe: (sink) => ({
      //       unsubscribe: wsClient().subscribe(operation, sink),
      //     }),
      //   }),
      // }),
    ],
  };
};

// const createUrqlClient = createClient({
//   url: process.env.API_SERVER,
//   fetchOptions: {
//     credentials: "include" as const,
//   },
//   exchanges: [
//     devtoolsExchange,
//     dedupExchange,
//     cacheExchange({
//       keys: {
//         PaginatedPosts: () => null,
//       },
//     }),
//     errorExchange,
//     ssrCache,
//     fetchExchange,
//     // subscriptionExchange({
//     //   forwardSubscription: (operation) => ({
//     //     subscribe: (sink) => ({
//     //       unsubscribe: wsClient.subscribe(operation, sink),
//     //     }),
//     //   }),
//     // }),
//   ],
// });

const basicClient = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
    }),
    ssrCache,
    fetchExchange,
  ],
});

const urqlExchanges = [
  dedupExchange,
  cacheExchange({
    keys: {
      PaginatedPosts: () => null,
    },
  }),
  ssrCache,
  fetchExchange,
];

export { createUrqlClient, basicClient, ssrCache, urqlExchanges };

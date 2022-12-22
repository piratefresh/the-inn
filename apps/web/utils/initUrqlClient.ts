import { SSRExchange } from "next-urql";
import {
  cacheExchange,
  Client,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";
import { isServer } from "./isServer";

/**
 * Function to initialize urql client. can be used both on client and server
 * @param initialState -  usually the data from the server returned as props
 * @param url - graphql endpoint
 * @returns and object with urqlClient and ssrCache
 */
export function initUrqlClient(
  url: string = process.env.NEXT_PUBLIC_API_URL,
  initialState?
) {
  let urqlClient: Client | null = null;
  let ssrCache: SSRExchange | null = null;

  if (!urqlClient) {
    //fill the client with initial state from the server.
    ssrCache = ssrExchange({ initialState, isClient: !isServer });

    urqlClient = createClient({
      url: url,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache, // Add `ssr` in front of the `fetchExchange`
        fetchExchange,
      ],
    });
  } else {
    //when navigating to another page, client is already initialized.
    //lets restore that page's initial state
    ssrCache?.restoreData(initialState);
  }

  // Return both the Client instance and the ssrCache.
  return { urqlClient, ssrCache };
}

import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

// With caching it messes up product attributes with the same name
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

// Apollo Client singleton
export const client = (() => {
  return new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    defaultOptions,
  });
})();

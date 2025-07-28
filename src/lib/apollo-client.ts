import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://graphql.anilist.co"
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

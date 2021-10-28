import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { split, HttpLink } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { SubscriptionClient } from "subscriptions-transport-ws";

// import { WebSocketLink } from 'apollo-link-ws';

// const wsLink = new WebSocketLink(
//   new SubscriptionClient(
//     "ws://fakeql.com/graphql/05b43b4227b4a3ed1d3a32041ec9472a/subscriptions",
//     { reconnect: true },
//     ws
//   )
// );

// const httpLink = new HttpLink({
//   uri: "https://fakeql.com/graphql/05b43b4227b4a3ed1d3a32041ec9472a",
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

const client = new ApolloClient({
  //   link: splitLink,
  uri: "https://fakeql.com/graphql/05b43b4227b4a3ed1d3a32041ec9472a",
  cache: new InMemoryCache(),
});

export default client;

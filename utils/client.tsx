import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://hemmingway.herokuapp.com/graphql"
);

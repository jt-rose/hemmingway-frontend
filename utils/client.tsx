import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://hemmingway.herokuapp.com/graphql"
    : "http://localhost:8000/graphql";

export const client = new GraphQLClient(endpoint);

import { GraphQLClient } from "graphql-request";

const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://hemmingway.herokuapp.com/graphql"
    : "http://localhost:8000/graphql";

export const initClient = (token: string) =>
  new GraphQLClient(endpoint, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

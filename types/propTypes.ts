import { GraphQLClient } from "graphql-request";

export interface PropTypes {
  gqlClient: GraphQLClient;
}

export interface PropTypesWithDate extends PropTypes {
  date: string; // "2022-03-29"
}

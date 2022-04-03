import { GraphQLClient } from "graphql-request";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Navbar } from "./Navbar";

// add Head

export const Layout = (props: {
  children: ReactNode;
  gqlClient: GraphQLClient;
  setToken: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <main>
      <Navbar gqlClient={props.gqlClient} setToken={props.setToken} />
      {props.children}
    </main>
  );
};

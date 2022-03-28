import { Layout } from "components/Layout";
import React from "react";
import { useUserQuery } from "src/generated/graphql-hooks";
import { client } from "utils/client";

const Home = () => {
  const { data, error, isLoading } = useUserQuery(client);

  console.log("data: ", data);

  return (
    <Layout>
      <h1>Home</h1>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
    </Layout>
  );
};

export default Home;

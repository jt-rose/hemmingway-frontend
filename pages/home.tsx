import { Layout } from "components/Layout";
import React from "react";
import { useQueryClient, useQuery } from "react-query";
import { useMeQuery } from "src/generated/graphql-hooks";
import { client } from "utils/client";

const Home = () => {
  const { data, error, isLoading } = useMeQuery(client);

  console.log("data: ", data);

  return (
    <Layout>
      <h1>Home</h1>
      <p>Data: {`${data}`}</p>
    </Layout>
  );
};

export default Home;

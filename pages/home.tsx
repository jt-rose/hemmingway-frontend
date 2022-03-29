import { Layout } from "components/Layout";
import React from "react";
import { useUserQuery } from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";

const Home = (props: PropTypes) => {
  const { data, error, isLoading } = useUserQuery(props.gqlClient);

  console.log("data: ", data);

  return (
    <Layout>
      <h1>Home</h1>
      <p>Data: {`${data?.user?.name}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
    </Layout>
  );
};

export default Home;

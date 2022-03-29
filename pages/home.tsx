import { Layout } from "components/Layout";
import React from "react";
import {
  useUserQuery,
  useExercisesByDateQuery,
} from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";
import dayjs from "dayjs";
import { Exercise } from "../components/exercise/Exercise";

const Home = (props: PropTypes) => {
  console.log("home gql: ", props.gqlClient);
  const date = dayjs().format("YYYY-MM-DD");
  //const { data, error, isLoading } = useUserQuery(props.gqlClient);
  const { data, error, isLoading } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: date,
  });

  console.log("data: ", data);
  if (isLoading) {
    return <h3>... loading</h3>;
  } else if (error) {
    return <h3>Error</h3>;
  } else {
    return (
      <Layout>
        <h1>Home</h1>
        <Exercise gqlClient={props.gqlClient} date={date} />
      </Layout>
    );
  }
};

export default Home;

import { Layout } from "components/Layout";
import React from "react";
import {
  useUserQuery,
  useExercisesByDateQuery,
  CreateExerciseMutation,
  useCreateExerciseMutation,
} from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";
import { Exercise } from "../components/Exercise";

const Home = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const date = dayjs().format("YYYY-MM-DD");
  console.log(date);
  //const { data, error, isLoading } = useUserQuery(props.gqlClient);
  const { data, error, isLoading } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: date,
  });

  const addExercise = useCreateExerciseMutation(props.gqlClient);

  console.log("data: ", data);
  //console.log("ex: ", exercises.data);

  return (
    <Layout>
      <h1>Home</h1>
      <Exercise gqlClient={props.gqlClient} date={date} />
    </Layout>
  );
};

export default Home;

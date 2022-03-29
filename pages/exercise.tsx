import { Layout } from "components/Layout";
import { useUserQuery, useExercisesQuery } from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";

const Exercise = (props: PropTypes) => {
  const { data } = useUserQuery(props.gqlClient);
  const exercises = useExercisesQuery(props.gqlClient, { page: 1 });

  console.log("data: ", data);
  console.log("exercises: ", exercises.data);
  return (
    <Layout>
      <h1>Exercise</h1>
    </Layout>
  );
};

export default Exercise;

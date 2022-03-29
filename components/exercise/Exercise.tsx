import {
  useExercisesByDateQuery,
  useDeleteExerciseMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { AddExercise } from "./AddExercise";
import { UpdateExercise } from "./UpdateExercise";

export const Exercise = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: props.date,
  });

  const deleteExercise = useDeleteExerciseMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };
  return (
    <div>
      <h3>Exercises</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.exercisesByDate.map((ex) => (
        <div key={"exercise-" + ex.id}>
          <h3
            onClick={() =>
              deleteExercise.mutate({ id: ex.id }, refetchDirective)
            }
          >
            {ex.name}
          </h3>
          <UpdateExercise gqlClient={props.gqlClient} exercise={ex} />
        </div>
      ))}
      <AddExercise gqlClient={props.gqlClient} date={props.date} />
    </div>
  );
};

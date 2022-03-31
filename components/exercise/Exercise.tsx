import {
  useExercisesByDateQuery,
  useDeleteExerciseMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { AddExercise } from "./AddExercise";
import { UpdateExercise } from "./UpdateExercise";
import { ModalForm } from "components/forms/ModalForm";

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
      {/* <AddExercise gqlClient={props.gqlClient} date={props.date} /> */}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="EXERCISE"
        addOrUpdate="ADD"
      />
    </div>
  );
};

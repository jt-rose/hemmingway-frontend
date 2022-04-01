import {
  useExercisesByDateQuery,
  useDeleteExerciseMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { ModalForm } from "components/forms/ModalForm";
import { ExerciseCard } from "./ExerciseCard";

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
        <ExerciseCard gqlClient={props.gqlClient} exercise={ex} />
      ))}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="EXERCISE"
        addOrUpdate="ADD"
        date={props.date}
      />
    </div>
  );
};

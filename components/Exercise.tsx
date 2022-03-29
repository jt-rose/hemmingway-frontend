import {
  useExercisesByDateQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import dayjs from "dayjs";
import { useQueryClient } from "react-query";

export const Exercise = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: props.date,
  });
  const addExercise = useCreateExerciseMutation(props.gqlClient);
  const updateExercise = useUpdateExerciseMutation(props.gqlClient);
  const deleteExercise = useDeleteExerciseMutation(props.gqlClient);
  return (
    <div>
      <h3>Exercises</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.exercisesByDate.map((ex) => (
        <div>
          <h3
            key={ex.id}
            onClick={() =>
              deleteExercise.mutate(
                { id: ex.id },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries(["ExercisesByDate"]);
                  },
                }
              )
            }
          >
            {ex.name}
          </h3>
          <button
            onClick={() =>
              updateExercise.mutate(
                {
                  id: ex.id,
                  input: {
                    calories: 300,
                    date_of_exercise: dayjs().format("YYYY-MM-DD"),
                    minutes: 30,
                    name: "swimming",
                  },
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries(["ExercisesByDate"]);
                  },
                }
              )
            }
          >
            Update
          </button>
        </div>
      ))}
      <button
        onClick={() => {
          addExercise.mutate(
            {
              input: {
                calories: 300,
                date_of_exercise: dayjs().format("YYYY-MM-DD"),
                minutes: 30,
                name: "jogging",
              },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["ExercisesByDate"]);
              },
            }
          );
        }}
      >
        Add Exercise
      </button>
    </div>
  );
};

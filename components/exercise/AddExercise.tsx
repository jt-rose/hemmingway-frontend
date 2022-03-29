import { useCreateExerciseMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const AddExercise = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addExercise.mutate(
      {
        input: data,
      },
      refetchDirective
    );

  const addExercise = useCreateExerciseMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="exercise-calories-input">calories</label>
        <input
          id="exercise-calories-input"
          type="number"
          {...register("calories", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="exercise-date-input">date</label>
        <input
          id="exercise-date-input"
          type="date"
          {...register("date_of_exercise")}
        />

        <label htmlFor="exercise-minutes-input">minutes</label>
        <input
          id="exercise-minutes-input"
          type="number"
          {...register("minutes", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="exercise-name-input">name</label>
        <input id="exercise-name-input" {...register("name")} />

        <input type="submit" value="Add Exercise" />
      </form>
    </div>
  );
};

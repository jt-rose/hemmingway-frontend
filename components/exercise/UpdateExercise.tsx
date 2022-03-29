import { useUpdateExerciseMutation } from "src/generated/graphql-hooks";
import { PropTypesWithExercise } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const UpdateExercise = (props: PropTypesWithExercise) => {
  const {
    id,
    name,
    steps,
    minutes,
    date_of_exercise,
    distance_in_miles,
    calories,
  } = props.exercise;
  const initialFormData = {
    name,
    steps,
    minutes,
    date_of_exercise,
    distance_in_miles,
    calories,
  };
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) =>
    updateExercise.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );

  const updateExercise = useUpdateExerciseMutation(props.gqlClient);

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

        <label htmlFor="exercise-miles-input">miles</label>
        <input
          id="exercise-miles-input"
          type="number"
          {...register("distance_in_miles", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="exercise-steps-input">steps</label>
        <input
          id="exercise-steps-input"
          type="number"
          {...register("steps", {
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

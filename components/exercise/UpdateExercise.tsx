import { useUpdateExerciseMutation } from "src/generated/graphql-hooks";
import { PropTypesWithExercise } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateExercise.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateExercise = useUpdateExerciseMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"exercise-calories-input" + id}>calories</label>
          <input
            id={"exercise-calories-input" + id}
            type="number"
            {...register("calories", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={"exercise-date-input" + id}>date</label>
          <input
            id={"exercise-date-input" + id}
            type="date"
            {...register("date_of_exercise")}
          />

          <label htmlFor={"exercise-minutes-input" + id}>minutes</label>
          <input
            id={"exercise-minutes-input" + id}
            type="number"
            {...register("minutes", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={"exercise-miles-input" + id}>miles</label>
          <input
            id={"exercise-miles-input" + id}
            type="number"
            {...register("distance_in_miles", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={"exercise-steps-input" + id}>steps</label>
          <input
            id={"exercise-steps-input" + id}
            type="number"
            {...register("steps", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={"exercise-name-input" + id}>name</label>
          <input id={"exercise-name-input" + id} {...register("name")} />

          <input type="submit" value="Update" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

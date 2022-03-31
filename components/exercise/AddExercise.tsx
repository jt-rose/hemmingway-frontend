import { useCreateExerciseMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal, PropTypesWithModalForm } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";

export const AddExercise = (props: PropTypesWithModal) => {
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
      props.closeModal();
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Add Exercise"
        closeModal={props.closeModal}
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <label htmlFor="exercise-calories-input">calories</label>
        <input
          id="exercise-calories-input"
          type="number"
          {...register("calories", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="exercise-calories-input"
          label="Calories"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("calories", { valueAsNumber: true })}
        />

        {/* <label htmlFor="exercise-date-input">date</label>
        <input
          id="exercise-date-input"
          type="date"
          {...register("date_of_exercise")}
        /> */}

        <Input
          id="exercise-date-input"
          label="date"
          placeholder=""
          required={true}
          type="date"
          formConnect={register("date_of_exercise")}
        />

        {/* <label htmlFor="exercise-minutes-input">minutes</label>
        <input
          id="exercise-minutes-input"
          type="number"
          {...register("minutes", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="exercise-minutes-input"
          label="Minutes"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("minutes", { valueAsNumber: true })}
        />

        {/* <label htmlFor="exercise-miles-input">miles</label>
        <input
          id="exercise-miles-input"
          type="number"
          {...register("distance_in_miles", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="exercise-miles-input"
          label="Miles"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("distance_in_miles", { valueAsNumber: true })}
        />

        {/* <label htmlFor="exercise-steps-input">steps</label>
        <input
          id="exercise-steps-input"
          type="number"
          {...register("steps", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="exercise-steps-input"
          label="Steps"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("steps", { valueAsNumber: true })}
        />

        {/* <label htmlFor="exercise-name-input">name</label>
        <input id="exercise-name-input" {...register("name")} /> */}

        <Input
          id="exercise-name-input"
          label="Exercise Name"
          placeholder="some text..."
          required={true}
          type="text"
          formConnect={register("name")}
        />

        {/* <input type="submit" value="Add Exercise" /> */}
      </Form>
    </div>
  );
};

import { useCreateExerciseMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal } from "types/propTypes";
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
        input: { ...data, date_of_exercise: props.date },
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
        <Input
          id="exercise-calories-input"
          label="Calories"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("calories", { valueAsNumber: true })}
        />

        <Input
          id="exercise-minutes-input"
          label="Minutes"
          placeholder=""
          required={true}
          type="number"
          formConnect={register("minutes", { valueAsNumber: true })}
        />

        <Input
          id="exercise-miles-input"
          label="Miles"
          placeholder=""
          required={false}
          type="number"
          formConnect={register("distance_in_miles", { valueAsNumber: true })}
        />

        <Input
          id="exercise-steps-input"
          label="Steps"
          placeholder=""
          required={false}
          type="number"
          formConnect={register("steps", { valueAsNumber: true })}
        />

        <Input
          id="exercise-name-input"
          label="Exercise Name"
          placeholder="some text..."
          required={true}
          type="text"
          formConnect={register("name")}
        />
      </Form>
    </div>
  );
};

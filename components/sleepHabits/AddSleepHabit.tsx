import { useCreateSleepHabitMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
//import { Input } from "../forms/Input";
import { Select } from "components/forms/Select";

export const AddSleepHabit = (props: PropTypesWithModal) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addSleepHabit.mutate(
      {
        input: { ...data, date_of_sleep: props.date, note: "note" },
      },
      refetchDirective
    );

  const addSleepHabit = useCreateSleepHabitMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      props.closeModal();
      queryClient.invalidateQueries(["SleepHabitsByDate"]);
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Add Sleep Habit"
        closeModal={props.closeModal}
      >
        <Select
          id="sleep-quality-input"
          selectOptions={["GOOD", "DECENT", "POOR"]}
          formConnect={register("quality")}
          label="Sleep Quality"
        />

        <Select
          id="sleep-amount-input"
          selectOptions={["FULL", "FEW", "NONE", "EXTRA"]}
          formConnect={register("amount")}
          label="Sleep Amount"
        />

        {/* <Input
          id="sleep-note-input"
          label="Note"
          placeholder="some text..."
          required={false}
          type="text"
          formConnect={register("note")}
        /> */}
      </Form>
    </div>
  );
};

import { useUpdateSleepHabitMutation } from "src/generated/graphql-hooks";
import { PropTypesWithSleepHabitAndModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "../forms/Form";
import { Select } from "components/forms/Select";
import { Input } from "components/forms/Input";

export const UpdateSleepHabit = (props: PropTypesWithSleepHabitAndModal) => {
  const { id, quality, date_of_sleep, amount, note } = props.sleepHabit;
  const initialFormData = {
    quality,
    note,
    date_of_sleep,
    amount,
  };
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    props.closeModal();
    updateSleepHabit.mutate(
      {
        id,
        input: { ...data, note: "note" },
      },
      refetchDirective
    );
  };

  const updateSleepHabit = useUpdateSleepHabitMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["SleepHabitsByDate"]);
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Update Sleep habit"
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

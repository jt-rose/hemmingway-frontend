import { useCreateSleepHabitMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "../forms/Input";
import { Select } from "components/forms/Select";

export const AddSleepHabit = (props: PropTypesWithModal) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addSleepHabit.mutate(
      {
        input: { ...data, date_of_sleep: props.date },
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
        submitButtonName="Add Mood"
        closeModal={props.closeModal}
      >
        {/* <label htmlFor="sleep-date-input">date</label>
        <input
          id="sleep-date-input"
          type="date"
          {...register("date_of_sleep")}
        /> */}

        {/* <Input
          id="sleep-date-input"
          label="date"
          placeholder=""
          required={true}
          type="date"
          formConnect={register("date_of_sleep")}
        /> */}

        {/* <label htmlFor="sleep-quality-input">Sleep Quality</label>
        <select id={"sleep-quality-input"} {...register("quality")}>
          {["GOOD", "DECENT", "POOR"].map((sq) => (
            <option value={sq} key={sq + "-update-select"}>
              {sq}
            </option>
          ))}
        </select> */}

        <Select
          id="sleep-quality-input"
          selectOptions={["GOOD", "DECENT", "POOR"]}
          formConnect={register("quality")}
          label="Sleep Quality"
        />

        {/* <label htmlFor={"sleep-amount-input"}>sleep amount</label>
        <select id={"sleep-amount-input"} {...register("amount")}>
          {["FULL", "FEW", "NONE", "EXTRA"].map((m) => (
            <option value={m} key={m + "-update-select"}>
              {m}
            </option>
          ))}
        </select> */}

        <Select
          id="sleep-amount-input"
          selectOptions={["FULL", "FEW", "NONE", "EXTRA"]}
          formConnect={register("amount")}
          label="Sleep Amount"
        />

        {/* <label htmlFor={"sleep-note-input"}>note</label>
        <input id={"sleep-note-input"} {...register("note")} /> */}

        <Input
          id="sleep-note-input"
          label="Note"
          placeholder="some text..."
          required={true}
          type="text"
          formConnect={register("note")}
        />
      </Form>
    </div>
  );
};

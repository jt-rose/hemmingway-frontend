import { useUpdateSleepHabitMutation } from "src/generated/graphql-hooks";
import { PropTypesWithSleepHabit } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateSleepHabit = (props: PropTypesWithSleepHabit) => {
  const { id, quality, date_of_sleep, amount, note } = props.sleepHabit;
  const initialFormData = {
    quality,
    note,
    date_of_sleep,
    amount,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateSleepHabit.mutate(
      {
        id,
        input: data,
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
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"sleep-date-input" + id}>date</label>
          <input
            id={"sleep-date-input" + id}
            type="date"
            {...register("date_of_sleep")}
          />

          <label htmlFor={"sleep-quality-input-" + id}>Sleep Quality</label>
          <select
            id={"sleep-quality-input-update-" + id}
            {...register("quality")}
          >
            {["POOR", "DECENT", "GOOD"].map((sq) => (
              <option value={sq} key={sq + "-update-select-" + id}>
                {sq}
              </option>
            ))}
          </select>

          <label htmlFor={"sleep-amount-input-" + id}>sleep amount</label>
          <select id={"sleep-amount-input-" + id} {...register("amount")}>
            {["NONE", "FEW", "FULL", "EXTRA"].map((m) => (
              <option value={m} key={m + "-update-select-" + id}>
                {m}
              </option>
            ))}
          </select>

          <label htmlFor={"sleep-note-input" + id}>note</label>
          <input id={"sleep-note-input" + id} {...register("note")} />

          <input type="submit" value="Update" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

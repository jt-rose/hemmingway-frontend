import { useCreateSleepHabitMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const AddSleepHabit = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addSleepHabit.mutate(
      {
        input: data,
      },
      refetchDirective
    );

  const addSleepHabit = useCreateSleepHabitMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["SleepHabitsByDate"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="sleep-date-input">date</label>
        <input
          id="sleep-date-input"
          type="date"
          {...register("date_of_sleep")}
        />

        <label htmlFor="sleep-quality-input">Sleep Quality</label>
        <select id={"sleep-quality-input"} {...register("quality")}>
          {["GOOD", "DECENT", "POOR"].map((sq) => (
            <option value={sq} key={sq + "-update-select"}>
              {sq}
            </option>
          ))}
        </select>

        <label htmlFor={"sleep-amount-input"}>sleep amount</label>
        <select id={"sleep-amount-input"} {...register("amount")}>
          {["FULL", "FEW", "NONE", "EXTRA"].map((m) => (
            <option value={m} key={m + "-update-select"}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor={"sleep-note-input"}>note</label>
        <input id={"sleep-note-input"} {...register("note")} />

        <input type="submit" value="Add Sleep Habit" />
      </form>
    </div>
  );
};

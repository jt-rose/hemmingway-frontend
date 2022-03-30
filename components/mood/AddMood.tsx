import { useCreateMoodMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const AddMood = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addMood.mutate(
      {
        input: data,
      },
      refetchDirective
    );

  const addMood = useCreateMoodMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MoodByDate"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"meditated-input"}>meditated</label>
        <input
          id={"meditated-input"}
          type="checkbox"
          {...register("meditated")}
        />

        <label htmlFor={"mood-date-input"}>date</label>
        <input
          id={"mood-date-input"}
          type="date"
          {...register("date_of_mood")}
        />

        <label htmlFor={"mood-type-input"}>mood type</label>
        <select id="mood-type-input" {...register("mood_type")}>
          {[
            "HAPPY",
            "MOTIVATED",
            "SATISFIED",
            "RELAXED",
            "TIRED",
            "FRUSTRATED",
            "SAD",
            "ANXIOUS",
          ].map((m) => (
            <option value={m} key={m + "-update-select"}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor={"stress-level-input"}>stress level</label>
        <select id="stress-level-input" {...register("stress_level")}>
          {["LOW", "MODERATE", "HIGH"].map((m) => (
            <option value={m} key={m + "-update-select"}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor={"mood-note-input"}>note</label>
        <input id={"mood-note-input"} {...register("note")} />

        <input type="submit" value="Add Mood" />
      </form>
    </div>
  );
};

import { useUpdateMoodMutation } from "src/generated/graphql-hooks";
import { PropTypesWithMood } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateMood = (props: PropTypesWithMood) => {
  const { id, meditated, date_of_mood, mood_type, stress_level, note } =
    props.mood;
  const initialFormData = {
    meditated,
    note,
    date_of_mood,
    mood_type,
    stress_level,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateMood.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateMood = useUpdateMoodMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MoodByDate"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"meditated-input" + id}>meditated</label>
          <input
            id={"meditated-input" + id}
            type="checkbox"
            {...register("meditated")}
          />

          <label htmlFor={"mood-date-input" + id}>date</label>
          <input
            id={"mood-date-input" + id}
            type="date"
            {...register("date_of_mood")}
          />

          <label htmlFor={"mood-type-input-" + id}>mood type</label>
          <select
            id={"mood-type-input-update-" + id}
            {...register("mood_type")}
          >
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
              <option value={m} key={m + "-update-select-" + id}>
                {m}
              </option>
            ))}
          </select>

          <label htmlFor={"stress-level-input-" + id}>stress level</label>
          <select id="stress-level-input" {...register("stress_level")}>
            {["LOW", "MODERATE", "HIGH"].map((m) => (
              <option value={m} key={m + "-update-select-" + id}>
                {m}
              </option>
            ))}
          </select>

          <label htmlFor={"mood-note-input" + id}>note</label>
          <input id={"mood-note-input" + id} {...register("note")} />

          <input type="submit" value="Update" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

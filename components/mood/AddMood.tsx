import { useCreateMoodMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { Select } from "components/forms/Select";
import { Checkbox } from "components/forms/Checkbox";

export const AddMood = (props: PropTypesWithModal) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addMood.mutate(
      {
        input: { ...data, date_of_mood: props.date },
      },
      refetchDirective
    );

  const addMood = useCreateMoodMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      props.closeModal();
      queryClient.invalidateQueries(["MoodByDate"]);
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Add Mood"
        closeModal={props.closeModal}
      >
        {/* <label htmlFor={"meditated-input"}>meditated</label>
        <input
          id={"meditated-input"}
          type="checkbox"
          {...register("meditated")}
        /> */}

        <Checkbox
          id="meditated-input"
          placeholder=""
          label="meditated"
          checked={false}
          formConnect={register("meditated")}
        />

        {/* <label htmlFor={"mood-date-input"}>date</label>
        <input
          id={"mood-date-input"}
          type="date"
          {...register("date_of_mood")}
        /> */}
        {/* <Input
          id="mood-date-input"
          label="date"
          placeholder=""
          required={true}
          type="date"
          formConnect={register("date_of_mood")}
        /> */}

        {/* <label htmlFor={"mood-type-input"}>mood type</label>
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
        </select> */}

        <Select
          id="mood-type-input"
          selectOptions={[
            "HAPPY",
            "MOTIVATED",
            "SATISFIED",
            "RELAXED",
            "TIRED",
            "FRUSTRATED",
            "SAD",
            "ANXIOUS",
          ]}
          formConnect={register("mood_type")}
          label="Mood Type"
        />

        {/* <label htmlFor={"stress-level-input"}>stress level</label>
        <select id="stress-level-input" {...register("stress_level")}>
          {["LOW", "MODERATE", "HIGH"].map((m) => (
            <option value={m} key={m + "-update-select"}>
              {m}
            </option>
          ))}
        </select> */}

        <Select
          id="stress-level-input"
          selectOptions={["LOW", "MODERATE", "HIGH"]}
          formConnect={register("stress_level")}
          label="Stress Level"
        />

        {/* <label htmlFor={"mood-note-input"}>note</label>
        <input id={"mood-note-input"} {...register("note")} /> */}

        <Input
          id="mood-note-input"
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

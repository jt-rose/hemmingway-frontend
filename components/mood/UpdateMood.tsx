import { useUpdateMoodMutation } from "src/generated/graphql-hooks";
import { PropTypesWithMoodAndModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Select } from "components/forms/Select";
import { Input } from "components/forms/Input";
import { Checkbox } from "components/forms/Checkbox";

export const UpdateMood = (props: PropTypesWithMoodAndModal) => {
  const { id, meditated, date_of_mood, mood_type, stress_level, note } =
    props.mood;
  const initialFormData = {
    meditated,
    note,
    date_of_mood,
    mood_type,
    stress_level,
  };
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    props.closeModal();
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
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Update Mood"
        closeModal={props.closeModal}
      >
        <Checkbox
          id="meditated-input"
          placeholder=""
          label="meditated"
          checked={false}
          formConnect={register("meditated")}
        />

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

        <Select
          id="stress-level-input"
          selectOptions={["LOW", "MODERATE", "HIGH"]}
          formConnect={register("stress_level")}
          label="Stress Level"
        />

        <Input
          id="mood-note-input"
          label="Note"
          placeholder="some text..."
          required={false}
          type="text"
          formConnect={register("note")}
        />
      </Form>
    </div>
  );
};

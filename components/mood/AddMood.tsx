import { useCreateMoodMutation } from "src/generated/graphql-hooks";
import { PropTypesWithModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { Select } from "components/forms/Select";
//import { Checkbox } from "components/forms/Checkbox";

export const AddMood = (props: PropTypesWithModal) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addMood.mutate(
      {
        input: { ...data, date_of_mood: props.date, meditated: false },
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
        {/* <Checkbox
          id="meditated-input"
          placeholder=""
          label="meditated"
          checked={false}
          formConnect={register("meditated")}
        /> */}

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
          label="Summary"
          placeholder="some text..."
          required={false}
          type="text"
          formConnect={register("note")}
        />
      </Form>
    </div>
  );
};

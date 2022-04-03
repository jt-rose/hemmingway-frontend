import {
  useSetWeightGoalMutation,
  useCurrentWeightGoalQuery,
  useUpdateWeightGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { useRouter } from "next/router";
import { Select } from "components/forms/Select";

export const SetWeightGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const currentWeightGoal = useCurrentWeightGoalQuery(props.gqlClient);
  const setWeightGoal = useSetWeightGoalMutation(props.gqlClient);
  const updateWeightGoal = useUpdateWeightGoalMutation(props.gqlClient);

  const weightAlreadyRecordedForToday =
    currentWeightGoal.data?.currentWeightGoal?.goal_start_date &&
    currentWeightGoal.data.currentWeightGoal?.goal_start_date >= props.date
      ? currentWeightGoal.data.currentWeightGoal.id
      : null;

  const onSubmit = (data: any) => {
    if (weightAlreadyRecordedForToday) {
      updateWeightGoal.mutate(
        {
          id: weightAlreadyRecordedForToday,
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    } else {
      setWeightGoal.mutate(
        {
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    }
  };

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightGoals"]);
      router.push("/");
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Set Weight Goal"
      >
        <Input
          id="goal-weight-input"
          label="Weight Goal"
          placeholder="weight goal"
          required={true}
          type="number"
          formConnect={register("goal_in_lbs", {
            valueAsNumber: true,
          })}
        />
        <Select
          id="weight-goal-pace-input"
          label="Goal Pace"
          selectOptions={["STRONG", "MODERATE", "LIGHT"]}
          formConnect={register("goal_pace")}
        />

        <Input
          id="goal-weight-note-input"
          label="Note"
          placeholder="..."
          required={false}
          type="text"
          formConnect={register("note")}
        />
      </Form>
    </div>
  );
};

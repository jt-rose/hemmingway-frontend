import {
  useSetDailyStepsGoalMutation,
  useUpdateDailyStepsGoalMutation,
  useCurrentStepsGoalQuery,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { useRouter } from "next/router";

export const SetStepsGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // check for current day's weight and either create or update
  const currentStepsGoal = useCurrentStepsGoalQuery(props.gqlClient);
  const setStepsGoal = useSetDailyStepsGoalMutation(props.gqlClient);
  const updateStepsGoal = useUpdateDailyStepsGoalMutation(props.gqlClient);

  const weightAlreadyRecordedForToday =
    currentStepsGoal.data?.currentStepsGoal?.goal_start_date &&
    currentStepsGoal.data.currentStepsGoal?.goal_start_date >= props.date
      ? currentStepsGoal.data.currentStepsGoal.id
      : null;

  const onSubmit = (data: any) => {
    if (weightAlreadyRecordedForToday) {
      updateStepsGoal.mutate(
        {
          id: weightAlreadyRecordedForToday,
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    } else {
      setStepsGoal.mutate(
        {
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    }
  };

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyStepsGoals"]);
      router.push("/");
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Set Daily Steps Goal"
      >
        <Input
          id="daily-steps-input"
          label="Daily Steps"
          placeholder="daily steps"
          required={true}
          type="number"
          formConnect={register("daily_goal_in_steps", {
            valueAsNumber: true,
          })}
        />

        <Input
          id="steps-goal-note-input"
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

import {
  useCurrentDistanceGoalQuery,
  useSetDailyDistanceGoalMutation,
  useUpdateDailyDistanceGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypes, PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { useRouter } from "next/router";

export const SetDistanceGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const currentDistanceGoal = useCurrentDistanceGoalQuery(props.gqlClient);
  const setDistanceGoal = useSetDailyDistanceGoalMutation(props.gqlClient);
  const updateDistanceGoal = useUpdateDailyDistanceGoalMutation(
    props.gqlClient
  );

  const weightAlreadyRecordedForToday =
    currentDistanceGoal.data?.currentDistanceGoal?.goal_start_date &&
    currentDistanceGoal.data.currentDistanceGoal?.goal_start_date >= props.date
      ? currentDistanceGoal.data.currentDistanceGoal.id
      : null;

  const onSubmit = (data: any) => {
    if (weightAlreadyRecordedForToday) {
      updateDistanceGoal.mutate(
        {
          id: weightAlreadyRecordedForToday,
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    } else {
      setDistanceGoal.mutate(
        {
          input: { ...data, goal_start_date: props.date, active: true },
        },
        refetchDirective
      );
    }
  };

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyDistanceGoals"]);
      router.push("/home");
    },
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Set Daily Miles Goal"
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <label htmlFor="daily-miles-input-">daily goal in miles</label>
        <input
          id="daily-miles-input-"
          type="number"
          {...register("daily_goal_in_miles", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="daily-miles-input"
          label="Daily Miles"
          placeholder="daily miles"
          required={true}
          type="number"
          formConnect={register("daily_goal_in_miles", {
            valueAsNumber: true,
          })}
        />

        {/* <label htmlFor="goal-start-date-input">date</label>
        <input
          id="goal-start-date-input"
          type="date"
          {...register("goal_start_date")}
        /> */}

        {/* <label htmlFor={"daily-goal-active-input"}>active</label>
        <input
          id={"daily-goal-active-input"}
          type="checkbox"
          {...register("active")}
        /> */}

        {/* <label htmlFor="meal-name-input-">note</label>
        <input id="distance-goal-note-input-" {...register("note")} />

        <input type="submit" value="Update Distance Goal" /> */}
        <Input
          id="distance-goal-note-input"
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

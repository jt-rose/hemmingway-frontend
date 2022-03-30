import { useSetDailyDistanceGoalMutation } from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const SetDistanceGoal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setDistanceGoal.mutate(
      {
        input: data,
      },
      refetchDirective
    );
  };

  const setDistanceGoal = useSetDailyDistanceGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyDistanceGoals"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="daily-miles-input-">daily goal in miles</label>
        <input
          id="daily-miles-input-"
          type="number"
          {...register("daily_goal_in_miles", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="goal-start-date-input">date</label>
        <input
          id="goal-start-date-input"
          type="date"
          {...register("goal_start_date")}
        />

        <label htmlFor={"daily-goal-active-input"}>active</label>
        <input
          id={"daily-goal-active-input"}
          type="checkbox"
          {...register("active")}
        />

        <label htmlFor="meal-name-input-">note</label>
        <input id="distance-goal-note-input-" {...register("note")} />

        <input type="submit" value="Update Distance Goal" />
      </form>
    </div>
  );
};

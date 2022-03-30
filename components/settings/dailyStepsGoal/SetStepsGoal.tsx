import { useSetDailyStepsGoalMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const SetStepsGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setStepsGoal.mutate(
      {
        input: data,
      },
      refetchDirective
    );
  };

  const setStepsGoal = useSetDailyStepsGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyStepsGoals"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"daily-steps-input"}>daily goal in steps</label>
        <input
          id={"daily-steps-input"}
          type="number"
          {...register("daily_goal_in_steps", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="steps-goal-start-date-input">date</label>
        <input
          id="steps-goal-start-date-input"
          type="date"
          {...register("goal_start_date")}
        />

        <label htmlFor={"daily-steps-goal-active-input"}>active</label>
        <input
          id={"daily-steps-goal-active-input"}
          type="checkbox"
          {...register("active")}
        />

        <label htmlFor={"steps-goal-note-input"}>note</label>
        <input id={"steps-goal-note-input"} {...register("note")} />

        <input type="submit" value="Add Steps Goal" />
      </form>
    </div>
  );
};

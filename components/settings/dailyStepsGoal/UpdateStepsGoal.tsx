import { useUpdateDailyStepsGoalMutation } from "src/generated/graphql-hooks";
import { PropTypesWithStepsGoal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateStepsGoal = (props: PropTypesWithStepsGoal) => {
  const { id, goal_start_date, daily_goal_in_steps, active, note } =
    props.stepsGoal;
  const initialFormData = {
    goal_start_date,
    daily_goal_in_steps,
    active,
    note,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateStepsGoal.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateStepsGoal = useUpdateDailyStepsGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyStepsGoals"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"daily-steps-input-" + id}>daily goal in steps</label>
          <input
            id={"daily-steps-input-" + id}
            type="number"
            {...register("daily_goal_in_steps", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor="goal-start-date-input">date</label>
          <input
            id="goal-start-date-input"
            type="date"
            {...register("goal_start_date")}
          />

          <label htmlFor={"daily-goal-active-input" + id}>active</label>
          <input
            id={"daily-goal-active-input" + id}
            type="checkbox"
            {...register("active")}
          />

          <label htmlFor={"meal-name-input-" + id}>note</label>
          <input id={"distance-goal-note-input-" + id} {...register("note")} />

          <input type="submit" value="Update Steps Goal" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

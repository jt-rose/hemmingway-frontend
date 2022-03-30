import { useUpdateDailyDistanceGoalMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate, PropTypesWithDistanceGoal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateDistanceGoal = (props: PropTypesWithDistanceGoal) => {
  const { id, goal_start_date, daily_goal_in_miles, active, note } =
    props.distanceGoal;
  const initialFormData = {
    goal_start_date,
    daily_goal_in_miles,
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
    updateDistanceGoal.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateDistanceGoal = useUpdateDailyDistanceGoalMutation(
    props.gqlClient
  );

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyDistanceGoals"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"daily-miles-input-" + id}>daily goal in miles</label>
          <input
            id={"daily-miles-input-" + id}
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

          <label htmlFor={"daily-goal-active-input" + id}>active</label>
          <input
            id={"daily-goal-active-input" + id}
            type="checkbox"
            {...register("active")}
          />

          <label htmlFor={"meal-name-input-" + id}>note</label>
          <input id={"distance-goal-note-input-" + id} {...register("note")} />

          <input type="submit" value="Update Distance Goal" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

import { useUpdateWeightGoalMutation } from "src/generated/graphql-hooks";
import { PropTypesWithWeightGoal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateWeightGoal = (props: PropTypesWithWeightGoal) => {
  const { id, goal_in_lbs, goal_start_date, note } = props.weightGoal;
  const initialFormData = {
    goal_in_lbs,
    goal_start_date,
    note,
    active: true,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateWeightGoal.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateWeightGoal = useUpdateWeightGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightGoals"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"goal-in-lbs-input-" + id}>goal in lbs</label>
          <input
            id={"goal-in-lbs-input-" + id}
            type="number"
            {...register("goal_in_lbs", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor="goal-date-input">start date</label>
          <input
            id="goal-date-input"
            type="date"
            {...register("goal_start_date")}
          />

          <label htmlFor={"goal-note-input-" + id}>note</label>
          <input id={"goal-note-input-" + id} {...register("note")} />

          <input type="submit" value="Update Weight Goal" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

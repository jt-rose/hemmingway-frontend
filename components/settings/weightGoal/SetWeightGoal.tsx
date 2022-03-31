import { useSetWeightGoalMutation } from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const SetWeightGoal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setWeightGoal.mutate(
      {
        input: data,
      },
      refetchDirective
    );
  };

  const setWeightGoal = useSetWeightGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightGoals"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"goal-in-lbs-input"}>goal in lbs</label>
        <input
          id={"goal-in-lbs-input"}
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

        <label htmlFor={"weight-goal-pace-input"}>goal pace</label>
        <select id="weight-goal-pace-input" {...register("goal_pace")}>
          {["STRONG", "MODERATE", "LIGHT"].map((gp) => (
            <option value={gp} key={gp + "goal-pace-select"}>
              {gp}
            </option>
          ))}
        </select>

        <label htmlFor={"goal-note-input"}>note</label>
        <input id={"goal-note-input"} {...register("note")} />

        <input {...register("active")} hidden type="checkbox" checked />

        <input type="submit" value="Update Weight Goal" />
      </form>
    </div>
  );
};

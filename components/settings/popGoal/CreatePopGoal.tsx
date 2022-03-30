import { useCreatePopGoalMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const CreatePopGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    createPopGoal.mutate(
      {
        input: data,
      },
      refetchDirective
    );
  };

  const createPopGoal = useCreatePopGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["PopGoalsByDate"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"pop-goal-amount-input"}>amount of pop goal</label>
        <input
          id={"pop-goal-amount-input"}
          type="number"
          {...register("goal_amount", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor={"pop-goal-type-input"}>pop goal type</label>
        <select id="pop-goal-type-input" {...register("goal_type")}>
          {["STEPS", "DISTANCE", "CALORIES"].map((pg) => (
            <option value={pg} key={pg + "pop-goal-select"}>
              {pg}
            </option>
          ))}
        </select>

        <label htmlFor="pop-goal-date-input">date</label>
        <input
          id="pop-goal-date-input"
          type="date"
          {...register("date_of_goal")}
        />

        <input type="submit" value="Add Pop Goal" />
      </form>
    </div>
  );
};

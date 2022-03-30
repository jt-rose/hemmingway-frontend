import {
  useWeightGoalsQuery,
  useDeleteWeightGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { SetWeightGoal } from "./SetWeightGoal";
import { UpdateWeightGoal } from "./UpdateWeightGoal";

export const WeightGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useWeightGoalsQuery(props.gqlClient);

  const deleteWeightGoal = useDeleteWeightGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightGoals"]);
    },
  };
  return (
    <div>
      <h3>Weight Goal</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.weight_goals.map((weight) => (
        <div key={"weight-goal-" + weight.id}>
          <h3
            onClick={() =>
              deleteWeightGoal.mutate({ id: weight.id }, refetchDirective)
            }
          >
            {"Weight Goal: " +
              weight.goal_in_lbs +
              " lbs aiming for since " +
              weight.goal_start_date}
          </h3>
          <UpdateWeightGoal gqlClient={props.gqlClient} weightGoal={weight} />
        </div>
      ))}
      <SetWeightGoal gqlClient={props.gqlClient} />
    </div>
  );
};

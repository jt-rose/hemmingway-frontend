import {
  useDailyStepsGoalsQuery,
  useDeleteDailyStepsGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { SetStepsGoal } from "./SetStepsGoal";
import { UpdateStepsGoal } from "./UpdateStepsGoal";

export const DailyStepsGoals = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useDailyStepsGoalsQuery(props.gqlClient);

  const deleteStepsGoal = useDeleteDailyStepsGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyStepsGoals"]);
    },
  };
  return (
    <div>
      <h3>Steps Goals</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.daily_steps_goals.map((ds) => (
        <div key={"steps-goal-" + ds.id}>
          <h3
            onClick={() =>
              deleteStepsGoal.mutate({ id: ds.id }, refetchDirective)
            }
          >
            {"Steps Goal: " +
              ds.daily_goal_in_steps +
              " steps daily starting on " +
              ds.goal_start_date}
          </h3>
          <UpdateStepsGoal gqlClient={props.gqlClient} stepsGoal={ds} />
        </div>
      ))}
      <SetStepsGoal gqlClient={props.gqlClient} date={props.date} />
    </div>
  );
};

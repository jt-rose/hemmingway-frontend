import {
  useDailyDistanceGoalsQuery,
  useDeleteDailyDistanceGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { SetDistanceGoal } from "./SetDistanceGoal";
import { UpdateDistanceGoal } from "./UpdateDistanceGoal";

export const DailyDistanceGoals = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useDailyDistanceGoalsQuery(
    props.gqlClient
  );

  const deleteDistanceGoal = useDeleteDailyDistanceGoalMutation(
    props.gqlClient
  );

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["DailyDistanceGoals"]);
    },
  };
  return (
    <div>
      <h3>DIstance Goals</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.daily_distance_goals.map((dg) => (
        <div key={"distance-goal-" + dg.id}>
          <h3
            onClick={() =>
              deleteDistanceGoal.mutate({ id: dg.id }, refetchDirective)
            }
          >
            {"Distance Goal: " +
              dg.daily_goal_in_miles +
              " miles daily starting on " +
              dg.goal_start_date}
          </h3>
          <UpdateDistanceGoal gqlClient={props.gqlClient} distanceGoal={dg} />
        </div>
      ))}
      <SetDistanceGoal gqlClient={props.gqlClient} date={props.date} />
    </div>
  );
};

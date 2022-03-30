import {
  usePopGoalsByDateQuery,
  useDeletePopGoalMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { CreatePopGoal } from "./CreatePopGoal";

export const PopGoal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = usePopGoalsByDateQuery(props.gqlClient, {
    date: props.date,
  });

  const deletePopGoal = useDeletePopGoalMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["PopGoalsByDate"]);
    },
  };
  return (
    <div>
      <h3>Pop Goal</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.popGoalsByDate.map((goal) => (
        <div key={"pop-goal-" + goal.id}>
          <h3
            onClick={() =>
              deletePopGoal.mutate({ id: goal.id }, refetchDirective)
            }
          >
            {"Pop Goal: " +
              goal.goal_amount +
              " " +
              goal.goal_type +
              " on " +
              goal.date_of_goal}
          </h3>
        </div>
      ))}
      <CreatePopGoal gqlClient={props.gqlClient} date={props.date} />
    </div>
  );
};

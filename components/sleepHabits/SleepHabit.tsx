import {
  useSleepHabitsByDateQuery,
  useDeleteSleepHabitMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { AddSleepHabit } from "./AddSleepHabit";
import { UpdateSleepHabit } from "./UpdateSleepHabit";

export const SleepHabit = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSleepHabitsByDateQuery(
    props.gqlClient,
    {
      date_of_sleep: props.date,
    }
  );

  const deleteSleepHabit = useDeleteSleepHabitMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["SleepHabitsByDate"]);
    },
  };
  return (
    <div>
      <h3>Moods</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.sleepHabitsByDate.map((sh) => (
        <div key={"sleep-habit-" + sh.id}>
          <h3
            onClick={() =>
              deleteSleepHabit.mutate({ id: sh.id }, refetchDirective)
            }
          >
            {"Sleep: " +
              sh.quality +
              " and " +
              sh.amount +
              " on " +
              sh.date_of_sleep}
          </h3>
          <UpdateSleepHabit gqlClient={props.gqlClient} sleepHabit={sh} />
        </div>
      ))}
      <AddSleepHabit gqlClient={props.gqlClient} date={props.date} />
    </div>
  );
};

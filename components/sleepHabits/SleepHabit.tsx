import {
  useSleepHabitsByDateQuery,
  useDeleteSleepHabitMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { UpdateSleepHabit } from "./UpdateSleepHabit";
import { ModalForm } from "components/forms/ModalForm";

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
      {/* <AddSleepHabit gqlClient={props.gqlClient} date={props.date} /> */}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="SLEEPHABIT"
        addOrUpdate="ADD"
      />
    </div>
  );
};

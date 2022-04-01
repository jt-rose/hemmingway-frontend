import {
  useSleepHabitsByDateQuery,
  useDeleteSleepHabitMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { ModalForm } from "components/forms/ModalForm";
import { SleepHabitCard } from "./SleepHabitCard";

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
        <SleepHabitCard sleepHabit={sh} gqlClient={props.gqlClient} />
      ))}
      {/* <AddSleepHabit gqlClient={props.gqlClient} date={props.date} /> */}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="SLEEPHABIT"
        addOrUpdate="ADD"
        date={props.date}
      />
    </div>
  );
};

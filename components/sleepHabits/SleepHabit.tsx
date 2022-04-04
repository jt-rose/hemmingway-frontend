import { useSleepHabitsByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { ModalForm } from "components/forms/ModalForm";
import { SleepHabitCard } from "./SleepHabitCard";

export const SleepHabit = (props: PropTypesWithDate) => {
  const { data } = useSleepHabitsByDateQuery(props.gqlClient, {
    date_of_sleep: props.date,
  });

  return (
    <div className="flex flex-col items-center">
      <h3>Sleep</h3>
      {data?.sleepHabitsByDate.map((sh) => (
        <SleepHabitCard sleepHabit={sh} gqlClient={props.gqlClient} />
      ))}
      {(!data || !data.sleepHabitsByDate.length) && (
        <ModalForm
          gqlClient={props.gqlClient}
          formType="SLEEPHABIT"
          addOrUpdate="ADD"
          date={props.date}
        />
      )}
    </div>
  );
};

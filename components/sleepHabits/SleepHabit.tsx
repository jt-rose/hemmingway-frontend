import { useSleepHabitsByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { ModalForm } from "components/forms/ModalForm";
import { SleepHabitCard } from "./SleepHabitCard";

export const SleepHabit = (props: PropTypesWithDate) => {
  const { data } = useSleepHabitsByDateQuery(props.gqlClient, {
    date_of_sleep: props.date,
  });

  return (
    <div className="flex flex-col items-center mb-12">
      <h3 className="text-3xl">Sleep</h3>
      {data?.sleepHabitsByDate.map((sh) => (
        <SleepHabitCard
          sleepHabit={sh}
          gqlClient={props.gqlClient}
          key={sh.id + "-sleep-card"}
        />
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

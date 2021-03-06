import { useMoodByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { ModalForm } from "components/forms/ModalForm";
import { MoodCard } from "./MoodCard";

export const Mood = (props: PropTypesWithDate) => {
  const { data } = useMoodByDateQuery(props.gqlClient, {
    date_of_mood: props.date,
  });

  return (
    <div className="flex flex-col items-center mb-12">
      <h3 className="text-3xl">Moods</h3>
      {data?.moodByDate.map((mood) => (
        <MoodCard
          gqlClient={props.gqlClient}
          mood={mood}
          key={"mood-" + mood.id}
        />
      ))}
      {(!data || !data.moodByDate.length) && (
        <ModalForm
          gqlClient={props.gqlClient}
          formType="MOOD"
          addOrUpdate="ADD"
          date={props.date}
        />
      )}
    </div>
  );
};

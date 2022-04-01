import {
  useMoodByDateQuery,
  useDeleteMoodMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { ModalForm } from "components/forms/ModalForm";
import { MoodCard } from "./MoodCard";

export const Mood = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useMoodByDateQuery(props.gqlClient, {
    date_of_mood: props.date,
  });

  const deleteMood = useDeleteMoodMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MoodByDate"]);
    },
  };
  return (
    <div>
      <h3>Moods</h3>
      {data?.moodByDate.map((mood) => (
        <MoodCard
          gqlClient={props.gqlClient}
          mood={mood}
          key={"mood-" + mood.id}
        />
      ))}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="MOOD"
        addOrUpdate="ADD"
        date={props.date}
      />
    </div>
  );
};

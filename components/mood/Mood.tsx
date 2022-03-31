import {
  useMoodByDateQuery,
  useDeleteMoodMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { UpdateMood } from "./UpdateMood";
import { ModalForm } from "components/forms/ModalForm";

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
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.moodByDate.map((mood) => (
        <div key={"mood-" + mood.id}>
          <h3
            onClick={() => deleteMood.mutate({ id: mood.id }, refetchDirective)}
          >
            {"Stress: " + mood.stress_level + " on " + mood.date_of_mood}
          </h3>
          <UpdateMood gqlClient={props.gqlClient} mood={mood} />
        </div>
      ))}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="MOOD"
        addOrUpdate="ADD"
      />
    </div>
  );
};

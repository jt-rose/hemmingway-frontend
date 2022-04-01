import { SimpleMood } from "../../types/propTypes";
import { TrashIcon } from "@heroicons/react/outline";
import { GraphQLClient } from "graphql-request";
import { useDeleteMoodMutation } from "src/generated/graphql-hooks";
import { useQueryClient } from "react-query";
import { UpdateMoodModal } from "components/forms/UpdateMoodModal";

export const MoodCard = (props: {
  gqlClient: GraphQLClient;
  mood: SimpleMood;
}) => {
  const queryClient = useQueryClient();
  const deleteMood = useDeleteMoodMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MoodByDate"]);
    },
  };

  const handleDelete = () => {
    deleteMood.mutate({ id: props.mood.id }, refetchDirective);
  };

  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="/docs/images/blog/image-4.jpg"
        alt=""
      />
      <div className="flex flex-col grow justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Note: {props.mood.note}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Meditated: {props.mood.meditated} | Mood: {props.mood.mood_type} |{" "}
          Stress: {props.mood.stress_level} | {props.mood.date_of_mood}
        </p>
      </div>
      <div className="mr-8">
        <UpdateMoodModal gqlClient={props.gqlClient} mood={props.mood} />
        <TrashIcon
          className="ht-8 w-6 hover:bg-red-500 rounded-lg"
          onClick={handleDelete}
        />
      </div>
    </a>
  );
};

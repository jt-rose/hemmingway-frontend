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
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg  shadow-md w-10/12 max-w-xl sm:h-28 md:max-w-2xl lg:max-w-3xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-4">
      <img
        className="object-cover h-28 sm:h-full w-full rounded-t-lg sm:w-48 sm:rounded-none sm:rounded-l-lg"
        src="/mood-1.jpg"
        alt=""
      />
      <div className="flex grow w-full">
        <div className="flex grow flex-col w-full justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.mood.note && props.mood.note.length
              ? props.mood.note
              : props.mood.mood_type
                  .toLowerCase()
                  .replace(/^./, props.mood.mood_type[0])}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Mood: {props.mood.mood_type} | Stress: {props.mood.stress_level}
          </p>
        </div>
        <div className="m-8">
          <UpdateMoodModal gqlClient={props.gqlClient} mood={props.mood} />
          <TrashIcon
            className="ht-8 w-6 hover:bg-red-500 rounded-lg hover:cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

import { SimpleSleepHabit } from "../../types/propTypes";
import { TrashIcon } from "@heroicons/react/outline";
import { GraphQLClient } from "graphql-request";
import { useDeleteSleepHabitMutation } from "src/generated/graphql-hooks";
import { useQueryClient } from "react-query";
import { UpdateSleepHabitModal } from "../forms/UpdateSleepHabitModal";

export const SleepHabitCard = (props: {
  gqlClient: GraphQLClient;
  sleepHabit: SimpleSleepHabit;
}) => {
  const queryClient = useQueryClient();
  const deleteSleepHabit = useDeleteSleepHabitMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["SleepHabitsByDate"]);
    },
  };

  const handleDelete = () => {
    deleteSleepHabit.mutate({ id: props.sleepHabit.id }, refetchDirective);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg  shadow-md w-10/12 max-w-xl sm:h-28 md:max-w-2xl lg:max-w-3xl hover:bg-gray-100  m-4">
      <img
        className="object-cover h-28 sm:h-full w-full rounded-t-lg sm:w-48 sm:rounded-none sm:rounded-l-lg"
        src="/sleep-1.jpg"
        alt=""
      />
      <div className="flex grow w-full">
        <div className="flex grow flex-col w-full justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Last Night's Rest
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            Amount: {props.sleepHabit.amount} | Quality:{" "}
            {props.sleepHabit.quality}
          </p>
        </div>
        <div className="m-8">
          <UpdateSleepHabitModal
            gqlClient={props.gqlClient}
            sleepHabit={props.sleepHabit}
          />
          <TrashIcon
            className="ht-8 w-6 hover:bg-red-500 rounded-lg hover:cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

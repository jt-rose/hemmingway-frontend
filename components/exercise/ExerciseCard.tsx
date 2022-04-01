import { SimpleExercise } from "../../types/propTypes";
import { TrashIcon } from "@heroicons/react/outline";
import { GraphQLClient } from "graphql-request";
import { useDeleteExerciseMutation } from "src/generated/graphql-hooks";
import { useQueryClient } from "react-query";
import { UpdateExerciseModal } from "components/forms/UpdateExerciseModal";

export const ExerciseCard = (props: {
  gqlClient: GraphQLClient;
  exercise: SimpleExercise;
}) => {
  const queryClient = useQueryClient();
  const deleteExercise = useDeleteExerciseMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };

  const handleDelete = () => {
    deleteExercise.mutate({ id: props.exercise.id }, refetchDirective);
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
          {props.exercise.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.exercise.calories} | Minutes: {props.exercise.minutes} | Miles:{" "}
          {props.exercise.distance_in_miles} | Steps: {props.exercise.steps} |{" "}
          {props.exercise.date_of_exercise}
        </p>
      </div>
      <div className="mr-8">
        <UpdateExerciseModal
          gqlClient={props.gqlClient}
          exercise={props.exercise}
        />
        <TrashIcon
          className="ht-8 w-6 hover:bg-red-500 rounded-lg"
          onClick={handleDelete}
        />
      </div>
    </a>
  );
};

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

  const randomPhoto = `/exercise-${(Number(props.exercise.id) % 6) + 1}.jpg`;

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["ExercisesByDate"]);
    },
  };

  const handleDelete = () => {
    deleteExercise.mutate({ id: props.exercise.id }, refetchDirective);
  };

  return (
    <div className="flex flex-col justify-center sm:flex-row items-center bg-white rounded-lg  shadow-md w-10/12 max-w-xl sm:h-28 md:max-w-2xl lg:max-w-3xl hover:bg-gray-100    m-4">
      <img
        className="object-cover h-28 sm:h-full w-full rounded-t-lg sm:w-48 sm:rounded-none sm:rounded-l-lg"
        src={randomPhoto}
        alt=""
      />
      <div className="flex grow w-full">
        <div className="flex grow flex-col w-full justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            {props.exercise.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 ">
            {props.exercise.calories} Calories | {props.exercise.minutes}{" "}
            Minutes
            {props.exercise.distance_in_miles
              ? ` | ${props.exercise.distance_in_miles} Miles`
              : ""}
            {props.exercise.steps ? ` | ${props.exercise.steps} Steps` : ""}
          </p>
        </div>
        <div className="m-8">
          <UpdateExerciseModal
            gqlClient={props.gqlClient}
            exercise={props.exercise}
          />
          <TrashIcon
            className="ht-8 w-6 hover:bg-red-500 hover:cursor-pointer rounded-lg"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

import { SimpleMeal } from "../../types/propTypes";
import { TrashIcon } from "@heroicons/react/outline";
import { GraphQLClient } from "graphql-request";
import { useDeleteMealMutation } from "src/generated/graphql-hooks";
import { useQueryClient } from "react-query";
import { UpdateMealModal } from "components/forms/UpdateMealModal";

export const MealCard = (props: {
  gqlClient: GraphQLClient;
  meal: SimpleMeal;
}) => {
  const queryClient = useQueryClient();
  const deleteMeal = useDeleteMealMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MealsByDate"]);
    },
  };

  const handleDelete = () => {
    deleteMeal.mutate({ id: props.meal.id }, refetchDirective);
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
          {props.meal.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props.meal.calories} | {props.meal.category} |{" "}
          {props.meal.date_of_meal}
        </p>
      </div>
      <div className="mr-8">
        <UpdateMealModal gqlClient={props.gqlClient} meal={props.meal} />
        <TrashIcon
          className="ht-8 w-6 hover:bg-red-500 rounded-lg"
          onClick={handleDelete}
        />
      </div>
    </a>
  );
};

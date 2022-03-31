import {
  useMealsByDateQuery,
  useDeleteMealMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { UpdateMeal } from "./UpdateMeal";
// import { MealModalForm } from "components/forms/MealModalForm";
import { ModalForm } from "components/forms/ModalForm";

export const Meals = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useMealsByDateQuery(props.gqlClient, {
    date_of_meal: props.date,
  });

  const deleteMeal = useDeleteMealMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MealsByDate"]);
    },
  };
  return (
    <div>
      <h3>Meals</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.mealsByDate.map((meal) => (
        <div key={"meal-" + meal.id}>
          <h3
            onClick={() => deleteMeal.mutate({ id: meal.id }, refetchDirective)}
          >
            {meal.name}
          </h3>
          <UpdateMeal gqlClient={props.gqlClient} meal={meal} />
        </div>
      ))}
      {/* <AddMeal gqlClient={props.gqlClient} /> */}
      <ModalForm
        gqlClient={props.gqlClient}
        formType="MEAL"
        addOrUpdate="ADD"
      />
    </div>
  );
};

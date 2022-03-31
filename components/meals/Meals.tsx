import {
  useMealsByDateQuery,
  useDeleteMealMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { UpdateMeal } from "./UpdateMeal";
// import { MealModalForm } from "components/forms/MealModalForm";
import { ModalForm } from "components/forms/ModalForm";
import { MealCard } from "components/meals/MealCard";

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
      {data?.mealsByDate.map((meal) => (
        <MealCard meal={meal} gqlClient={props.gqlClient} />
        // <div key={"meal-" + meal.id}>
        //   <h3
        //     onClick={() => deleteMeal.mutate({ id: meal.id }, refetchDirective)}
        //   >
        //     {meal.name}
        //   </h3>
        //   <UpdateMeal gqlClient={props.gqlClient} meal={meal} />
        // </div>
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

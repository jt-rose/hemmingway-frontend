import { useMealsByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
// import { MealModalForm } from "components/forms/MealModalForm";
import { ModalForm } from "components/forms/ModalForm";
import { MealCard } from "components/meals/MealCard";

export const Meals = (props: PropTypesWithDate) => {
  const { data } = useMealsByDateQuery(props.gqlClient, {
    date_of_meal: props.date,
  });

  return (
    <div className="flex flex-col items-center mb-12">
      <h3 className="text-3xl">Meals</h3>
      {data?.mealsByDate.map((meal) => (
        <MealCard
          meal={meal}
          gqlClient={props.gqlClient}
          key={"meal-card-" + meal.id}
        />
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
        date={props.date}
      />
    </div>
  );
};

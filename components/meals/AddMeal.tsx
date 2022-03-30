import { useCreateMealMutation } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const AddMeal = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) =>
    addMeal.mutate(
      {
        input: data,
      },
      refetchDirective
    );

  const addMeal = useCreateMealMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MealsByDate"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="meal-calories-input">calories</label>
        <input
          id="meal-calories-input"
          type="number"
          {...register("calories", {
            valueAsNumber: true,
          })}
        />

        <label htmlFor="meal-date-input">date</label>
        <input id="meal-date-input" type="date" {...register("date_of_meal")} />

        <label htmlFor="meal-category-input">category</label>
        <select id="meal-category-input" {...register("category")}>
          {["BREAKFAST", "LUNCH", "DINNER", "SNACK"].map((m) => (
            <option value={m} key={m + "select"}>
              {m}
            </option>
          ))}
        </select>

        <label htmlFor="meal-name-input">name</label>
        <input id="meal-name-input" {...register("name")} />

        <input type="submit" value="Add Meal" />
      </form>
    </div>
  );
};

import { useUpdateMealMutation } from "src/generated/graphql-hooks";
import { PropTypesWithMeal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateMeal = (props: PropTypesWithMeal) => {
  const { id, name, date_of_meal, category, calories } = props.meal;
  const initialFormData = {
    name,
    date_of_meal,
    category,
    calories,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateMeal.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateMeal = useUpdateMealMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["MealsByDate"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"meal-calories-input" + id}>calories</label>
          <input
            id={"meal-calories-input" + id}
            type="number"
            {...register("calories", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor={"meal-date-input" + id}>date</label>
          <input
            id={"meal-date-input" + id}
            type="date"
            {...register("date_of_meal")}
          />

          <label htmlFor={"meal-category-input-" + id}>category</label>
          <select id="meal-category-input" {...register("category")}>
            {["BREAKFAST", "LUNCH", "DINNER", "SNACK"].map((m) => (
              <option value={m} key={m + "-update-select-" + id}>
                {m}
              </option>
            ))}
          </select>

          <label htmlFor={"meal-name-input" + id}>name</label>
          <input id={"meal-name-input" + id} {...register("name")} />

          <input type="submit" value="Update" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

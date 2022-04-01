import { useUpdateMealMutation } from "src/generated/graphql-hooks";
import { PropTypesWithMeal, PropTypesWithMealAndModal } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Select } from "components/forms/Select";
import { Input } from "components/forms/Input";

export const UpdateMeal = (props: PropTypesWithMealAndModal) => {
  const { id, name, date_of_meal, category, calories } = props.meal;
  const initialFormData = {
    name,
    date_of_meal,
    category,
    calories,
  };
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    props.closeModal();
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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      </form> */}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Update Meal"
        //closeModal={props.closeModal}
      >
        <Input
          id="meal-calories-input"
          type="number"
          placeholder="...add calories"
          label="Calories"
          required
          formConnect={register("calories", {
            valueAsNumber: true,
          })}
        />
        <Select
          id="meal-category-input"
          selectOptions={["BREAKFAST", "LUNCH", "DINNER", "SNACK"]}
          formConnect={register("category")}
          label="Type of Meal"
        />

        <Input
          id="meal-name-input"
          label="Meal Name"
          placeholder="some text..."
          required={true}
          type="text"
          formConnect={register("name")}
        />
      </Form>
    </div>
  );
};

import { useUpdateMealMutation } from "src/generated/graphql-hooks";
import { PropTypesWithMealAndModal } from "types/propTypes";
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
      <Form onSubmit={handleSubmit(onSubmit)} submitButtonName="Update Meal">
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
          placeholder="name of meal..."
          required={true}
          type="text"
          formConnect={register("name")}
        />
      </Form>
    </div>
  );
};

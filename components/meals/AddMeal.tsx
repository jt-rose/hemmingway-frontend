import { useCreateMealMutation } from "src/generated/graphql-hooks";
import {
  PropTypes,
  PropTypesWithDate,
  PropTypesWithModal,
} from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Input } from "components/forms/Input";
import { Select } from "components/forms/Select";
import { Form } from "components/forms/Form";

export const AddMeal = (props: PropTypesWithModal) => {
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
      props.closeModal();
      queryClient.invalidateQueries(["MealsByDate"]);
    },
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} submitButtonName="Add Meal">
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

        <Input
          id="meal-date-input"
          label="date"
          placeholder="some text..."
          required={true}
          type="date"
          formConnect={register("date_of_meal")}
        />

        <Select
          id="meal-category-input"
          selectOptions={["BREAKFAST", "LUNCH", "DINNER", "SNACK"]}
          formConnect={register("category")}
          label="Category"
        />

        <Input
          id="meal-name-input"
          label="working"
          placeholder="some text..."
          required={true}
          type="text"
          formConnect={register("name")}
        />
      </Form>
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
};

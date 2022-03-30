import { useUpdateUserWeightMutation } from "src/generated/graphql-hooks";
import { PropTypesWithUserWeight } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const UpdateUserWeight = (props: PropTypesWithUserWeight) => {
  const { id, weight_in_lbs, date_of_weight, note } = props.userWeight;
  const initialFormData = {
    weight_in_lbs,
    date_of_weight,
    note,
  };
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = (data: any) => {
    setShowUpdateForm(false);
    updateUserWeight.mutate(
      {
        id,
        input: data,
      },
      refetchDirective
    );
  };

  const updateUserWeight = useUpdateUserWeightMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightHistory"]);
    },
  };
  return (
    <div>
      {showUpdateForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor={"weight-in-lbs-input-" + id}>weight in lbs</label>
          <input
            id={"weight-in-lbs-input-" + id}
            type="number"
            {...register("weight_in_lbs", {
              valueAsNumber: true,
            })}
          />

          <label htmlFor="weight-date-input">date</label>
          <input
            id="weight-date-input"
            type="date"
            {...register("date_of_weight")}
          />

          <label htmlFor={"weight-note-input-" + id}>note</label>
          <input id={"weight-note-input-" + id} {...register("note")} />

          <input type="submit" value="Update User Weight" />
        </form>
      )}
      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? "Cancel" : "Update"}
      </button>
    </div>
  );
};

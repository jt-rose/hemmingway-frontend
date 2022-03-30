import { useSetUserWeightMutation } from "src/generated/graphql-hooks";
import { PropTypes } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

export const SetUserWeight = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setUserWeight.mutate(
      {
        input: data,
      },
      refetchDirective
    );
  };

  const setUserWeight = useSetUserWeightMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightHistory"]);
    },
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"weight-in-lbs-input"}>weight in lbs</label>
        <input
          id={"weight-in-lbs-input"}
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

        <label htmlFor={"weight-note-input"}>note</label>
        <input id={"weight-note-input"} {...register("note")} />

        <input type="submit" value="Update User Weight" />
      </form>
    </div>
  );
};

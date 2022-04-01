import {
  useSetUserWeightMutation,
  useUpdateUserWeightMutation,
  useCurrentUserWeightQuery,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { useRouter } from "next/router";

export const SetUserWeight = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  // check for current day's weight and either create or update
  const currentUserWeight = useCurrentUserWeightQuery(props.gqlClient);
  const setUserWeight = useSetUserWeightMutation(props.gqlClient);
  const updateUserWeight = useUpdateUserWeightMutation(props.gqlClient);

  const weightAlreadyRecordedForToday =
    currentUserWeight.data?.currentUserWeight?.date_of_weight &&
    currentUserWeight.data.currentUserWeight.date_of_weight >= props.date
      ? currentUserWeight.data.currentUserWeight.id
      : null;

  const onSubmit = (data: any) => {
    if (weightAlreadyRecordedForToday) {
      updateUserWeight.mutate(
        {
          id: weightAlreadyRecordedForToday,
          input: { ...data, date_of_weight: props.date },
        },
        refetchDirective
      );
    } else {
      setUserWeight.mutate(
        {
          input: { ...data, date_of_weight: props.date },
        },
        refetchDirective
      );
    }
  };

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightHistory", "CurrentUserWeight"]);
      router.push("/home");
    },
  };
  return (
    <div>
      {currentUserWeight.data && !currentUserWeight.data.currentUserWeight && (
        <p className="text-red-700">
          {" "}
          Please enter a weight to begin calculating your daily calories
        </p>
      )}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        submitButtonName="Record New Weight"
      >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        {/* <label htmlFor={"weight-in-lbs-input"}>weight in lbs</label>
        <input
          id={"weight-in-lbs-input"}
          type="number"
          {...register("weight_in_lbs", {
            valueAsNumber: true,
          })}
        /> */}

        <Input
          id="weight-in-lbs-input"
          label="Weight in lbs"
          placeholder="current weight"
          required={true}
          type="number"
          formConnect={register("weight_in_lbs", {
            valueAsNumber: true,
          })}
        />

        {/* <label htmlFor="weight-date-input">date</label>
        <input
          id="weight-date-input"
          type="date"
          {...register("date_of_weight")}
        /> */}

        {/* <label htmlFor={"weight-note-input"}>note</label>
        <input id={"weight-note-input"} {...register("note")} /> */}

        <Input
          id="weight-note-input"
          label="Note"
          placeholder="..."
          required={false}
          type="text"
          formConnect={register("note")}
        />

        {/* <input type="submit" value="Update User Weight" />
      </form> */}
      </Form>
    </div>
  );
};

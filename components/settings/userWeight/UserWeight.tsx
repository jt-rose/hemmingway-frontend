import {
  useWeightHistoryQuery,
  useDeleteUserWeightMutation,
} from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { useQueryClient } from "react-query";
import { SetUserWeight } from "./SetUserWeight";
import { UpdateUserWeight } from "./UpdateUserWeight";
import dayjs from "dayjs";

export const UserWeight = (props: PropTypesWithDate) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useWeightHistoryQuery(props.gqlClient);

  const deleteUserWeight = useDeleteUserWeightMutation(props.gqlClient);

  const refetchDirective = {
    onSuccess: () => {
      queryClient.invalidateQueries(["WeightHistory"]);
    },
  };
  return (
    <div>
      <h3>Steps Goals</h3>
      <p>Data: {`${data}`}</p>
      <p>error: {`${error}`}</p>
      <p>loading: {`${isLoading}`}</p>
      {data?.weight_history.map((weight) => (
        <div key={"weight-" + weight.id}>
          <h3
            onClick={() =>
              deleteUserWeight.mutate({ id: weight.id }, refetchDirective)
            }
          >
            {"User Weight: " +
              weight.weight_in_lbs +
              " lbs recorded on " +
              weight.weight_in_lbs}
          </h3>
          <UpdateUserWeight gqlClient={props.gqlClient} userWeight={weight} />
        </div>
      ))}
      <SetUserWeight
        gqlClient={props.gqlClient}
        date={dayjs().format("YYYY-MM-DD")}
      />
    </div>
  );
};

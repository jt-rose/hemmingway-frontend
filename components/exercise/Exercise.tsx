import { useExercisesByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { ModalForm } from "components/forms/ModalForm";
import { ExerciseCard } from "./ExerciseCard";

export const Exercise = (props: PropTypesWithDate) => {
  const { data } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: props.date,
  });

  return (
    <div>
      <h3>Exercises</h3>
      {data?.exercisesByDate.map((ex) => (
        <ExerciseCard gqlClient={props.gqlClient} exercise={ex} />
      ))}

      <ModalForm
        gqlClient={props.gqlClient}
        formType="EXERCISE"
        addOrUpdate="ADD"
        date={props.date}
      />
    </div>
  );
};

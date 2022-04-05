import { useExercisesByDateQuery } from "src/generated/graphql-hooks";
import { PropTypesWithDate } from "types/propTypes";
import { ModalForm } from "components/forms/ModalForm";
import { ExerciseCard } from "./ExerciseCard";

export const Exercise = (props: PropTypesWithDate) => {
  const { data } = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: props.date,
  });

  return (
    <div className="flex flex-col items-center mb-12">
      <h3 className="text-3xl">Exercises</h3>
      {data?.exercisesByDate.map((ex, index) => (
        <ExerciseCard
          gqlClient={props.gqlClient}
          exercise={ex}
          key={"ex-card-" + index}
        />
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

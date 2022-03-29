import { GraphQLClient } from "graphql-request";
import { Exercise, ExercisesByDateQuery } from "src/generated/graphql-hooks";

export interface PropTypes {
  gqlClient: GraphQLClient;
}

export interface PropTypesWithDate extends PropTypes {
  date: string; // "2022-03-29"
}

export interface PropTypesWithExercise extends PropTypes {
  exercise: Omit<Exercise, "created_at" | "updated_at" | "user" | "user_id">;
}

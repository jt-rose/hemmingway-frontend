import { GraphQLClient } from "graphql-request";
import { Dispatch, SetStateAction } from "react";
import { Exercise, Meal, Mood, SleepHabit } from "src/generated/graphql-hooks";

export interface PropTypes {
  gqlClient: GraphQLClient;
}

export interface PropTypesWithRefresh extends PropTypes {
  setToken: Dispatch<SetStateAction<string>>;
}
export interface PropTypesWithDate extends PropTypes {
  date: string; // "2022-03-29"
}

export interface PropTypesWithExercise extends PropTypes {
  exercise: Omit<Exercise, "created_at" | "updated_at" | "user" | "user_id">;
}

export interface PropTypesWithMeal extends PropTypes {
  meal: Omit<Meal, "created_at" | "updated_at" | "user" | "user_id">;
}

export interface PropTypesWithMood extends PropTypes {
  mood: Omit<Mood, "created_at" | "updated_at" | "user" | "user_id">;
}

export interface PropTypesWithSleepHabit extends PropTypes {
  sleepHabit: Omit<
    SleepHabit,
    "created_at" | "updated_at" | "user" | "user_id"
  >;
}

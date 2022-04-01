import { GraphQLClient } from "graphql-request";
import { Dispatch, SetStateAction } from "react";
import {
  DailyDistanceGoal,
  DailyStepsGoal,
  Exercise,
  Meal,
  Mood,
  SleepHabit,
  User,
  UserWeight,
  WeightGoal,
} from "src/generated/graphql-hooks";

export type SimpleMeal = Omit<
  Meal,
  "created_at" | "updated_at" | "user" | "user_id"
>;

export interface PropTypes {
  gqlClient: GraphQLClient;
}

export interface PropTypesWithModalForm extends PropTypes {
  formType: "MEAL" | "MOOD" | "EXERCISE" | "SLEEPHABIT";
  addOrUpdate: "ADD" | "UPDATE";
  date: string;
}

export interface PropTypesWithModal extends PropTypes {
  closeModal: () => void;
  date: string;
}

export interface PropTypesWithRefresh extends PropTypes {
  setToken: Dispatch<SetStateAction<string>>;
}

export interface PropTypesWithUser extends PropTypes {
  user: Pick<
    User,
    "id" | "name" | "birthday" | "email" | "gender" | "height_in_inches"
  >;
}
export interface PropTypesWithDate extends PropTypes {
  date: string; // "2022-03-29"
}

export interface PropTypesWithExercise extends PropTypes {
  exercise: Omit<Exercise, "created_at" | "updated_at" | "user" | "user_id">;
}

export interface PropTypesWithExerciseAndModal extends PropTypesWithExercise {
  closeModal: () => void;
}

export interface PropTypesWithMeal extends PropTypes {
  meal: SimpleMeal;
}

export interface PropTypesWithMealAndModal extends PropTypesWithMeal {
  closeModal: () => void;
}
export type SimpleMood = Omit<
  Mood,
  "created_at" | "updated_at" | "user" | "user_id"
>;

export interface PropTypesWithMood extends PropTypes {
  mood: SimpleMood;
}

export interface PropTypesWithMoodAndModal extends PropTypesWithMood {
  closeModal: () => void;
}

export type SimpleSleepHabit = Omit<
  SleepHabit,
  "created_at" | "updated_at" | "user" | "user_id"
>;
export interface PropTypesWithSleepHabit extends PropTypes {
  sleepHabit: SimpleSleepHabit;
}

export interface PropTypesWithSleepHabitAndModal
  extends PropTypesWithSleepHabit {
  closeModal: () => void;
}

export interface PropTypesWithDistanceGoal extends PropTypes {
  distanceGoal: Omit<
    DailyDistanceGoal,
    "created_at" | "updated_at" | "user" | "user_id"
  >;
}

export interface PropTypesWithStepsGoal extends PropTypes {
  stepsGoal: Omit<
    DailyStepsGoal,
    "created_at" | "updated_at" | "user" | "user_id"
  >;
}

export interface PropTypesWithUserWeight extends PropTypes {
  userWeight: Omit<
    UserWeight,
    "created_at" | "updated_at" | "user" | "user_id"
  >;
}

export interface PropTypesWithWeightGoal extends PropTypes {
  weightGoal: Omit<
    WeightGoal,
    "created_at" | "updated_at" | "user" | "user_id"
  >;
}

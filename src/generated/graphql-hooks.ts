import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
};

export type DailyDistanceGoal = {
  __typename?: 'DailyDistanceGoal';
  active: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  daily_goal_in_miles: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type DailyDistanceGoalInput = {
  active: Scalars['Boolean'];
  daily_goal_in_miles: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
};

export type DailyStepsGoal = {
  __typename?: 'DailyStepsGoal';
  active: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  daily_goal_in_steps: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type DailyStepsGoalInput = {
  active: Scalars['Boolean'];
  daily_goal_in_steps: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
};

export type DateRange = {
  from: Scalars['Date'];
  to: Scalars['Date'];
};

export type Exercise = {
  __typename?: 'Exercise';
  calories: Scalars['Int'];
  created_at: Scalars['DateTime'];
  date_of_exercise: Scalars['Date'];
  distance_in_miles?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  minutes: Scalars['Int'];
  name: Scalars['String'];
  steps?: Maybe<Scalars['Int']>;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type ExerciseInput = {
  calories: Scalars['Int'];
  date_of_exercise: Scalars['Date'];
  distance_in_miles?: InputMaybe<Scalars['Int']>;
  minutes: Scalars['Int'];
  name: Scalars['String'];
  steps?: InputMaybe<Scalars['Int']>;
};

/** A paginated list of Exercise items. */
export type ExercisePaginator = {
  __typename?: 'ExercisePaginator';
  /** A list of Exercise items. */
  data: Array<Exercise>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Nb = 'NB'
}

export enum Goal_Pace {
  Light = 'LIGHT',
  Moderate = 'MODERATE',
  Strong = 'STRONG'
}

export enum Goal_Type {
  Calories = 'CALORIES',
  Distance = 'DISTANCE',
  Steps = 'STEPS'
}

export type Meal = {
  __typename?: 'Meal';
  calories: Scalars['Int'];
  category: MealCategory;
  created_at: Scalars['DateTime'];
  date_of_meal: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export enum MealCategory {
  Breakfast = 'BREAKFAST',
  Dinner = 'DINNER',
  Lunch = 'LUNCH',
  Snack = 'SNACK'
}

export type MealInput = {
  calories: Scalars['Int'];
  category: MealCategory;
  date_of_meal: Scalars['Date'];
  name: Scalars['String'];
};

/** A paginated list of Meal items. */
export type MealPaginator = {
  __typename?: 'MealPaginator';
  /** A list of Meal items. */
  data: Array<Meal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Mood = {
  __typename?: 'Mood';
  created_at: Scalars['DateTime'];
  date_of_mood: Scalars['Date'];
  id: Scalars['ID'];
  meditated: Scalars['Boolean'];
  mood_type: Mood_Type;
  note?: Maybe<Scalars['String']>;
  stress_level: Stress_Level;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type MoodInput = {
  date_of_mood: Scalars['Date'];
  meditated: Scalars['Boolean'];
  mood_type: Mood_Type;
  note?: InputMaybe<Scalars['String']>;
  stress_level: Stress_Level;
};

/** A paginated list of Mood items. */
export type MoodPaginator = {
  __typename?: 'MoodPaginator';
  /** A list of Mood items. */
  data: Array<Mood>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum Mood_Type {
  Anxious = 'ANXIOUS',
  Frustrated = 'FRUSTRATED',
  Happy = 'HAPPY',
  Motivated = 'MOTIVATED',
  Relaxed = 'RELAXED',
  Sad = 'SAD',
  Satisfied = 'SATISFIED',
  Tired = 'TIRED'
}

export type Mutation = {
  __typename?: 'Mutation';
  createExercise?: Maybe<Exercise>;
  createMeal: Meal;
  createMood: Mood;
  createPopGoal: PopGoal;
  createSleepHabit: SleepHabit;
  createUser: User;
  deleteDailyDistanceGoal: Scalars['Boolean'];
  deleteDailyStepsGoal: Scalars['Boolean'];
  deleteExercise: Scalars['Boolean'];
  deleteMeal: Scalars['Boolean'];
  deleteMood: Scalars['Boolean'];
  deletePopGoal: Scalars['Boolean'];
  deleteSleepHabit: Scalars['Boolean'];
  deleteUser?: Maybe<User>;
  deleteUserWeight: Scalars['Boolean'];
  deleteWeightGoal: Scalars['Boolean'];
  login: Scalars['String'];
  setDailyDistanceGoal: DailyDistanceGoal;
  setDailyStepsGoal: DailyStepsGoal;
  setUserWeight: UserWeight;
  setWeightGoal: WeightGoal;
  updateDailyDistanceGoal: DailyDistanceGoal;
  updateDailyStepsGoal: DailyStepsGoal;
  updateExercise?: Maybe<Exercise>;
  updateMeal: Meal;
  updateMood: Mood;
  updateSleepHabit: SleepHabit;
  updateUser: User;
  updateUserWeight: UserWeight;
  updateWeightGoal: WeightGoal;
};


export type MutationCreateExerciseArgs = {
  input: ExerciseInput;
};


export type MutationCreateMealArgs = {
  input: MealInput;
};


export type MutationCreateMoodArgs = {
  input?: InputMaybe<MoodInput>;
};


export type MutationCreatePopGoalArgs = {
  input: PopGoalInput;
};


export type MutationCreateSleepHabitArgs = {
  input: SleepHabitInput;
};


export type MutationCreateUserArgs = {
  birthday: Scalars['Date'];
  email: Scalars['String'];
  gender: Gender;
  height_in_inches: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteDailyDistanceGoalArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDailyStepsGoalArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMealArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMoodArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePopGoalArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSleepHabitArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserWeightArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWeightGoalArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  device: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetDailyDistanceGoalArgs = {
  input: DailyDistanceGoalInput;
};


export type MutationSetDailyStepsGoalArgs = {
  input: DailyStepsGoalInput;
};


export type MutationSetUserWeightArgs = {
  input: UserWeightInput;
};


export type MutationSetWeightGoalArgs = {
  input: WeightGoalInput;
};


export type MutationUpdateDailyDistanceGoalArgs = {
  id: Scalars['ID'];
  input: DailyDistanceGoalInput;
};


export type MutationUpdateDailyStepsGoalArgs = {
  id: Scalars['ID'];
  input: DailyStepsGoalInput;
};


export type MutationUpdateExerciseArgs = {
  id: Scalars['ID'];
  input: ExerciseInput;
};


export type MutationUpdateMealArgs = {
  id: Scalars['ID'];
  input: MealInput;
};


export type MutationUpdateMoodArgs = {
  id: Scalars['ID'];
  input: MoodInput;
};


export type MutationUpdateSleepHabitArgs = {
  id: Scalars['ID'];
  input: SleepHabitInput;
};


export type MutationUpdateUserArgs = {
  birthday: Scalars['Date'];
  email?: InputMaybe<Scalars['String']>;
  gender: Gender;
  height_in_inches: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserWeightArgs = {
  id: Scalars['ID'];
  input: UserWeightInput;
};


export type MutationUpdateWeightGoalArgs = {
  id: Scalars['ID'];
  input: WeightGoalInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a Relay style cursor connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Number of nodes in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** The cursor to continue paginating forwards. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** The cursor to continue paginating backwards. */
  startCursor?: Maybe<Scalars['String']>;
  /** Total number of nodes in the paginated connection. */
  total: Scalars['Int'];
};

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int'];
  /** Number of items per page. */
  perPage: Scalars['Int'];
  /** Number of total available items. */
  total: Scalars['Int'];
};

export type PopGoal = {
  __typename?: 'PopGoal';
  created_at: Scalars['DateTime'];
  date_of_goal: Scalars['Date'];
  goal_amount: Scalars['Int'];
  goal_type?: Maybe<Goal_Type>;
  id: Scalars['ID'];
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type PopGoalInput = {
  date_of_goal: Scalars['Date'];
  goal_amount: Scalars['Int'];
  goal_type?: InputMaybe<Goal_Type>;
};

/** A paginated list of PopGoal items. */
export type PopGoalPaginator = {
  __typename?: 'PopGoalPaginator';
  /** A list of PopGoal items. */
  data: Array<PopGoal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type Query = {
  __typename?: 'Query';
  currentDistanceGoal?: Maybe<DailyDistanceGoal>;
  currentPopGoal?: Maybe<PopGoal>;
  currentStepsGoal?: Maybe<DailyStepsGoal>;
  currentUserWeight?: Maybe<UserWeight>;
  currentWeightGoal?: Maybe<WeightGoal>;
  daily_distance_goals: Array<DailyDistanceGoal>;
  daily_steps_goals: Array<DailyStepsGoal>;
  distanceGoalsBetweenDates: Array<DailyDistanceGoal>;
  exercises?: Maybe<ExercisePaginator>;
  exercisesBetweenDates: Array<Exercise>;
  exercisesByDate: Array<Exercise>;
  me: User;
  meals?: Maybe<MealPaginator>;
  mealsBetweenDates: Array<Meal>;
  mealsByDate: Array<Meal>;
  moodByDate: Array<Mood>;
  moods?: Maybe<MoodPaginator>;
  moodsBetweenDates: Array<Mood>;
  popGoalsBetweenDates: Array<PopGoal>;
  popGoalsByDate: Array<PopGoal>;
  pop_goals?: Maybe<PopGoalPaginator>;
  sleepHabits?: Maybe<SleepHabitPaginator>;
  sleepHabitsBetweenDates: Array<SleepHabit>;
  sleepHabitsByDate: Array<SleepHabit>;
  stepsGoalsBetweenDates: Array<DailyStepsGoal>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
  weightBetweenDates: Array<UserWeight>;
  weightGoalsBetweenDates: Array<WeightGoal>;
  weight_goals: Array<WeightGoal>;
  weight_history: Array<UserWeight>;
};


export type QueryDistanceGoalsBetweenDatesArgs = {
  goal_start_date: DateRange;
};


export type QueryExercisesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryExercisesBetweenDatesArgs = {
  date_of_exercise: DateRange;
};


export type QueryExercisesByDateArgs = {
  date_of_exercise: Scalars['Date'];
};


export type QueryMealsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryMealsBetweenDatesArgs = {
  date_of_meal: DateRange;
};


export type QueryMealsByDateArgs = {
  date_of_meal: Scalars['Date'];
};


export type QueryMoodByDateArgs = {
  date_of_mood: Scalars['Date'];
};


export type QueryMoodsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryMoodsBetweenDatesArgs = {
  date_of_mood: DateRange;
};


export type QueryPopGoalsBetweenDatesArgs = {
  date_of_goal: DateRange;
};


export type QueryPopGoalsByDateArgs = {
  date_of_goal: Scalars['Date'];
};


export type QueryPop_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySleepHabitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySleepHabitsBetweenDatesArgs = {
  date_of_sleep: DateRange;
};


export type QuerySleepHabitsByDateArgs = {
  date_of_sleep: Scalars['Date'];
};


export type QueryStepsGoalsBetweenDatesArgs = {
  goal_start_date: DateRange;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryWeightBetweenDatesArgs = {
  date_of_weight: DateRange;
};


export type QueryWeightGoalsBetweenDatesArgs = {
  goal_start_date: DateRange;
};

/** Information about pagination using a simple paginator. */
export type SimplePaginatorInfo = {
  __typename?: 'SimplePaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int'];
  /** Index of the current page. */
  currentPage: Scalars['Int'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Number of items per page. */
  perPage: Scalars['Int'];
};

export enum SleepAmount {
  Extra = 'EXTRA',
  Few = 'FEW',
  Full = 'FULL',
  None = 'NONE'
}

export type SleepHabit = {
  __typename?: 'SleepHabit';
  amount: SleepAmount;
  created_at: Scalars['DateTime'];
  date_of_sleep: Scalars['Date'];
  id: Scalars['ID'];
  note: Scalars['String'];
  quality: SleepQuality;
  updated_at: Scalars['DateTime'];
  user: User;
  user_id: Scalars['Int'];
};

export type SleepHabitInput = {
  amount: SleepAmount;
  date_of_sleep: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
  quality: SleepQuality;
};

/** A paginated list of SleepHabit items. */
export type SleepHabitPaginator = {
  __typename?: 'SleepHabitPaginator';
  /** A list of SleepHabit items. */
  data: Array<SleepHabit>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum SleepQuality {
  Decent = 'DECENT',
  Good = 'GOOD',
  Poor = 'POOR'
}

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export enum Stress_Level {
  High = 'HIGH',
  Low = 'LOW',
  Moderate = 'MODERATE'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  birthday: Scalars['Date'];
  created_at: Scalars['DateTime'];
  daily_distance_goals: Array<DailyDistanceGoal>;
  daily_steps_goals: Array<DailyStepsGoal>;
  email: Scalars['String'];
  email_verified_at?: Maybe<Scalars['DateTime']>;
  exercises: Array<Exercise>;
  gender: Gender;
  height_in_inches: Scalars['Int'];
  id: Scalars['ID'];
  meals: Array<Meal>;
  moods: Array<Mood>;
  name: Scalars['String'];
  pop_goals: Array<PopGoal>;
  sleep_habits: Array<SleepHabit>;
  updated_at: Scalars['DateTime'];
  user_weights: Array<UserWeight>;
  weight_goals: Array<WeightGoal>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type UserWeight = {
  __typename?: 'UserWeight';
  created_at: Scalars['DateTime'];
  date_of_weight: Scalars['Date'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
  weight_in_lbs: Scalars['Int'];
};

export type UserWeightInput = {
  date_of_weight: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
  weight_in_lbs: Scalars['Int'];
};

export type WeightGoal = {
  __typename?: 'WeightGoal';
  active: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  goal_in_lbs: Scalars['Int'];
  goal_pace: Goal_Pace;
  goal_start_date: Scalars['Date'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type WeightGoalInput = {
  active: Scalars['Boolean'];
  goal_in_lbs: Scalars['Int'];
  goal_pace: Goal_Pace;
  goal_start_date: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentGoalsQuery = { __typename?: 'Query', currentWeightGoal?: { __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, active: boolean, goal_pace: Goal_Pace } | null, currentPopGoal?: { __typename?: 'PopGoal', id: string, date_of_goal: any, goal_type?: Goal_Type | null, goal_amount: number } | null, currentStepsGoal?: { __typename?: 'DailyStepsGoal', id: string, goal_start_date: any, daily_goal_in_steps: number, note?: string | null, active: boolean } | null, currentDistanceGoal?: { __typename?: 'DailyDistanceGoal', id: string, goal_start_date: any, daily_goal_in_miles: number, note?: string | null, active: boolean } | null, me: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number }, currentUserWeight?: { __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null } | null };

export type CurrentDistanceGoalQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentDistanceGoalQuery = { __typename?: 'Query', currentDistanceGoal?: { __typename?: 'DailyDistanceGoal', id: string, goal_start_date: any, daily_goal_in_miles: number, note?: string | null, active: boolean } | null };

export type DailyDistanceGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type DailyDistanceGoalsQuery = { __typename?: 'Query', daily_distance_goals: Array<{ __typename?: 'DailyDistanceGoal', id: string, goal_start_date: any, daily_goal_in_miles: number, note?: string | null, active: boolean }> };

export type DeleteDailyDistanceGoalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteDailyDistanceGoalMutation = { __typename?: 'Mutation', deleteDailyDistanceGoal: boolean };

export type DistanceGoalsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type DistanceGoalsBetweenDatesQuery = { __typename?: 'Query', distanceGoalsBetweenDates: Array<{ __typename?: 'DailyDistanceGoal', id: string, goal_start_date: any, daily_goal_in_miles: number, note?: string | null, active: boolean }> };

export type SetDailyDistanceGoalMutationVariables = Exact<{
  input: DailyDistanceGoalInput;
}>;


export type SetDailyDistanceGoalMutation = { __typename?: 'Mutation', setDailyDistanceGoal: { __typename?: 'DailyDistanceGoal', id: string, note?: string | null, goal_start_date: any, daily_goal_in_miles: number, active: boolean } };

export type UpdateDailyDistanceGoalMutationVariables = Exact<{
  id: Scalars['ID'];
  input: DailyDistanceGoalInput;
}>;


export type UpdateDailyDistanceGoalMutation = { __typename?: 'Mutation', updateDailyDistanceGoal: { __typename?: 'DailyDistanceGoal', id: string, note?: string | null, goal_start_date: any, daily_goal_in_miles: number, active: boolean } };

export type CurrentStepsGoalQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentStepsGoalQuery = { __typename?: 'Query', currentStepsGoal?: { __typename?: 'DailyStepsGoal', id: string, goal_start_date: any, daily_goal_in_steps: number, note?: string | null, active: boolean } | null };

export type DailyStepsGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type DailyStepsGoalsQuery = { __typename?: 'Query', daily_steps_goals: Array<{ __typename?: 'DailyStepsGoal', id: string, goal_start_date: any, daily_goal_in_steps: number, note?: string | null, active: boolean }> };

export type DeleteDailyStepsGoalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteDailyStepsGoalMutation = { __typename?: 'Mutation', deleteDailyStepsGoal: boolean };

export type SetDailyStepsGoalMutationVariables = Exact<{
  input: DailyStepsGoalInput;
}>;


export type SetDailyStepsGoalMutation = { __typename?: 'Mutation', setDailyStepsGoal: { __typename?: 'DailyStepsGoal', id: string, note?: string | null, goal_start_date: any, daily_goal_in_steps: number, active: boolean } };

export type StepsGoalsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type StepsGoalsBetweenDatesQuery = { __typename?: 'Query', stepsGoalsBetweenDates: Array<{ __typename?: 'DailyStepsGoal', id: string, goal_start_date: any, daily_goal_in_steps: number, note?: string | null, active: boolean }> };

export type UpdateDailyStepsGoalMutationVariables = Exact<{
  id: Scalars['ID'];
  input: DailyStepsGoalInput;
}>;


export type UpdateDailyStepsGoalMutation = { __typename?: 'Mutation', updateDailyStepsGoal: { __typename?: 'DailyStepsGoal', id: string, note?: string | null, goal_start_date: any, daily_goal_in_steps: number, active: boolean } };

export type CreateExerciseMutationVariables = Exact<{
  input: ExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise?: { __typename?: 'Exercise', id: string, name: string, date_of_exercise: any, minutes: number, calories: number, steps?: number | null, distance_in_miles?: number | null } | null };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: boolean };

export type ExercisesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;


export type ExercisesQuery = { __typename?: 'Query', exercises?: { __typename?: 'ExercisePaginator', data: Array<{ __typename?: 'Exercise', id: string, name: string, date_of_exercise: any, minutes: number, calories: number, steps?: number | null, distance_in_miles?: number | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, hasMorePages: boolean, total: number } } | null };

export type ExercisesByDateQueryVariables = Exact<{
  date_of_exercise: Scalars['Date'];
}>;


export type ExercisesByDateQuery = { __typename?: 'Query', exercisesByDate: Array<{ __typename?: 'Exercise', id: string, name: string, date_of_exercise: any, minutes: number, calories: number, steps?: number | null, distance_in_miles?: number | null }> };

export type ExercisesBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type ExercisesBetweenDatesQuery = { __typename?: 'Query', exercisesBetweenDates: Array<{ __typename?: 'Exercise', id: string, name: string, minutes: number, date_of_exercise: any, calories: number }> };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['ID'];
  input: ExerciseInput;
}>;


export type UpdateExerciseMutation = { __typename?: 'Mutation', updateExercise?: { __typename?: 'Exercise', id: string, name: string, date_of_exercise: any, minutes: number, calories: number, steps?: number | null, distance_in_miles?: number | null } | null };

export type GoalsAndSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GoalsAndSettingsQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number, user_weights: Array<{ __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null }>, weight_goals: Array<{ __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, goal_pace: Goal_Pace, active: boolean }>, daily_steps_goals: Array<{ __typename?: 'DailyStepsGoal', id: string, daily_goal_in_steps: number, goal_start_date: any, active: boolean }>, daily_distance_goals: Array<{ __typename?: 'DailyDistanceGoal', id: string, daily_goal_in_miles: number, goal_start_date: any, active: boolean }> } };

export type CreateMealMutationVariables = Exact<{
  input: MealInput;
}>;


export type CreateMealMutation = { __typename?: 'Mutation', createMeal: { __typename?: 'Meal', id: string, name: string, date_of_meal: any, category: MealCategory, calories: number } };

export type DeleteMealMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMealMutation = { __typename?: 'Mutation', deleteMeal: boolean };

export type MealsByDateQueryVariables = Exact<{
  date_of_meal: Scalars['Date'];
}>;


export type MealsByDateQuery = { __typename?: 'Query', mealsByDate: Array<{ __typename?: 'Meal', id: string, name: string, date_of_meal: any, category: MealCategory, calories: number }> };

export type MealsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type MealsBetweenDatesQuery = { __typename?: 'Query', mealsBetweenDates: Array<{ __typename?: 'Meal', id: string, name: string, calories: number, date_of_meal: any, category: MealCategory }> };

export type UpdateMealMutationVariables = Exact<{
  id: Scalars['ID'];
  input: MealInput;
}>;


export type UpdateMealMutation = { __typename?: 'Mutation', updateMeal: { __typename?: 'Meal', id: string, name: string, date_of_meal: any, category: MealCategory, calories: number } };

export type CreateMoodMutationVariables = Exact<{
  input: MoodInput;
}>;


export type CreateMoodMutation = { __typename?: 'Mutation', createMood: { __typename?: 'Mood', id: string, note?: string | null, date_of_mood: any, meditated: boolean, stress_level: Stress_Level, mood_type: Mood_Type } };

export type DeleteMoodMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMoodMutation = { __typename?: 'Mutation', deleteMood: boolean };

export type MoodByDateQueryVariables = Exact<{
  date_of_mood: Scalars['Date'];
}>;


export type MoodByDateQuery = { __typename?: 'Query', moodByDate: Array<{ __typename?: 'Mood', id: string, note?: string | null, date_of_mood: any, meditated: boolean, stress_level: Stress_Level, mood_type: Mood_Type }> };

export type MoodsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type MoodsBetweenDatesQuery = { __typename?: 'Query', moodsBetweenDates: Array<{ __typename?: 'Mood', id: string, date_of_mood: any, note?: string | null, meditated: boolean, stress_level: Stress_Level, mood_type: Mood_Type }> };

export type UpdateMoodMutationVariables = Exact<{
  id: Scalars['ID'];
  input: MoodInput;
}>;


export type UpdateMoodMutation = { __typename?: 'Mutation', updateMood: { __typename?: 'Mood', id: string, note?: string | null, date_of_mood: any, meditated: boolean, stress_level: Stress_Level, mood_type: Mood_Type } };

export type CreatePopGoalMutationVariables = Exact<{
  input: PopGoalInput;
}>;


export type CreatePopGoalMutation = { __typename?: 'Mutation', createPopGoal: { __typename?: 'PopGoal', id: string, goal_amount: number, goal_type?: Goal_Type | null, date_of_goal: any } };

export type CurrentPopGoalQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentPopGoalQuery = { __typename?: 'Query', currentPopGoal?: { __typename?: 'PopGoal', id: string, date_of_goal: any, goal_type?: Goal_Type | null, goal_amount: number } | null };

export type DeletePopGoalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePopGoalMutation = { __typename?: 'Mutation', deletePopGoal: boolean };

export type PopGoalsByDateQueryVariables = Exact<{
  date: Scalars['Date'];
}>;


export type PopGoalsByDateQuery = { __typename?: 'Query', popGoalsByDate: Array<{ __typename?: 'PopGoal', id: string, goal_amount: number, goal_type?: Goal_Type | null, date_of_goal: any }> };

export type PopGoalsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type PopGoalsBetweenDatesQuery = { __typename?: 'Query', popGoalsBetweenDates: Array<{ __typename?: 'PopGoal', id: string, date_of_goal: any, goal_type?: Goal_Type | null, goal_amount: number }> };

export type CreateSleepHabitMutationVariables = Exact<{
  input: SleepHabitInput;
}>;


export type CreateSleepHabitMutation = { __typename?: 'Mutation', createSleepHabit: { __typename?: 'SleepHabit', id: string, quality: SleepQuality, amount: SleepAmount, date_of_sleep: any, note: string } };

export type DeleteSleepHabitMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSleepHabitMutation = { __typename?: 'Mutation', deleteSleepHabit: boolean };

export type SleepHabitsByDateQueryVariables = Exact<{
  date_of_sleep: Scalars['Date'];
}>;


export type SleepHabitsByDateQuery = { __typename?: 'Query', sleepHabitsByDate: Array<{ __typename?: 'SleepHabit', id: string, quality: SleepQuality, amount: SleepAmount, date_of_sleep: any, note: string }> };

export type SleepHabitsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type SleepHabitsBetweenDatesQuery = { __typename?: 'Query', sleepHabitsBetweenDates: Array<{ __typename?: 'SleepHabit', id: string, date_of_sleep: any, quality: SleepQuality, amount: SleepAmount, note: string }> };

export type UpdateSleepHabitMutationVariables = Exact<{
  id: Scalars['ID'];
  input: SleepHabitInput;
}>;


export type UpdateSleepHabitMutation = { __typename?: 'Mutation', updateSleepHabit: { __typename?: 'SleepHabit', id: string, quality: SleepQuality, amount: SleepAmount, date_of_sleep: any, note: string } };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number } };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  gender: Gender;
  birthday: Scalars['Date'];
  height_in_inches: Scalars['Int'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number } };

export type UpdateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  gender: Gender;
  birthday: Scalars['Date'];
  height_in_inches: Scalars['Int'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, gender: Gender, birthday: any, height_in_inches: number } };

export type CurrentUserWeightQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserWeightQuery = { __typename?: 'Query', currentUserWeight?: { __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null } | null };

export type DeleteUserWeightMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserWeightMutation = { __typename?: 'Mutation', deleteUserWeight: boolean };

export type SetUserWeightMutationVariables = Exact<{
  input: UserWeightInput;
}>;


export type SetUserWeightMutation = { __typename?: 'Mutation', setUserWeight: { __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null } };

export type UpdateUserWeightMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UserWeightInput;
}>;


export type UpdateUserWeightMutation = { __typename?: 'Mutation', updateUserWeight: { __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null } };

export type WeightsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type WeightsBetweenDatesQuery = { __typename?: 'Query', weightBetweenDates: Array<{ __typename?: 'UserWeight', id: string, date_of_weight: any, weight_in_lbs: number, note?: string | null }> };

export type WeightHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type WeightHistoryQuery = { __typename?: 'Query', weight_history: Array<{ __typename?: 'UserWeight', id: string, weight_in_lbs: number, date_of_weight: any, note?: string | null }> };

export type CurrentWeightGoalQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentWeightGoalQuery = { __typename?: 'Query', currentWeightGoal?: { __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, active: boolean, goal_pace: Goal_Pace } | null };

export type DeleteWeightGoalMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteWeightGoalMutation = { __typename?: 'Mutation', deleteWeightGoal: boolean };

export type SetWeightGoalMutationVariables = Exact<{
  input: WeightGoalInput;
}>;


export type SetWeightGoalMutation = { __typename?: 'Mutation', setWeightGoal: { __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, active: boolean, goal_pace: Goal_Pace } };

export type UpdateWeightGoalMutationVariables = Exact<{
  id: Scalars['ID'];
  input: WeightGoalInput;
}>;


export type UpdateWeightGoalMutation = { __typename?: 'Mutation', updateWeightGoal: { __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, active: boolean, goal_pace: Goal_Pace } };

export type WeightGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type WeightGoalsQuery = { __typename?: 'Query', weight_goals: Array<{ __typename?: 'WeightGoal', id: string, goal_start_date: any, goal_in_lbs: number, note?: string | null, active: boolean, goal_pace: Goal_Pace }> };

export type WeightGoalsBetweenDatesQueryVariables = Exact<{
  dateRange: DateRange;
}>;


export type WeightGoalsBetweenDatesQuery = { __typename?: 'Query', weightGoalsBetweenDates: Array<{ __typename?: 'WeightGoal', id: string, goal_in_lbs: number, goal_start_date: any, note?: string | null, active: boolean, goal_pace: Goal_Pace }> };


export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password, device: "web")
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      ['Login'],
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const CurrentGoalsDocument = `
    query CurrentGoals {
  currentWeightGoal {
    id
    goal_start_date
    goal_in_lbs
    note
    active
    goal_pace
  }
  currentPopGoal {
    id
    date_of_goal
    goal_type
    goal_amount
  }
  currentStepsGoal {
    id
    goal_start_date
    daily_goal_in_steps
    note
    active
  }
  currentDistanceGoal {
    id
    goal_start_date
    daily_goal_in_miles
    note
    active
  }
  me {
    id
    name
    email
    gender
    birthday
    height_in_inches
  }
  currentUserWeight {
    id
    weight_in_lbs
    date_of_weight
    note
  }
}
    `;
export const useCurrentGoalsQuery = <
      TData = CurrentGoalsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentGoalsQueryVariables,
      options?: UseQueryOptions<CurrentGoalsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentGoalsQuery, TError, TData>(
      variables === undefined ? ['CurrentGoals'] : ['CurrentGoals', variables],
      fetcher<CurrentGoalsQuery, CurrentGoalsQueryVariables>(client, CurrentGoalsDocument, variables, headers),
      options
    );
export const CurrentDistanceGoalDocument = `
    query CurrentDistanceGoal {
  currentDistanceGoal {
    id
    goal_start_date
    daily_goal_in_miles
    note
    active
  }
}
    `;
export const useCurrentDistanceGoalQuery = <
      TData = CurrentDistanceGoalQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentDistanceGoalQueryVariables,
      options?: UseQueryOptions<CurrentDistanceGoalQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentDistanceGoalQuery, TError, TData>(
      variables === undefined ? ['CurrentDistanceGoal'] : ['CurrentDistanceGoal', variables],
      fetcher<CurrentDistanceGoalQuery, CurrentDistanceGoalQueryVariables>(client, CurrentDistanceGoalDocument, variables, headers),
      options
    );
export const DailyDistanceGoalsDocument = `
    query DailyDistanceGoals {
  daily_distance_goals {
    id
    goal_start_date
    daily_goal_in_miles
    note
    active
  }
}
    `;
export const useDailyDistanceGoalsQuery = <
      TData = DailyDistanceGoalsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DailyDistanceGoalsQueryVariables,
      options?: UseQueryOptions<DailyDistanceGoalsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DailyDistanceGoalsQuery, TError, TData>(
      variables === undefined ? ['DailyDistanceGoals'] : ['DailyDistanceGoals', variables],
      fetcher<DailyDistanceGoalsQuery, DailyDistanceGoalsQueryVariables>(client, DailyDistanceGoalsDocument, variables, headers),
      options
    );
export const DeleteDailyDistanceGoalDocument = `
    mutation DeleteDailyDistanceGoal($id: ID!) {
  deleteDailyDistanceGoal(id: $id)
}
    `;
export const useDeleteDailyDistanceGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDailyDistanceGoalMutation, TError, DeleteDailyDistanceGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDailyDistanceGoalMutation, TError, DeleteDailyDistanceGoalMutationVariables, TContext>(
      ['DeleteDailyDistanceGoal'],
      (variables?: DeleteDailyDistanceGoalMutationVariables) => fetcher<DeleteDailyDistanceGoalMutation, DeleteDailyDistanceGoalMutationVariables>(client, DeleteDailyDistanceGoalDocument, variables, headers)(),
      options
    );
export const DistanceGoalsBetweenDatesDocument = `
    query DistanceGoalsBetweenDates($dateRange: DateRange!) {
  distanceGoalsBetweenDates(goal_start_date: $dateRange) {
    id
    goal_start_date
    daily_goal_in_miles
    note
    active
  }
}
    `;
export const useDistanceGoalsBetweenDatesQuery = <
      TData = DistanceGoalsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: DistanceGoalsBetweenDatesQueryVariables,
      options?: UseQueryOptions<DistanceGoalsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DistanceGoalsBetweenDatesQuery, TError, TData>(
      ['DistanceGoalsBetweenDates', variables],
      fetcher<DistanceGoalsBetweenDatesQuery, DistanceGoalsBetweenDatesQueryVariables>(client, DistanceGoalsBetweenDatesDocument, variables, headers),
      options
    );
export const SetDailyDistanceGoalDocument = `
    mutation SetDailyDistanceGoal($input: DailyDistanceGoalInput!) {
  setDailyDistanceGoal(input: $input) {
    id
    note
    goal_start_date
    daily_goal_in_miles
    active
  }
}
    `;
export const useSetDailyDistanceGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetDailyDistanceGoalMutation, TError, SetDailyDistanceGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetDailyDistanceGoalMutation, TError, SetDailyDistanceGoalMutationVariables, TContext>(
      ['SetDailyDistanceGoal'],
      (variables?: SetDailyDistanceGoalMutationVariables) => fetcher<SetDailyDistanceGoalMutation, SetDailyDistanceGoalMutationVariables>(client, SetDailyDistanceGoalDocument, variables, headers)(),
      options
    );
export const UpdateDailyDistanceGoalDocument = `
    mutation UpdateDailyDistanceGoal($id: ID!, $input: DailyDistanceGoalInput!) {
  updateDailyDistanceGoal(id: $id, input: $input) {
    id
    note
    goal_start_date
    daily_goal_in_miles
    active
  }
}
    `;
export const useUpdateDailyDistanceGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateDailyDistanceGoalMutation, TError, UpdateDailyDistanceGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateDailyDistanceGoalMutation, TError, UpdateDailyDistanceGoalMutationVariables, TContext>(
      ['UpdateDailyDistanceGoal'],
      (variables?: UpdateDailyDistanceGoalMutationVariables) => fetcher<UpdateDailyDistanceGoalMutation, UpdateDailyDistanceGoalMutationVariables>(client, UpdateDailyDistanceGoalDocument, variables, headers)(),
      options
    );
export const CurrentStepsGoalDocument = `
    query CurrentStepsGoal {
  currentStepsGoal {
    id
    goal_start_date
    daily_goal_in_steps
    note
    active
  }
}
    `;
export const useCurrentStepsGoalQuery = <
      TData = CurrentStepsGoalQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentStepsGoalQueryVariables,
      options?: UseQueryOptions<CurrentStepsGoalQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentStepsGoalQuery, TError, TData>(
      variables === undefined ? ['CurrentStepsGoal'] : ['CurrentStepsGoal', variables],
      fetcher<CurrentStepsGoalQuery, CurrentStepsGoalQueryVariables>(client, CurrentStepsGoalDocument, variables, headers),
      options
    );
export const DailyStepsGoalsDocument = `
    query DailyStepsGoals {
  daily_steps_goals {
    id
    goal_start_date
    daily_goal_in_steps
    note
    active
  }
}
    `;
export const useDailyStepsGoalsQuery = <
      TData = DailyStepsGoalsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: DailyStepsGoalsQueryVariables,
      options?: UseQueryOptions<DailyStepsGoalsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<DailyStepsGoalsQuery, TError, TData>(
      variables === undefined ? ['DailyStepsGoals'] : ['DailyStepsGoals', variables],
      fetcher<DailyStepsGoalsQuery, DailyStepsGoalsQueryVariables>(client, DailyStepsGoalsDocument, variables, headers),
      options
    );
export const DeleteDailyStepsGoalDocument = `
    mutation DeleteDailyStepsGoal($id: ID!) {
  deleteDailyStepsGoal(id: $id)
}
    `;
export const useDeleteDailyStepsGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDailyStepsGoalMutation, TError, DeleteDailyStepsGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDailyStepsGoalMutation, TError, DeleteDailyStepsGoalMutationVariables, TContext>(
      ['DeleteDailyStepsGoal'],
      (variables?: DeleteDailyStepsGoalMutationVariables) => fetcher<DeleteDailyStepsGoalMutation, DeleteDailyStepsGoalMutationVariables>(client, DeleteDailyStepsGoalDocument, variables, headers)(),
      options
    );
export const SetDailyStepsGoalDocument = `
    mutation SetDailyStepsGoal($input: DailyStepsGoalInput!) {
  setDailyStepsGoal(input: $input) {
    id
    note
    goal_start_date
    daily_goal_in_steps
    active
  }
}
    `;
export const useSetDailyStepsGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetDailyStepsGoalMutation, TError, SetDailyStepsGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetDailyStepsGoalMutation, TError, SetDailyStepsGoalMutationVariables, TContext>(
      ['SetDailyStepsGoal'],
      (variables?: SetDailyStepsGoalMutationVariables) => fetcher<SetDailyStepsGoalMutation, SetDailyStepsGoalMutationVariables>(client, SetDailyStepsGoalDocument, variables, headers)(),
      options
    );
export const StepsGoalsBetweenDatesDocument = `
    query StepsGoalsBetweenDates($dateRange: DateRange!) {
  stepsGoalsBetweenDates(goal_start_date: $dateRange) {
    id
    goal_start_date
    daily_goal_in_steps
    note
    active
  }
}
    `;
export const useStepsGoalsBetweenDatesQuery = <
      TData = StepsGoalsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: StepsGoalsBetweenDatesQueryVariables,
      options?: UseQueryOptions<StepsGoalsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StepsGoalsBetweenDatesQuery, TError, TData>(
      ['StepsGoalsBetweenDates', variables],
      fetcher<StepsGoalsBetweenDatesQuery, StepsGoalsBetweenDatesQueryVariables>(client, StepsGoalsBetweenDatesDocument, variables, headers),
      options
    );
export const UpdateDailyStepsGoalDocument = `
    mutation UpdateDailyStepsGoal($id: ID!, $input: DailyStepsGoalInput!) {
  updateDailyStepsGoal(id: $id, input: $input) {
    id
    note
    goal_start_date
    daily_goal_in_steps
    active
  }
}
    `;
export const useUpdateDailyStepsGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateDailyStepsGoalMutation, TError, UpdateDailyStepsGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateDailyStepsGoalMutation, TError, UpdateDailyStepsGoalMutationVariables, TContext>(
      ['UpdateDailyStepsGoal'],
      (variables?: UpdateDailyStepsGoalMutationVariables) => fetcher<UpdateDailyStepsGoalMutation, UpdateDailyStepsGoalMutationVariables>(client, UpdateDailyStepsGoalDocument, variables, headers)(),
      options
    );
export const CreateExerciseDocument = `
    mutation CreateExercise($input: ExerciseInput!) {
  createExercise(input: $input) {
    id
    name
    date_of_exercise
    minutes
    calories
    steps
    distance_in_miles
  }
}
    `;
export const useCreateExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateExerciseMutation, TError, CreateExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateExerciseMutation, TError, CreateExerciseMutationVariables, TContext>(
      ['CreateExercise'],
      (variables?: CreateExerciseMutationVariables) => fetcher<CreateExerciseMutation, CreateExerciseMutationVariables>(client, CreateExerciseDocument, variables, headers)(),
      options
    );
export const DeleteExerciseDocument = `
    mutation DeleteExercise($id: ID!) {
  deleteExercise(id: $id)
}
    `;
export const useDeleteExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>(
      ['DeleteExercise'],
      (variables?: DeleteExerciseMutationVariables) => fetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(client, DeleteExerciseDocument, variables, headers)(),
      options
    );
export const ExercisesDocument = `
    query Exercises($page: Int!) {
  exercises(page: $page) {
    data {
      id
      name
      date_of_exercise
      minutes
      calories
      steps
      distance_in_miles
    }
    paginatorInfo {
      currentPage
      lastPage
      hasMorePages
      total
    }
  }
}
    `;
export const useExercisesQuery = <
      TData = ExercisesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ExercisesQueryVariables,
      options?: UseQueryOptions<ExercisesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ExercisesQuery, TError, TData>(
      ['Exercises', variables],
      fetcher<ExercisesQuery, ExercisesQueryVariables>(client, ExercisesDocument, variables, headers),
      options
    );
export const ExercisesByDateDocument = `
    query ExercisesByDate($date_of_exercise: Date!) {
  exercisesByDate(date_of_exercise: $date_of_exercise) {
    id
    name
    date_of_exercise
    minutes
    calories
    steps
    distance_in_miles
  }
}
    `;
export const useExercisesByDateQuery = <
      TData = ExercisesByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ExercisesByDateQueryVariables,
      options?: UseQueryOptions<ExercisesByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ExercisesByDateQuery, TError, TData>(
      ['ExercisesByDate', variables],
      fetcher<ExercisesByDateQuery, ExercisesByDateQueryVariables>(client, ExercisesByDateDocument, variables, headers),
      options
    );
export const ExercisesBetweenDatesDocument = `
    query ExercisesBetweenDates($dateRange: DateRange!) {
  exercisesBetweenDates(date_of_exercise: $dateRange) {
    id
    name
    minutes
    date_of_exercise
    calories
  }
}
    `;
export const useExercisesBetweenDatesQuery = <
      TData = ExercisesBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ExercisesBetweenDatesQueryVariables,
      options?: UseQueryOptions<ExercisesBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ExercisesBetweenDatesQuery, TError, TData>(
      ['ExercisesBetweenDates', variables],
      fetcher<ExercisesBetweenDatesQuery, ExercisesBetweenDatesQueryVariables>(client, ExercisesBetweenDatesDocument, variables, headers),
      options
    );
export const UpdateExerciseDocument = `
    mutation UpdateExercise($id: ID!, $input: ExerciseInput!) {
  updateExercise(id: $id, input: $input) {
    id
    name
    date_of_exercise
    minutes
    calories
    steps
    distance_in_miles
  }
}
    `;
export const useUpdateExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateExerciseMutation, TError, UpdateExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateExerciseMutation, TError, UpdateExerciseMutationVariables, TContext>(
      ['UpdateExercise'],
      (variables?: UpdateExerciseMutationVariables) => fetcher<UpdateExerciseMutation, UpdateExerciseMutationVariables>(client, UpdateExerciseDocument, variables, headers)(),
      options
    );
export const GoalsAndSettingsDocument = `
    query GoalsAndSettings {
  me {
    id
    name
    email
    gender
    birthday
    height_in_inches
    user_weights {
      id
      weight_in_lbs
      date_of_weight
      note
    }
    weight_goals {
      id
      goal_start_date
      goal_in_lbs
      note
      goal_pace
      active
    }
    daily_steps_goals {
      id
      daily_goal_in_steps
      goal_start_date
      active
    }
    daily_distance_goals {
      id
      daily_goal_in_miles
      goal_start_date
      active
    }
  }
}
    `;
export const useGoalsAndSettingsQuery = <
      TData = GoalsAndSettingsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GoalsAndSettingsQueryVariables,
      options?: UseQueryOptions<GoalsAndSettingsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GoalsAndSettingsQuery, TError, TData>(
      variables === undefined ? ['GoalsAndSettings'] : ['GoalsAndSettings', variables],
      fetcher<GoalsAndSettingsQuery, GoalsAndSettingsQueryVariables>(client, GoalsAndSettingsDocument, variables, headers),
      options
    );
export const CreateMealDocument = `
    mutation CreateMeal($input: MealInput!) {
  createMeal(input: $input) {
    id
    name
    date_of_meal
    category
    calories
  }
}
    `;
export const useCreateMealMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMealMutation, TError, CreateMealMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMealMutation, TError, CreateMealMutationVariables, TContext>(
      ['CreateMeal'],
      (variables?: CreateMealMutationVariables) => fetcher<CreateMealMutation, CreateMealMutationVariables>(client, CreateMealDocument, variables, headers)(),
      options
    );
export const DeleteMealDocument = `
    mutation DeleteMeal($id: ID!) {
  deleteMeal(id: $id)
}
    `;
export const useDeleteMealMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMealMutation, TError, DeleteMealMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMealMutation, TError, DeleteMealMutationVariables, TContext>(
      ['DeleteMeal'],
      (variables?: DeleteMealMutationVariables) => fetcher<DeleteMealMutation, DeleteMealMutationVariables>(client, DeleteMealDocument, variables, headers)(),
      options
    );
export const MealsByDateDocument = `
    query MealsByDate($date_of_meal: Date!) {
  mealsByDate(date_of_meal: $date_of_meal) {
    id
    name
    date_of_meal
    category
    calories
  }
}
    `;
export const useMealsByDateQuery = <
      TData = MealsByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: MealsByDateQueryVariables,
      options?: UseQueryOptions<MealsByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MealsByDateQuery, TError, TData>(
      ['MealsByDate', variables],
      fetcher<MealsByDateQuery, MealsByDateQueryVariables>(client, MealsByDateDocument, variables, headers),
      options
    );
export const MealsBetweenDatesDocument = `
    query MealsBetweenDates($dateRange: DateRange!) {
  mealsBetweenDates(date_of_meal: $dateRange) {
    id
    name
    calories
    date_of_meal
    category
  }
}
    `;
export const useMealsBetweenDatesQuery = <
      TData = MealsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: MealsBetweenDatesQueryVariables,
      options?: UseQueryOptions<MealsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MealsBetweenDatesQuery, TError, TData>(
      ['MealsBetweenDates', variables],
      fetcher<MealsBetweenDatesQuery, MealsBetweenDatesQueryVariables>(client, MealsBetweenDatesDocument, variables, headers),
      options
    );
export const UpdateMealDocument = `
    mutation UpdateMeal($id: ID!, $input: MealInput!) {
  updateMeal(id: $id, input: $input) {
    id
    name
    date_of_meal
    category
    calories
  }
}
    `;
export const useUpdateMealMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateMealMutation, TError, UpdateMealMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateMealMutation, TError, UpdateMealMutationVariables, TContext>(
      ['UpdateMeal'],
      (variables?: UpdateMealMutationVariables) => fetcher<UpdateMealMutation, UpdateMealMutationVariables>(client, UpdateMealDocument, variables, headers)(),
      options
    );
export const CreateMoodDocument = `
    mutation CreateMood($input: MoodInput!) {
  createMood(input: $input) {
    id
    note
    date_of_mood
    meditated
    stress_level
    mood_type
  }
}
    `;
export const useCreateMoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMoodMutation, TError, CreateMoodMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMoodMutation, TError, CreateMoodMutationVariables, TContext>(
      ['CreateMood'],
      (variables?: CreateMoodMutationVariables) => fetcher<CreateMoodMutation, CreateMoodMutationVariables>(client, CreateMoodDocument, variables, headers)(),
      options
    );
export const DeleteMoodDocument = `
    mutation DeleteMood($id: ID!) {
  deleteMood(id: $id)
}
    `;
export const useDeleteMoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteMoodMutation, TError, DeleteMoodMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteMoodMutation, TError, DeleteMoodMutationVariables, TContext>(
      ['DeleteMood'],
      (variables?: DeleteMoodMutationVariables) => fetcher<DeleteMoodMutation, DeleteMoodMutationVariables>(client, DeleteMoodDocument, variables, headers)(),
      options
    );
export const MoodByDateDocument = `
    query MoodByDate($date_of_mood: Date!) {
  moodByDate(date_of_mood: $date_of_mood) {
    id
    note
    date_of_mood
    meditated
    stress_level
    mood_type
  }
}
    `;
export const useMoodByDateQuery = <
      TData = MoodByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: MoodByDateQueryVariables,
      options?: UseQueryOptions<MoodByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MoodByDateQuery, TError, TData>(
      ['MoodByDate', variables],
      fetcher<MoodByDateQuery, MoodByDateQueryVariables>(client, MoodByDateDocument, variables, headers),
      options
    );
export const MoodsBetweenDatesDocument = `
    query MoodsBetweenDates($dateRange: DateRange!) {
  moodsBetweenDates(date_of_mood: $dateRange) {
    id
    date_of_mood
    note
    meditated
    stress_level
    mood_type
  }
}
    `;
export const useMoodsBetweenDatesQuery = <
      TData = MoodsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: MoodsBetweenDatesQueryVariables,
      options?: UseQueryOptions<MoodsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MoodsBetweenDatesQuery, TError, TData>(
      ['MoodsBetweenDates', variables],
      fetcher<MoodsBetweenDatesQuery, MoodsBetweenDatesQueryVariables>(client, MoodsBetweenDatesDocument, variables, headers),
      options
    );
export const UpdateMoodDocument = `
    mutation UpdateMood($id: ID!, $input: MoodInput!) {
  updateMood(id: $id, input: $input) {
    id
    note
    date_of_mood
    meditated
    stress_level
    mood_type
  }
}
    `;
export const useUpdateMoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateMoodMutation, TError, UpdateMoodMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateMoodMutation, TError, UpdateMoodMutationVariables, TContext>(
      ['UpdateMood'],
      (variables?: UpdateMoodMutationVariables) => fetcher<UpdateMoodMutation, UpdateMoodMutationVariables>(client, UpdateMoodDocument, variables, headers)(),
      options
    );
export const CreatePopGoalDocument = `
    mutation CreatePopGoal($input: PopGoalInput!) {
  createPopGoal(input: $input) {
    id
    goal_amount
    goal_type
    date_of_goal
  }
}
    `;
export const useCreatePopGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePopGoalMutation, TError, CreatePopGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePopGoalMutation, TError, CreatePopGoalMutationVariables, TContext>(
      ['CreatePopGoal'],
      (variables?: CreatePopGoalMutationVariables) => fetcher<CreatePopGoalMutation, CreatePopGoalMutationVariables>(client, CreatePopGoalDocument, variables, headers)(),
      options
    );
export const CurrentPopGoalDocument = `
    query CurrentPopGoal {
  currentPopGoal {
    id
    date_of_goal
    goal_type
    goal_amount
  }
}
    `;
export const useCurrentPopGoalQuery = <
      TData = CurrentPopGoalQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentPopGoalQueryVariables,
      options?: UseQueryOptions<CurrentPopGoalQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentPopGoalQuery, TError, TData>(
      variables === undefined ? ['CurrentPopGoal'] : ['CurrentPopGoal', variables],
      fetcher<CurrentPopGoalQuery, CurrentPopGoalQueryVariables>(client, CurrentPopGoalDocument, variables, headers),
      options
    );
export const DeletePopGoalDocument = `
    mutation DeletePopGoal($id: ID!) {
  deletePopGoal(id: $id)
}
    `;
export const useDeletePopGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePopGoalMutation, TError, DeletePopGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePopGoalMutation, TError, DeletePopGoalMutationVariables, TContext>(
      ['DeletePopGoal'],
      (variables?: DeletePopGoalMutationVariables) => fetcher<DeletePopGoalMutation, DeletePopGoalMutationVariables>(client, DeletePopGoalDocument, variables, headers)(),
      options
    );
export const PopGoalsByDateDocument = `
    query PopGoalsByDate($date: Date!) {
  popGoalsByDate(date_of_goal: $date) {
    id
    goal_amount
    goal_type
    date_of_goal
  }
}
    `;
export const usePopGoalsByDateQuery = <
      TData = PopGoalsByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PopGoalsByDateQueryVariables,
      options?: UseQueryOptions<PopGoalsByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PopGoalsByDateQuery, TError, TData>(
      ['PopGoalsByDate', variables],
      fetcher<PopGoalsByDateQuery, PopGoalsByDateQueryVariables>(client, PopGoalsByDateDocument, variables, headers),
      options
    );
export const PopGoalsBetweenDatesDocument = `
    query PopGoalsBetweenDates($dateRange: DateRange!) {
  popGoalsBetweenDates(date_of_goal: $dateRange) {
    id
    date_of_goal
    goal_type
    goal_amount
  }
}
    `;
export const usePopGoalsBetweenDatesQuery = <
      TData = PopGoalsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PopGoalsBetweenDatesQueryVariables,
      options?: UseQueryOptions<PopGoalsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PopGoalsBetweenDatesQuery, TError, TData>(
      ['PopGoalsBetweenDates', variables],
      fetcher<PopGoalsBetweenDatesQuery, PopGoalsBetweenDatesQueryVariables>(client, PopGoalsBetweenDatesDocument, variables, headers),
      options
    );
export const CreateSleepHabitDocument = `
    mutation CreateSleepHabit($input: SleepHabitInput!) {
  createSleepHabit(input: $input) {
    id
    quality
    amount
    date_of_sleep
    note
  }
}
    `;
export const useCreateSleepHabitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateSleepHabitMutation, TError, CreateSleepHabitMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateSleepHabitMutation, TError, CreateSleepHabitMutationVariables, TContext>(
      ['CreateSleepHabit'],
      (variables?: CreateSleepHabitMutationVariables) => fetcher<CreateSleepHabitMutation, CreateSleepHabitMutationVariables>(client, CreateSleepHabitDocument, variables, headers)(),
      options
    );
export const DeleteSleepHabitDocument = `
    mutation DeleteSleepHabit($id: ID!) {
  deleteSleepHabit(id: $id)
}
    `;
export const useDeleteSleepHabitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteSleepHabitMutation, TError, DeleteSleepHabitMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteSleepHabitMutation, TError, DeleteSleepHabitMutationVariables, TContext>(
      ['DeleteSleepHabit'],
      (variables?: DeleteSleepHabitMutationVariables) => fetcher<DeleteSleepHabitMutation, DeleteSleepHabitMutationVariables>(client, DeleteSleepHabitDocument, variables, headers)(),
      options
    );
export const SleepHabitsByDateDocument = `
    query SleepHabitsByDate($date_of_sleep: Date!) {
  sleepHabitsByDate(date_of_sleep: $date_of_sleep) {
    id
    quality
    amount
    date_of_sleep
    note
  }
}
    `;
export const useSleepHabitsByDateQuery = <
      TData = SleepHabitsByDateQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SleepHabitsByDateQueryVariables,
      options?: UseQueryOptions<SleepHabitsByDateQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SleepHabitsByDateQuery, TError, TData>(
      ['SleepHabitsByDate', variables],
      fetcher<SleepHabitsByDateQuery, SleepHabitsByDateQueryVariables>(client, SleepHabitsByDateDocument, variables, headers),
      options
    );
export const SleepHabitsBetweenDatesDocument = `
    query SleepHabitsBetweenDates($dateRange: DateRange!) {
  sleepHabitsBetweenDates(date_of_sleep: $dateRange) {
    id
    date_of_sleep
    quality
    amount
    note
  }
}
    `;
export const useSleepHabitsBetweenDatesQuery = <
      TData = SleepHabitsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SleepHabitsBetweenDatesQueryVariables,
      options?: UseQueryOptions<SleepHabitsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SleepHabitsBetweenDatesQuery, TError, TData>(
      ['SleepHabitsBetweenDates', variables],
      fetcher<SleepHabitsBetweenDatesQuery, SleepHabitsBetweenDatesQueryVariables>(client, SleepHabitsBetweenDatesDocument, variables, headers),
      options
    );
export const UpdateSleepHabitDocument = `
    mutation UpdateSleepHabit($id: ID!, $input: SleepHabitInput!) {
  updateSleepHabit(id: $id, input: $input) {
    id
    quality
    amount
    date_of_sleep
    note
  }
}
    `;
export const useUpdateSleepHabitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateSleepHabitMutation, TError, UpdateSleepHabitMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateSleepHabitMutation, TError, UpdateSleepHabitMutationVariables, TContext>(
      ['UpdateSleepHabit'],
      (variables?: UpdateSleepHabitMutationVariables) => fetcher<UpdateSleepHabitMutation, UpdateSleepHabitMutationVariables>(client, UpdateSleepHabitDocument, variables, headers)(),
      options
    );
export const DeleteUserDocument = `
    mutation DeleteUser {
  deleteUser {
    id
    name
    email
    gender
    birthday
    height_in_inches
  }
}
    `;
export const useDeleteUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteUserMutation, TError, DeleteUserMutationVariables, TContext>(
      ['DeleteUser'],
      (variables?: DeleteUserMutationVariables) => fetcher<DeleteUserMutation, DeleteUserMutationVariables>(client, DeleteUserDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    id
    name
    email
    gender
    birthday
    height_in_inches
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const RegisterDocument = `
    mutation Register($name: String!, $email: String!, $password: String!, $gender: GENDER!, $birthday: Date!, $height_in_inches: Int!) {
  createUser(
    name: $name
    email: $email
    password: $password
    gender: $gender
    birthday: $birthday
    height_in_inches: $height_in_inches
  ) {
    id
    name
    email
    gender
    birthday
    height_in_inches
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      ['Register'],
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($name: String!, $email: String!, $gender: GENDER!, $birthday: Date!, $height_in_inches: Int!) {
  updateUser(
    name: $name
    email: $email
    gender: $gender
    birthday: $birthday
    height_in_inches: $height_in_inches
  ) {
    id
    name
    email
    gender
    birthday
    height_in_inches
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
export const CurrentUserWeightDocument = `
    query CurrentUserWeight {
  currentUserWeight {
    id
    weight_in_lbs
    date_of_weight
    note
  }
}
    `;
export const useCurrentUserWeightQuery = <
      TData = CurrentUserWeightQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentUserWeightQueryVariables,
      options?: UseQueryOptions<CurrentUserWeightQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentUserWeightQuery, TError, TData>(
      variables === undefined ? ['CurrentUserWeight'] : ['CurrentUserWeight', variables],
      fetcher<CurrentUserWeightQuery, CurrentUserWeightQueryVariables>(client, CurrentUserWeightDocument, variables, headers),
      options
    );
export const DeleteUserWeightDocument = `
    mutation DeleteUserWeight($id: ID!) {
  deleteUserWeight(id: $id)
}
    `;
export const useDeleteUserWeightMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteUserWeightMutation, TError, DeleteUserWeightMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteUserWeightMutation, TError, DeleteUserWeightMutationVariables, TContext>(
      ['DeleteUserWeight'],
      (variables?: DeleteUserWeightMutationVariables) => fetcher<DeleteUserWeightMutation, DeleteUserWeightMutationVariables>(client, DeleteUserWeightDocument, variables, headers)(),
      options
    );
export const SetUserWeightDocument = `
    mutation SetUserWeight($input: UserWeightInput!) {
  setUserWeight(input: $input) {
    id
    weight_in_lbs
    date_of_weight
    note
  }
}
    `;
export const useSetUserWeightMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetUserWeightMutation, TError, SetUserWeightMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetUserWeightMutation, TError, SetUserWeightMutationVariables, TContext>(
      ['SetUserWeight'],
      (variables?: SetUserWeightMutationVariables) => fetcher<SetUserWeightMutation, SetUserWeightMutationVariables>(client, SetUserWeightDocument, variables, headers)(),
      options
    );
export const UpdateUserWeightDocument = `
    mutation UpdateUserWeight($id: ID!, $input: UserWeightInput!) {
  updateUserWeight(id: $id, input: $input) {
    id
    weight_in_lbs
    date_of_weight
    note
  }
}
    `;
export const useUpdateUserWeightMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserWeightMutation, TError, UpdateUserWeightMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserWeightMutation, TError, UpdateUserWeightMutationVariables, TContext>(
      ['UpdateUserWeight'],
      (variables?: UpdateUserWeightMutationVariables) => fetcher<UpdateUserWeightMutation, UpdateUserWeightMutationVariables>(client, UpdateUserWeightDocument, variables, headers)(),
      options
    );
export const WeightsBetweenDatesDocument = `
    query WeightsBetweenDates($dateRange: DateRange!) {
  weightBetweenDates(date_of_weight: $dateRange) {
    id
    date_of_weight
    weight_in_lbs
    note
  }
}
    `;
export const useWeightsBetweenDatesQuery = <
      TData = WeightsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: WeightsBetweenDatesQueryVariables,
      options?: UseQueryOptions<WeightsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WeightsBetweenDatesQuery, TError, TData>(
      ['WeightsBetweenDates', variables],
      fetcher<WeightsBetweenDatesQuery, WeightsBetweenDatesQueryVariables>(client, WeightsBetweenDatesDocument, variables, headers),
      options
    );
export const WeightHistoryDocument = `
    query WeightHistory {
  weight_history {
    id
    weight_in_lbs
    date_of_weight
    note
  }
}
    `;
export const useWeightHistoryQuery = <
      TData = WeightHistoryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: WeightHistoryQueryVariables,
      options?: UseQueryOptions<WeightHistoryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WeightHistoryQuery, TError, TData>(
      variables === undefined ? ['WeightHistory'] : ['WeightHistory', variables],
      fetcher<WeightHistoryQuery, WeightHistoryQueryVariables>(client, WeightHistoryDocument, variables, headers),
      options
    );
export const CurrentWeightGoalDocument = `
    query CurrentWeightGoal {
  currentWeightGoal {
    id
    goal_start_date
    goal_in_lbs
    note
    active
    goal_pace
  }
}
    `;
export const useCurrentWeightGoalQuery = <
      TData = CurrentWeightGoalQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CurrentWeightGoalQueryVariables,
      options?: UseQueryOptions<CurrentWeightGoalQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CurrentWeightGoalQuery, TError, TData>(
      variables === undefined ? ['CurrentWeightGoal'] : ['CurrentWeightGoal', variables],
      fetcher<CurrentWeightGoalQuery, CurrentWeightGoalQueryVariables>(client, CurrentWeightGoalDocument, variables, headers),
      options
    );
export const DeleteWeightGoalDocument = `
    mutation DeleteWeightGoal($id: ID!) {
  deleteWeightGoal(id: $id)
}
    `;
export const useDeleteWeightGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteWeightGoalMutation, TError, DeleteWeightGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteWeightGoalMutation, TError, DeleteWeightGoalMutationVariables, TContext>(
      ['DeleteWeightGoal'],
      (variables?: DeleteWeightGoalMutationVariables) => fetcher<DeleteWeightGoalMutation, DeleteWeightGoalMutationVariables>(client, DeleteWeightGoalDocument, variables, headers)(),
      options
    );
export const SetWeightGoalDocument = `
    mutation SetWeightGoal($input: WeightGoalInput!) {
  setWeightGoal(input: $input) {
    id
    goal_start_date
    goal_in_lbs
    note
    active
    goal_pace
  }
}
    `;
export const useSetWeightGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SetWeightGoalMutation, TError, SetWeightGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SetWeightGoalMutation, TError, SetWeightGoalMutationVariables, TContext>(
      ['SetWeightGoal'],
      (variables?: SetWeightGoalMutationVariables) => fetcher<SetWeightGoalMutation, SetWeightGoalMutationVariables>(client, SetWeightGoalDocument, variables, headers)(),
      options
    );
export const UpdateWeightGoalDocument = `
    mutation UpdateWeightGoal($id: ID!, $input: WeightGoalInput!) {
  updateWeightGoal(id: $id, input: $input) {
    id
    goal_start_date
    goal_in_lbs
    note
    active
    goal_pace
  }
}
    `;
export const useUpdateWeightGoalMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateWeightGoalMutation, TError, UpdateWeightGoalMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateWeightGoalMutation, TError, UpdateWeightGoalMutationVariables, TContext>(
      ['UpdateWeightGoal'],
      (variables?: UpdateWeightGoalMutationVariables) => fetcher<UpdateWeightGoalMutation, UpdateWeightGoalMutationVariables>(client, UpdateWeightGoalDocument, variables, headers)(),
      options
    );
export const WeightGoalsDocument = `
    query WeightGoals {
  weight_goals {
    id
    goal_start_date
    goal_in_lbs
    note
    active
    goal_pace
  }
}
    `;
export const useWeightGoalsQuery = <
      TData = WeightGoalsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: WeightGoalsQueryVariables,
      options?: UseQueryOptions<WeightGoalsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WeightGoalsQuery, TError, TData>(
      variables === undefined ? ['WeightGoals'] : ['WeightGoals', variables],
      fetcher<WeightGoalsQuery, WeightGoalsQueryVariables>(client, WeightGoalsDocument, variables, headers),
      options
    );
export const WeightGoalsBetweenDatesDocument = `
    query WeightGoalsBetweenDates($dateRange: DateRange!) {
  weightGoalsBetweenDates(goal_start_date: $dateRange) {
    id
    goal_in_lbs
    goal_start_date
    note
    active
    goal_pace
  }
}
    `;
export const useWeightGoalsBetweenDatesQuery = <
      TData = WeightGoalsBetweenDatesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: WeightGoalsBetweenDatesQueryVariables,
      options?: UseQueryOptions<WeightGoalsBetweenDatesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<WeightGoalsBetweenDatesQuery, TError, TData>(
      ['WeightGoalsBetweenDates', variables],
      fetcher<WeightGoalsBetweenDatesQuery, WeightGoalsBetweenDatesQueryVariables>(client, WeightGoalsBetweenDatesDocument, variables, headers),
      options
    );
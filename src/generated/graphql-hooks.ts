import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
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

/** A paginated list of DailyDistanceGoal items. */
export type DailyDistanceGoalPaginator = {
  __typename?: 'DailyDistanceGoalPaginator';
  /** A list of DailyDistanceGoal items. */
  data: Array<DailyDistanceGoal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
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

/** A paginated list of DailyStepsGoal items. */
export type DailyStepsGoalPaginator = {
  __typename?: 'DailyStepsGoalPaginator';
  /** A list of DailyStepsGoal items. */
  data: Array<DailyStepsGoal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
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
  minutes: Scalars['Int'];
  name: Scalars['String'];
};

/** A paginated list of Exercise items. */
export type ExercisePaginator = {
  __typename?: 'ExercisePaginator';
  /** A list of Exercise items. */
  data: Array<Exercise>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum Goal_Type {
  Calroies = 'CALROIES',
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
  daily_calorie_goal: Scalars['Int'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  weight_in_lbs: Scalars['Int'];
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


export type MutationDeleteUserArgs = {
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
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
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
  daily_distance_goals?: Maybe<DailyDistanceGoalPaginator>;
  daily_steps_goals?: Maybe<DailyStepsGoalPaginator>;
  exercises?: Maybe<ExercisePaginator>;
  me: User;
  meals?: Maybe<MealPaginator>;
  moods?: Maybe<MoodPaginator>;
  pop_goals?: Maybe<PopGoalPaginator>;
  sleepHabits?: Maybe<SleepHabitPaginator>;
  user?: Maybe<User>;
  users?: Maybe<UserPaginator>;
  weight_goals?: Maybe<WeightGoalPaginator>;
  weight_history?: Maybe<UserWeightPaginator>;
};


export type QueryDaily_Distance_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryDaily_Steps_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryExercisesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryMealsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryMoodsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryPop_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QuerySleepHabitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
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


export type QueryWeight_GoalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryWeight_HistoryArgs = {
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
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
  created_at: Scalars['DateTime'];
  daily_distance_goals: Array<DailyDistanceGoal>;
  daily_steps_goals: Array<DailyStepsGoal>;
  email: Scalars['String'];
  email_verified_at?: Maybe<Scalars['DateTime']>;
  exercises: Array<Exercise>;
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

/** A paginated list of UserWeight items. */
export type UserWeightPaginator = {
  __typename?: 'UserWeightPaginator';
  /** A list of UserWeight items. */
  data: Array<UserWeight>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type WeightGoal = {
  __typename?: 'WeightGoal';
  active: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  goal_in_lbs: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
  user_id: Scalars['Int'];
};

export type WeightGoalInput = {
  active: Scalars['Boolean'];
  goal_in_lbs: Scalars['Int'];
  goal_start_date: Scalars['Date'];
  note?: InputMaybe<Scalars['String']>;
};

/** A paginated list of WeightGoal items. */
export type WeightGoalPaginator = {
  __typename?: 'WeightGoalPaginator';
  /** A list of WeightGoal items. */
  data: Array<WeightGoal>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', name: string, id: string, email: string, exercises: Array<{ __typename?: 'Exercise', name: string, id: string }> } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', name: string, email: string, id: string, weight_goals: Array<{ __typename?: 'WeightGoal', id: string }>, user_weights: Array<{ __typename?: 'UserWeight', id: string }>, daily_steps_goals: Array<{ __typename?: 'DailyStepsGoal', id: string }>, daily_distance_goals: Array<{ __typename?: 'DailyDistanceGoal', id: string }>, pop_goals: Array<{ __typename?: 'PopGoal', id: string }> } | null };


export const MeDocument = `
    query Me {
  me {
    name
    id
    email
    exercises {
      name
      id
    }
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
export const UserDocument = `
    query User {
  user(id: 1) {
    name
    email
    id
    weight_goals {
      id
    }
    user_weights {
      id
    }
    daily_steps_goals {
      id
    }
    daily_distance_goals {
      id
    }
    pop_goals {
      id
    }
  }
}
    `;
export const useUserQuery = <
      TData = UserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserQueryVariables,
      options?: UseQueryOptions<UserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserQuery, TError, TData>(
      variables === undefined ? ['User'] : ['User', variables],
      fetcher<UserQuery, UserQueryVariables>(client, UserDocument, variables, headers),
      options
    );
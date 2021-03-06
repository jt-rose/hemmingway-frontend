import { UserWeight, WeightGoal } from "src/generated/graphql-hooks";
import { SimpleExercise, SimpleMeal } from "types/propTypes";
import { calculateBMR, SimpleUser } from "./BMR";

export const getDailyCalories = (
  meals: SimpleMeal[],
  exercise: SimpleExercise[]
) => {
  const totalCalFromMeal = meals.reduce(
    (prev, curr) => prev + curr.calories,
    0
  );
  const totalCalBurned = exercise.reduce(
    (prev, curr) => prev + curr.calories,
    0
  );

  return { totalCalFromMeal, totalCalBurned };
};

export const getCalorieTotal = (
  bmr: number,
  calories: ReturnType<typeof getDailyCalories>
) => {
  return calories.totalCalFromMeal - (bmr + calories.totalCalBurned);
};

export const getDailyCalorieTarget = (
  userWeight: Omit<UserWeight, "created_at" | "updated_at" | "user_id">,
  weightGoal: Omit<WeightGoal, "created_at" | "updated_at" | "user_id">
) => {
  // if goal is met, return maintenance calorie target
  if (userWeight.weight_in_lbs === weightGoal.goal_in_lbs) {
    return 0;
  }

  // add enums to weightGoal later
  let target = weightGoal.goal_pace;
  // if user weight is over goal, calculate how much to skim
  if (userWeight.weight_in_lbs > weightGoal.goal_in_lbs) {
    switch (target) {
      case "STRONG":
        return -400;
      case "MODERATE":
        return -300;
      default: // used for mild and catchall
        return -200;
    }
  }

  // if user weight is over goal, calculate how much to bulk
  if (userWeight.weight_in_lbs < weightGoal.goal_in_lbs) {
    switch (target) {
      case "STRONG":
        return 400;
      case "MODERATE":
        return 300;
      default: // used for mild and catchall
        return 200;
    }
  }

  // shouldn't be used, but placed as a failsafe
  return 0;
};

export const associateCaloriesByDates = (
  user: SimpleUser,
  weightHistory: Omit<UserWeight, "created_at" | "updated_at" | "user_id">[],
  meals: SimpleMeal[],
  exercise: SimpleExercise[]
) => {
  let sortedWeightHistory = weightHistory.sort(
    (a, b) => a.date_of_weight - b.date_of_weight
  );
  // double check
  const sortedExercise = exercise.map((x) => x.date_of_exercise).sort();

  const sortedMeals = meals.map((x) => x.date_of_meal).sort();

  const earliestDate = [
    sortedWeightHistory[0].date_of_weight,
    ...sortedExercise,
    ...sortedMeals,
  ].sort()[0];

  sortedWeightHistory[0].date_of_weight = earliestDate;

  let history = sortedWeightHistory.map((wh) => ({
    weight: wh,
    bmr: calculateBMR(user, wh.weight_in_lbs),
    meals: [] as SimpleMeal[],
    exercise: [] as SimpleExercise[],
    dates: [] as string[],
    dateCalorieTotals: [] as {
      bmr: number;
      totalCalBurned: number;
      totalCalFromMeal: number;
      total: number;
      date: string;
    }[],
  }));

  history.forEach((wh, i) => {
    const lastItem = history.length === i + 1;
    wh.meals = meals.filter(
      (meal) =>
        meal.date_of_meal >= wh.weight.date_of_weight &&
        (lastItem || meal.date_of_meal < history[i + 1].weight.date_of_weight)
    );
    wh.exercise = exercise.filter(
      (ex) =>
        ex.date_of_exercise >= wh.weight.date_of_weight &&
        (lastItem || ex.date_of_exercise < history[i + 1].weight.date_of_weight)
    );
  });

  history = history.map((wh) => ({
    ...wh,
    dates: [
      ...new Set([
        ...wh.meals.map((m) => m.date_of_meal),
        ...wh.exercise.map((ex) => ex.date_of_exercise),
      ]),
    ],
  }));

  history.forEach((wh) =>
    wh.dates.forEach((date) => {
      const mealsFromThisDate = wh.meals.filter(
        (meal) => meal.date_of_meal === date
      );
      const exercisesFromThisDate = wh.exercise.filter(
        (ex) => ex.date_of_exercise === date
      );
      const { totalCalBurned, totalCalFromMeal } = getDailyCalories(
        mealsFromThisDate,
        exercisesFromThisDate
      );
      const total = getCalorieTotal(wh.bmr, {
        totalCalFromMeal,
        totalCalBurned,
      });
      wh.dateCalorieTotals.push({
        bmr: wh.bmr,
        totalCalBurned,
        totalCalFromMeal,
        total,
        date,
      });
    })
  );

  return history;
};

import { Layout } from "components/Layout";
import { PropTypesWithRefresh } from "types/propTypes";
import dayjs from "dayjs";
import { Exercise } from "../components/exercise/Exercise";
import { Meals } from "components/meals/Meals";
import { Mood } from "components/mood/Mood";
import { SleepHabit } from "components/sleepHabits/SleepHabit";
import {
  //useCurrentGoalsQuery,
  useGoalsAndSettingsQuery,
  useExercisesByDateQuery,
  useMealsByDateQuery,
  useMoodByDateQuery,
  useSleepHabitsByDateQuery,
} from "src/generated/graphql-hooks";
import { calculateBMR } from "utils/BMR";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { getDailyCalorieTarget } from "utils/getDailyCalories";
import { LoaderStack } from "components/Loader";
import { ProgressBar } from "components/charts/ProgressBar";

const Home = (props: PropTypesWithRefresh) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const isToday = date === dayjs().format("YYYY-MM-DD");
  const increaseDate = () =>
    setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"));
  const decreaseDate = () =>
    setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));

  const currentSettings = useGoalsAndSettingsQuery(props.gqlClient);

  console.log(
    "current distance goal: ",
    currentSettings.data?.me.daily_distance_goals
  );
  console.log(
    "current steps goal: ",
    currentSettings.data?.me.daily_steps_goals
  );
  console.log("current Weight goal: ", currentSettings.data?.me.weight_goals);
  console.log("current user weight: ", currentSettings.data?.me.user_weights);
  console.log("me: ", currentSettings.data?.me);

  const mood = useMoodByDateQuery(props.gqlClient, {
    date_of_mood: date,
  });
  const meals = useMealsByDateQuery(props.gqlClient, {
    date_of_meal: date,
  });
  const exercise = useExercisesByDateQuery(props.gqlClient, {
    date_of_exercise: date,
  });
  const sleepHabit = useSleepHabitsByDateQuery(props.gqlClient, {
    date_of_sleep: date,
  });

  console.log(
    date,
    "meals",
    meals.data?.mealsByDate.reduce((a, b) => a + b.calories, 0)
  );
  console.log(
    date,
    "exercise",
    exercise.data?.exercisesByDate.reduce((a, b) => a + b.calories, 0)
  );
  console.log(date, "moods", mood);
  console.log(date, "sleepHabit", sleepHabit);

  // const hasError = false
  // const isLoading =
  if (
    currentSettings.error ||
    exercise.error ||
    meals.error ||
    mood.error ||
    sleepHabit.error
  ) {
    // add later
    return <p>Uh Oh! Error!</p>;
  }

  if (
    currentSettings.data &&
    exercise.data &&
    meals.data &&
    mood.data &&
    sleepHabit.data
  ) {
    const me = currentSettings.data.me;
    const {
      user_weights,
      weight_goals,
      daily_distance_goals,
      daily_steps_goals /** currentPopGoal */,
    } = me;

    if (!user_weights.length) {
      // redirect to enter weight?
      return <p>something...</p>;
    }
    // ! GET CURRENT WEIGHT, GOAL, DISTANCE AND STEPS
    // what if none? - handle earlier with redirect
    const sortedUserWeights = user_weights
      .filter((w) => w.date_of_weight <= date)
      .sort(
        (a, b) =>
          (new Date(b.date_of_weight) as any) -
          (new Date(a.date_of_weight) as any)
      );

    const currentUserWeight = sortedUserWeights.length
      ? sortedUserWeights[0]
      : user_weights.sort(
          (a, b) =>
            (new Date(b.date_of_weight) as any) -
            (new Date(a.date_of_weight) as any)
        )[0];

    const sortedWeightGoals = weight_goals
      .filter((w) => w.goal_start_date <= date)
      .sort(
        (a, b) =>
          (new Date(b.goal_start_date) as any) -
          (new Date(a.goal_start_date) as any)
      );

    const currentWeightGoal = sortedWeightGoals.length
      ? sortedWeightGoals[0]
      : null;

    const sortedDistanceGoals = daily_distance_goals
      .filter((w) => w.goal_start_date <= date)
      .sort(
        (a, b) =>
          (new Date(b.goal_start_date) as any) -
          (new Date(a.goal_start_date) as any)
      );

    const currentDistanceGoal = sortedDistanceGoals.length
      ? sortedDistanceGoals[0]
      : null;

    const sortedStepsGoals = daily_steps_goals
      .filter((w) => w.goal_start_date <= date)
      .sort(
        (a, b) =>
          (new Date(b.goal_start_date) as any) -
          (new Date(a.goal_start_date) as any)
      );

    const currentStepsGoal = sortedStepsGoals.length
      ? sortedStepsGoals[0]
      : null;

    const bmr = calculateBMR(me, currentUserWeight.weight_in_lbs);
    console.log("my bmr is " + bmr);

    let target = 0;
    if (currentWeightGoal) {
      target = getDailyCalorieTarget(currentUserWeight, currentWeightGoal);
    }

    const caloriesConsumed = meals.data.mealsByDate.reduce(
      (a, b) => a + b.calories,
      0
    );

    const caloriesBurned = exercise.data.exercisesByDate.reduce(
      (a, b) => a + b.calories,
      0
    );

    const adjustedTarget = bmr + caloriesBurned + target;

    const currentDistance = exercise.data.exercisesByDate.reduce(
      (a, b) => (b.distance_in_miles ? a + b.distance_in_miles : a),
      0
    );

    const currentSteps = exercise.data.exercisesByDate.reduce(
      (a, b) => (b.steps ? a + b.steps : a),
      0
    );

    return (
      <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
        <div className="flex w-full justify-around my-8">
          <ChevronDoubleLeftIcon
            className="ht-12 w-8 hover:cursor-pointer"
            onClick={decreaseDate}
          />
          <p className="text-2xl">{dayjs(date).format("MMM / D / YYYY")}</p>
          <ChevronDoubleRightIcon
            className={`ht-12 w-8 ${
              isToday ? "opacity-0" : "hover:cursor-pointer"
            }`}
            onClick={isToday ? () => {} : increaseDate}
          />
        </div>

        <p>My BMR is {bmr}</p>
        <p>My target is {target}</p>
        <p>Aiming for {bmr + target}, but can boost this with exercise</p>
        <p>So far have gained {caloriesConsumed} calories through meals</p>
        <p>So far, have burned {caloriesBurned} calories through exercise</p>
        <p>
          Adjusted target is {adjustedTarget} of which {caloriesConsumed} have
          already been taken
        </p>
        <ProgressBar
          percentage={
            (currentDistanceGoal
              ? (currentDistance / currentDistanceGoal.daily_goal_in_miles) *
                100
              : (currentDistance / 5) * 100) > 100
              ? 100
              : currentDistanceGoal
              ? (currentDistance / currentDistanceGoal.daily_goal_in_miles) *
                100
              : (currentDistance / 5) * 100
          }
          label={`${currentDistance} / ${
            currentDistanceGoal ? currentDistanceGoal.daily_goal_in_miles : "5"
          }`}
          title={"Miles"}
        />

        <ProgressBar
          percentage={
            (currentStepsGoal
              ? (currentSteps / currentStepsGoal.daily_goal_in_steps) * 100
              : (currentSteps / 10000) * 100) > 100
              ? 100
              : currentStepsGoal
              ? (currentSteps / currentStepsGoal.daily_goal_in_steps) * 100
              : (currentSteps / 10000) * 100
          }
          label={`${currentSteps} / ${
            currentStepsGoal ? currentStepsGoal.daily_goal_in_steps : "10000"
          }`}
          title={"Steps"}
        />
        {/* <p>
          Current: {meals.data?.mealsByDate.reduce((a, b) => a + b.calories, 0)}{" "}
          out of{" "}
          {bmr +
            exercise.data?.exercisesByDate.reduce(
              (a, b) => a + b.calories,
              0
            )}{" "}
          calories
        </p>
        <p>
          Over by{" "}
          {meals.data?.mealsByDate.reduce((a, b) => a + b.calories, 0) -
            (bmr +
              exercise.data?.exercisesByDate.reduce((a, b) => a + b.calories, 0))}
        </p>
        <p>Current daily goal: {target} </p>
        <div className="max-w-xs">
          <Pie
            data={[
              {
                title: "cal burned",
                value:
                  bmr +
                  exercise.data?.exercisesByDate.reduce(
                    (a, b) => a + b.calories,
                    0
                  ) -
                  meals.data?.mealsByDate.reduce((a, b) => a + b.calories, 0),
                color: "#E38627",
              },
              {
                title: "cal ate",
                value: meals.data?.mealsByDate.reduce(
                  (a, b) => a + b.calories,
                  0
                ),
                color: "#C13C37",
              },
            ]}
          />
        </div> */}
        <Exercise gqlClient={props.gqlClient} date={date} />
        <Meals gqlClient={props.gqlClient} date={date} />
        <Mood gqlClient={props.gqlClient} date={date} />
        <SleepHabit gqlClient={props.gqlClient} date={date} />
      </Layout>
    );
  }
  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      <LoaderStack />
    </Layout>
  );
};

export default Home;

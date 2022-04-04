import { Layout } from "components/Layout";
import { PropTypesWithRefresh } from "types/propTypes";
import dayjs from "dayjs";
import { Exercise } from "../components/exercise/Exercise";
import { Meals } from "components/meals/Meals";
import { Mood } from "components/mood/Mood";
import { SleepHabit } from "components/sleepHabits/SleepHabit";
import {
  useCurrentGoalsQuery,
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

  const currentGoals = useCurrentGoalsQuery(props.gqlClient);

  console.log(
    "current distance goal: ",
    currentGoals.data?.currentDistanceGoal
  );
  console.log("current steps goal: ", currentGoals.data?.currentStepsGoal);
  console.log("current Weight goal: ", currentGoals.data?.currentWeightGoal);
  console.log("current pop goal: ", currentGoals.data?.currentPopGoal);
  console.log("current user weight: ", currentGoals.data?.currentUserWeight);
  console.log("me: ", currentGoals.data?.me);

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
    currentGoals.error ||
    exercise.error ||
    meals.error ||
    mood.error ||
    sleepHabit.error
  ) {
    // add later
    return <p>Uh Oh! Error!</p>;
  }

  if (
    currentGoals.data &&
    exercise.data &&
    meals.data &&
    mood.data &&
    sleepHabit.data
  ) {
    const {
      me,
      currentUserWeight,
      currentWeightGoal,
      currentDistanceGoal,
      currentStepsGoal /** currentPopGoal */,
    } = currentGoals.data;

    if (!currentUserWeight) {
      // redirect to enter weight?
      return <p>something...</p>;
    }

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

    return (
      <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
        <h1>Home</h1>
        <div className="flex w-full justify-around my-8">
          <ChevronDoubleLeftIcon
            className="ht-12 w-8 hover:cursor-pointer"
            onClick={decreaseDate}
          />
          <p>Date: {date}</p>
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
          Adjusted target is {bmr + caloriesBurned + target} of which{" "}
          {caloriesConsumed} have already been taken
        </p>
        {currentDistanceGoal && (
          <p>
            My distance goal is {currentDistanceGoal.daily_goal_in_miles} miles
            per day
          </p>
        )}
        <p>
          I have currently travelled{" "}
          {exercise.data.exercisesByDate.reduce(
            (a, b) => (b.distance_in_miles ? a + b.distance_in_miles : a),
            0
          )}{" "}
          miles today
        </p>
        {currentStepsGoal && (
          <p>
            My steps goal is {currentStepsGoal.daily_goal_in_steps} steps per
            day
          </p>
        )}
        <p>
          I have currently walked{" "}
          {exercise.data.exercisesByDate.reduce(
            (a, b) => (b.steps ? a + b.steps : a),
            0
          )}{" "}
          steps today
        </p>
        <ProgressBar percentage={80} label={"8450 / 10000"} title={"Steps"} />
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

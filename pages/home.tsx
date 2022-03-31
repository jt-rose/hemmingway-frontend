import { Layout } from "components/Layout";
import { PropTypes } from "types/propTypes";
import dayjs from "dayjs";
import { Exercise } from "../components/exercise/Exercise";
import { Meals } from "components/meals/Meals";
import { Mood } from "components/mood/Mood";
import { SleepHabit } from "components/sleepHabits/SleepHabit";
import {
  useCurrentDistanceGoalQuery,
  useCurrentPopGoalQuery,
  useCurrentStepsGoalQuery,
  useCurrentUserWeightQuery,
  useCurrentWeightGoalQuery,
  useExercisesByDateQuery,
  useMealsByDateQuery,
  useMeQuery,
  useMoodByDateQuery,
  useSleepHabitsByDateQuery,
} from "src/generated/graphql-hooks";
import { calculateBMR } from "utils/BMR";
import { getDailyCalorieTarget } from "utils/getDailyCalories";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import { Pie } from "components/Pie";

const Home = (props: PropTypes) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const increaseDate = () =>
    setDate(dayjs(date).add(1, "day").format("YYYY-MM-DD"));
  const decreaseDate = () =>
    setDate(dayjs(date).subtract(1, "day").format("YYYY-MM-DD"));

  const me = useMeQuery(props.gqlClient);
  const currentDistanceGoal = useCurrentDistanceGoalQuery(props.gqlClient);
  const currentStepsGoal = useCurrentStepsGoalQuery(props.gqlClient);
  const currentWeightGoal = useCurrentWeightGoalQuery(props.gqlClient);
  const currentPopGoal = useCurrentPopGoalQuery(props.gqlClient);
  const currentUserWeight = useCurrentUserWeightQuery(props.gqlClient);

  console.log("current distance goal: ", currentDistanceGoal.data);
  console.log("current steps goal: ", currentStepsGoal.data);
  console.log("current Weight goal: ", currentWeightGoal.data);
  console.log("current pop goal: ", currentPopGoal.data);
  console.log("current user weight: ", currentUserWeight.data);

  let bmr = 0;
  if (
    me.data &&
    currentUserWeight.data &&
    currentUserWeight.data.currentUserWeight
  ) {
    bmr = calculateBMR(
      me.data.me,
      currentUserWeight.data.currentUserWeight.weight_in_lbs
    );
    console.log("my bmr is " + bmr);
  }

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

  const target = getDailyCalorieTarget(
    currentUserWeight.data?.currentUserWeight?.weight_in_lbs,
    currentWeightGoal.data?.currentWeightGoal?.goal_in_lbs
  );

  return (
    <Layout>
      <h1>Home</h1>
      <div className="flex w-full justify-around my-8">
        <ChevronDoubleLeftIcon className="ht-12 w-8" onClick={decreaseDate} />
        <p>Date: {date}</p>
        <ChevronDoubleRightIcon className="ht-12 w-8" onClick={increaseDate} />
      </div>

      <p>My BMR is {bmr !== 0 ? bmr : "Unknown"}</p>
      <p>
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
      </div>
      <Exercise gqlClient={props.gqlClient} date={date} />
      <Meals gqlClient={props.gqlClient} date={date} />
      <Mood gqlClient={props.gqlClient} date={date} />
      <SleepHabit gqlClient={props.gqlClient} date={date} />
    </Layout>
  );
};

export default Home;

import { Layout } from "components/Layout";
import {
  useWeightsBetweenDatesQuery,
  useWeightGoalsBetweenDatesQuery,
  useDistanceGoalsBetweenDatesQuery,
  useStepsGoalsBetweenDatesQuery,
  usePopGoalsBetweenDatesQuery,
  useExercisesBetweenDatesQuery,
  useMealsBetweenDatesQuery,
  useMoodsBetweenDatesQuery,
  useSleepHabitsBetweenDatesQuery,
  MoodsBetweenDatesQuery,
  SleepHabitsBetweenDatesQuery,
  useMeQuery,
} from "src/generated/graphql-hooks";
import { useState } from "react";
import dayjs from "dayjs";
import { PropTypesWithRefresh } from "types/propTypes";
import { Chart } from "components/Chart";
import {
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
} from "victory";
import { Pie } from "components/Pie";
import { UseQueryResult } from "react-query";
import { associateCaloriesByDates } from "utils/getDailyCalories";

const countMoodType = (
  moodData: UseQueryResult<MoodsBetweenDatesQuery, unknown>,
  mood_type: string
) =>
  moodData.data
    ? moodData.data?.moodsBetweenDates.filter((m) => m.mood_type === mood_type)
        .length + 1
    : 1;

const countStressLevel = (
  moodData: UseQueryResult<MoodsBetweenDatesQuery, unknown>,
  stress_level: string
) =>
  moodData.data
    ? moodData.data?.moodsBetweenDates.filter(
        (m) => m.stress_level === stress_level
      ).length + 1
    : 1;

const countSleepAmount = (
  sleepData: UseQueryResult<SleepHabitsBetweenDatesQuery, unknown>,
  amount: string
) =>
  sleepData.data
    ? sleepData.data?.sleepHabitsBetweenDates.filter(
        (sh) => sh.amount === amount
      ).length + 1
    : 1;

const countSleepQuality = (
  sleepData: UseQueryResult<SleepHabitsBetweenDatesQuery, unknown>,
  quality: string
) =>
  sleepData.data
    ? sleepData.data?.sleepHabitsBetweenDates.filter(
        (sh) => sh.quality === quality
      ).length + 1
    : 1;

const Stats = (props: PropTypesWithRefresh) => {
  const [from, setFrom] = useState("1900-01-01");
  const [to, setTo] = useState(dayjs().format("YYYY-MM-DD"));

  const weightHistory = useWeightsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const weightGoals = useWeightGoalsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const distanceGoals = useDistanceGoalsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const stepsGoals = useStepsGoalsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const popGoals = usePopGoalsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const exercises = useExercisesBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const meals = useMealsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const moods = useMoodsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });
  const sleepHabits = useSleepHabitsBetweenDatesQuery(props.gqlClient, {
    dateRange: { from, to },
  });

  const me = useMeQuery(props.gqlClient);

  type AssocResults = {
    bmr: number;
    totalCalBurned: number;
    totalCalFromMeal: number;
    total: number;
    date: string;
  }[];
  let assocResults: AssocResults = [];
  const calorieIntakeDataAvailable =
    !!me.data && !!exercises.data && !!meals.data && !!weightHistory.data;
  if (calorieIntakeDataAvailable) {
    console.log(
      "cal assoc: ",
      associateCaloriesByDates(
        me.data.me,
        weightHistory.data.weightBetweenDates,
        meals.data.mealsBetweenDates,
        exercises.data.exercisesBetweenDates
      )
    );
    assocResults = associateCaloriesByDates(
      me.data.me,
      weightHistory.data.weightBetweenDates,
      meals.data.mealsBetweenDates,
      exercises.data.exercisesBetweenDates
    ).flatMap((x) => x.dateCalorieTotals);
  }
  console.log("assoc-res: ", assocResults);
  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      <h1>Stats</h1>
      <label htmlFor="from-date">From: </label>
      <input
        id="from-date"
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="to-date">To: </label>
      <input
        id="to-date"
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      Weights: {weightHistory.data?.weightBetweenDates.length}
      Weight Goals: {weightGoals.data?.weightGoalsBetweenDates.length}
      Distance Goals: {distanceGoals.data?.distanceGoalsBetweenDates.length}
      Steps Goals: {stepsGoals.data?.stepsGoalsBetweenDates.length}
      Pop Goals: {popGoals.data?.popGoalsBetweenDates.length}
      Exercises: {exercises.data?.exercisesBetweenDates.length}
      Meals: {meals.data?.mealsBetweenDates.length}
      Moods: {moods.data?.moodsBetweenDates.length}
      Sleep Habits: {sleepHabits.data?.sleepHabitsBetweenDates.length}
      <h3>Weight Change</h3>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea
          style={{ data: { fill: "#c43a31" } }}
          data={
            weightHistory.data?.weightBetweenDates.map((wh) => ({
              x: wh.date_of_weight,
              y: wh.weight_in_lbs,
            }))
            //   [
            //   { x: 1, y: 3 },
            //   { x: 2, y: 3 },
            //   { x: 3, y: 5 },
            //   { x: 4, y: 4 },
            //   { x: 5, y: 7 },
            // ]
          }
        />
      </VictoryChart>
      <h3>Calorie Intake</h3>
      {assocResults.length && (
        <>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryArea
              style={{ data: { fill: "#c43a31" } }}
              data={
                assocResults.map((item) => ({ x: item.date, y: item.total }))
                //   [
                //   { x: 1, y: 3 },
                //   { x: 2, y: 3 },
                //   { x: 3, y: 5 },
                //   { x: 4, y: 4 },
                //   { x: 5, y: 7 },
                // ]
              }
            />
          </VictoryChart>
          <Chart
            data={assocResults
              .reverse()
              .map((item) => ({ x: item.date, y: item.total }))}
          />
        </>
      )}
      <h3>Sleep Quality</h3>
      <Pie
        data={[
          {
            title: "Good",
            value: countSleepQuality(sleepHabits, "GOOD"),
            color: "#E38627",
          },
          {
            title: "Decent",
            value: countSleepQuality(sleepHabits, "DECENT"),
            color: "#C13C37",
          },
          {
            title: "Poor",
            value: countSleepQuality(sleepHabits, "POOR"),
            color: "#6A2135",
          },
        ]}
      />
      <h3>Sleep Amount</h3>
      <VictoryPie
        theme={VictoryTheme.material}
        colorScale={["green", "orange", "red", "cyan"]}
        //innerRadius={({ datum }) => datum.y + 10}
        padAngle={5}
        innerRadius={80}
        //padAngle={({ datum }) => datum.y}
        data={[
          { x: "full", y: countSleepAmount(sleepHabits, "FULL") },
          { x: "few", y: countSleepAmount(sleepHabits, "FEW") },
          { x: "none", y: countSleepAmount(sleepHabits, "NONE") },
          { x: "extra", y: countSleepAmount(sleepHabits, "EXTRA") },
        ]}
      />
      <h3>Stress Levels</h3>
      <svg width={300} height={300}>
        <circle cx={150} cy={150} r={50} fill="#c43a31" />
        <VictoryPie
          standalone={false}
          width={300}
          height={300}
          innerRadius={75}
          //colorScale={["red", "yellow", "green"]}
          data={[
            { x: "High", y: countStressLevel(moods, "HIGH") },
            { x: "Mid", y: countStressLevel(moods, "MODERATE") },
            { x: "Low", y: countStressLevel(moods, "LOW") },
          ]}
        />
      </svg>
      <h3>Moods</h3>
      <VictoryChart polar theme={VictoryTheme.material}>
        <VictoryArea
          data={[
            { x: "HAPPY", y: countMoodType(moods, "HAPPY") },
            { x: "MOTIVATED", y: countMoodType(moods, "MOTIVATED") },
            { x: "SATISFIED", y: countMoodType(moods, "SATISFIED") },
            { x: "RELAXED", y: countMoodType(moods, "RELAXED") },
            { x: "TIRED", y: countMoodType(moods, "TIRED") },
            { x: "FRUSTRATED", y: countMoodType(moods, "FRUSTRATED") },
            { x: "SAD", y: countMoodType(moods, "SAD") },
            { x: "ANXIOUS", y: countMoodType(moods, "ANXIOUS") },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      {/* <Pie
        data={[
          { title: "High", value: 10, color: "#E38627" },
          { title: "Moderate", value: 15, color: "#C13C37" },
          { title: "Low", value: 20, color: "#6A2135" },
        ]}
      />
      <h3>Mood</h3> */}
    </Layout>
  );
};

export default Stats;

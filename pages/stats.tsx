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
} from "src/generated/graphql-hooks";
import { useState } from "react";
import dayjs from "dayjs";
import { PropTypes } from "types/propTypes";
import { Chart } from "components/Chart";
import {
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
} from "victory";
import { Pie } from "components/Pie";

const Stats = (props: PropTypes) => {
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

  return (
    <Layout>
      <h1>Stats</h1>
      <h3>Weight Change</h3>
      <h3>Calorie Intake</h3>
      <h3>Sleep Quality</h3>
      <h3>Sleep Amount</h3>
      <h3>Stress Levels</h3>
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
      <Pie
        data={[
          { title: "High", value: 10, color: "#E38627" },
          { title: "Moderate", value: 15, color: "#C13C37" },
          { title: "Low", value: 20, color: "#6A2135" },
        ]}
      />
      <h3>Mood</h3>
      <Chart />
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea
          style={{ data: { fill: "#c43a31" } }}
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 },
          ]}
        />
      </VictoryChart>
      <Pie
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
      <svg width={300} height={300}>
        <circle cx={150} cy={150} r={50} fill="#c43a31" />
        <VictoryPie
          standalone={false}
          width={300}
          height={300}
          innerRadius={75}
          data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 },
          ]}
        />
      </svg>
      <VictoryPie
        theme={VictoryTheme.material}
        colorScale={["green", "orange", "red", "cyan"]}
        //innerRadius={({ datum }) => datum.y + 10}
        padAngle={5}
        innerRadius={80}
        //padAngle={({ datum }) => datum.y}
        data={[
          { x: "full", y: 70 },
          { x: "few", y: 17 },
          { x: "none", y: 3 },
          { x: "extra", y: 10 },
        ]}
      />
      <VictoryChart polar theme={VictoryTheme.material}>
        <VictoryArea
          data={[
            { x: "HAPPY", y: 10 },
            { x: "MOTIVATED", y: 8 },
            { x: "SATISFIED", y: 6 },
            { x: "RELAXED", y: 12 },
            { x: "TIRED", y: 14 },
            { x: "FRUSTRATED", y: 2 },
            { x: "SAD", y: 3 },
            { x: "ANXIOUS", y: 5 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
    </Layout>
  );
};

export default Stats;

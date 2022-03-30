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
    </Layout>
  );
};

export default Stats;

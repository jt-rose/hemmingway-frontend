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
import { Chart } from "components/charts/Chart";
import {
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
} from "victory";
import { VChart } from "components/charts/VChart";
import { VPie } from "components/charts/VPie";
import { VPieFull } from "components/charts/VPieFull";
import { Pie } from "components/charts/Pie";
import { UseQueryResult } from "react-query";
import { associateCaloriesByDates } from "utils/getDailyCalories";
import { useForm } from "react-hook-form";

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
  const today = dayjs().format("YYYY-MM-DD");
  const [from, setFrom] = useState(
    dayjs().subtract(1, "month").format("YYYY-MM-DD")
  );
  const [to, setTo] = useState(today);

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

  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      <div className="flex justify-center">
        <div className="w-4/5">
          <h1 className="text-2xl text-center mb-6 mt-4">Stats</h1>
          <div className="mx-auto max-w-sm flex justify-between w-full">
            <div className="mb-6">
              <label
                htmlFor="from-date"
                className="block font-bold text-center mb-2 text-sm text-gray-900 dark:text-gray-300"
              >
                From
              </label>
              <input
                type="date"
                id="from-date"
                className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="..."
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="to-date"
                className="block font-bold text-center mb-2 text-sm  text-gray-900 dark:text-gray-300"
              >
                To
              </label>
              <input
                type="date"
                id="to-date"
                className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="..."
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
          <p className="text-center underline text-lg">Recorded Data Found</p>
          <div className="flex flex-wrap justify-around mt-4 mb-12">
            <div>
              <p>
                Weights: {weightHistory.data?.weightBetweenDates.length} entries
              </p>
              <p>
                Weight Goals: {weightGoals.data?.weightGoalsBetweenDates.length}{" "}
                entries
              </p>
              <p>
                Miles Goals:{" "}
                {distanceGoals.data?.distanceGoalsBetweenDates.length} entries
              </p>
              <p>
                Steps Goals: {stepsGoals.data?.stepsGoalsBetweenDates.length}{" "}
                entries
              </p>
            </div>
            <div>
              <p>
                Exercises: {exercises.data?.exercisesBetweenDates.length}{" "}
                entries
              </p>
              <p>Meals: {meals.data?.mealsBetweenDates.length} entries</p>
              <p>Moods: {moods.data?.moodsBetweenDates.length} entries</p>
              <p>
                Sleep Habits: {sleepHabits.data?.sleepHabitsBetweenDates.length}{" "}
                entries
              </p>
            </div>
          </div>

          <h3 className="text-2xl text-center">Weight Change</h3>
          <p className="text-center">
            shows how your recorded weight has changed over time
          </p>
          {weightHistory.data &&
            weightHistory.data.weightBetweenDates.length > 1 && (
              <div className="flex justify-center mb-20">
                <div className="w-4/5">
                  <Chart
                    data={weightHistory.data.weightBetweenDates
                      .sort(
                        (a, b) =>
                          (new Date(a.date_of_weight) as any) -
                          (new Date(b.date_of_weight) as any)
                      )
                      .map((wh) => ({
                        x: dayjs(wh.date_of_weight).format("MMM - DD - YY"),
                        y: wh.weight_in_lbs,
                      }))}
                  />
                </div>
              </div>
            )}
          <h3 className="text-2xl text-center">Daily Net Calories</h3>
          <p className="text-center">
            shows your daily net calorie gain / loss over time
          </p>
          {assocResults.length && (
            <div className="flex justify-center mb-20">
              <div className="w-4/5">
                <Chart
                  // data={[
                  //   ...new Set(
                  //     exercises.data?.exercisesBetweenDates.map(
                  //       (x) => x.date_of_exercise
                  //     )
                  //   ),
                  // ]
                  //   .sort()
                  //   .map((x) => ({
                  //     x: dayjs(x).format("M/D"),
                  //     y: exercises.data?.exercisesBetweenDates
                  //       .filter((ex) => ex.date_of_exercise === x)
                  //       .reduce((a, b) => a + b.calories, 0),
                  //   }))}
                  data={assocResults
                    .sort(
                      (a, b) =>
                        (new Date(a.date) as any) - (new Date(b.date) as any)
                    )
                    .map((item) => ({
                      x: dayjs(item.date).format("M/D"),
                      y: item.total,
                    }))}
                />
              </div>
            </div>
          )}
          <h3 className="text-2xl text-center">Sleep Quality</h3>
          <p className="text-center">
            a breakdown of the recorded quality of your sleep
          </p>
          <div className="flex justify-center mt-8 mb-20">
            <div className="w-4/5">
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
            </div>
          </div>
          <h3 className="text-2xl text-center">Sleep Amount</h3>
          <p className="text-center">
            a breakdown of the recorded quantity of your sleep
          </p>
          <div className="flex justify-center mb-20">
            <div className="w-4/5">
              <VPie
                data={[
                  { x: "full", y: countSleepAmount(sleepHabits, "FULL") },
                  { x: "few", y: countSleepAmount(sleepHabits, "FEW") },
                  { x: "none", y: countSleepAmount(sleepHabits, "NONE") },
                  { x: "extra", y: countSleepAmount(sleepHabits, "EXTRA") },
                ]}
              />
            </div>
          </div>
          <h3 className="text-2xl text-center">Stress Levels</h3>
          <p className="text-center">
            an average of your recorded stress levels over time
          </p>
          <p className="text-center"> - hang in there!</p>
          <div className="flex flex-col items-center mb-20">
            <VPieFull
              data={[
                { x: "High", y: countStressLevel(moods, "HIGH") },
                { x: "Mid", y: countStressLevel(moods, "MODERATE") },
                { x: "Low", y: countStressLevel(moods, "LOW") },
              ]}
            />
          </div>
          <h3 className="text-2xl text-center">Well Being</h3>
          <p className="text-center">
            shows a ratio of your different moods over time
          </p>
          {/* list top three */}
          <div className="flex justify-center mt-12 mb-8">
            <div className="w-4/5">
              <VictoryChart polar theme={VictoryTheme.material}>
                <VictoryArea
                  data={[
                    { x: "RELAX", y: countMoodType(moods, "RELAXED") },
                    { x: "MOTIVATED", y: countMoodType(moods, "MOTIVATED") },
                    { x: "HAPPY", y: countMoodType(moods, "HAPPY") },
                    { x: "SATISFIED", y: countMoodType(moods, "SATISFIED") },
                    { x: "TIRED", y: countMoodType(moods, "TIRED") },
                    { x: "FRUSTRATED", y: countMoodType(moods, "FRUSTRATED") },
                    { x: "SAD", y: countMoodType(moods, "SAD") },
                    { x: "ANXIOUS", y: countMoodType(moods, "ANXIOUS") },
                  ]}
                />
                <VictoryPolarAxis />
              </VictoryChart>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stats;

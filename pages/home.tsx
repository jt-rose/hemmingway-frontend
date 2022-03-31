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
  useMeQuery,
} from "src/generated/graphql-hooks";
import { calculateBMR } from "utils/BMR";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

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

  return (
    <Layout>
      <h1>Home</h1>
      <div className="flex w-full justify-around my-8">
        <ChevronDoubleLeftIcon className="ht-12 w-8" onClick={decreaseDate} />
        <p>Date: {date}</p>
        <ChevronDoubleRightIcon className="ht-12 w-8" onClick={increaseDate} />
      </div>

      <p>My BMR is {bmr !== 0 ? bmr : "Unknown"}</p>
      <Exercise gqlClient={props.gqlClient} date={date} />
      <Meals gqlClient={props.gqlClient} date={date} />
      <Mood gqlClient={props.gqlClient} date={date} />
      <SleepHabit gqlClient={props.gqlClient} date={date} />
    </Layout>
  );
};

export default Home;

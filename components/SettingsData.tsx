import { CurrentGoalsQuery } from "src/generated/graphql-hooks";
import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
// import { PopGoal } from "components/settings/popGoal/PopGoal";
import { UserWeight } from "components/settings/userWeight/UserWeight";
import { GraphQLClient } from "graphql-request";
// import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
import dayjs from "dayjs";
import { useState } from "react";

export const SettingsData = (props: {
  data: CurrentGoalsQuery;
  gqlClient: GraphQLClient;
}) => {
  const [editingTarget, setEditingTarget] = useState(null);
  const {
    me,
    currentDistanceGoal,
    currentPopGoal,
    currentStepsGoal,
    currentUserWeight,
    currentWeightGoal,
  } = props.data;

  const date = dayjs().format("YYYY-MM-DD");

  return (
    <div>
      <h1 className="text-3xl">Settings</h1>
      <h2 className="text-3xl">Goals</h2>
      <p className="text-2xl">Daily Calorie Goal: -200</p>
      <p className="text-2xl">
        {currentStepsGoal?.daily_goal_in_steps} Steps Daily
      </p>
      <p className="text-2xl">
        {currentDistanceGoal?.daily_goal_in_miles} Miles Daily
      </p>
      <p className="text-2xl">
        Current Weight: {currentUserWeight?.weight_in_lbs} lbs
      </p>
      <p className="text-2xl">
        Target Weight: {currentWeightGoal?.goal_in_lbs} lbs
      </p>
      <UserWeight gqlClient={props.gqlClient} date={date} />
      {/*<WeightGoal gqlClient={props.gqlClient} date={date} />
        <PopGoal gqlClient={props.gqlClient} date={date} />*/}
      <DailyDistanceGoals gqlClient={props.gqlClient} date={date} />
      <DailyStepsGoals gqlClient={props.gqlClient} date={date} />
    </div>
  );
};

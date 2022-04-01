import { CurrentGoalsQuery } from "src/generated/graphql-hooks";
// import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
// import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
// import { PopGoal } from "components/settings/popGoal/PopGoal";
// import { UserWeight } from "components/settings/userWeight/UserWeight";
import { GraphQLClient } from "graphql-request";
// import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { SetUserWeight } from "./settings/userWeight/SetUserWeight";
import { SetWeightGoal } from "./settings/weightGoal/SetWeightGoal";
import { SetDistanceGoal } from "./settings/dailyDistanceGoal/SetDistanceGoal";
import { SetStepsGoal } from "./settings/dailyStepsGoal/SetStepsGoal";

export const SettingsData = (props: {
  data: CurrentGoalsQuery;
  gqlClient: GraphQLClient;
}) => {
  const {
    //me,
    currentDistanceGoal,
    //currentPopGoal,
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
      <Tab.Group>
        <Tab.List>
          {["Weight", "Goal", "Daily Miles", "Daily Steps"].map((tabName) => (
            <Tab as={Fragment} key={"tab-" + tabName}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "bg-blue-500 text-white" : "bg-white text-black"
                  }
                >
                  {tabName}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {[SetUserWeight, SetWeightGoal, SetDistanceGoal, SetStepsGoal].map(
            (Child) => (
              <Tab.Panel>
                <Child gqlClient={props.gqlClient} date={date} />
              </Tab.Panel>
            )
          )}
        </Tab.Panels>
      </Tab.Group>

      {/*<PopGoal gqlClient={props.gqlClient} date={date} />*/}
    </div>
  );
};

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
import { getDailyCalorieTarget } from "utils/getDailyCalories";

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
      <h1 className="text-2xl text-center mb-6 mt-4">Settings & Goals</h1>
      <Tab.Group>
        <Tab.List className="flex flex-wrap w-full justify-center my-6">
          {["Weight", "Target", "Daily Miles", "Daily Steps"].map((tabName) => (
            <Tab as={Fragment} key={"tab-" + tabName}>
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? "bg-teal-400 rounded-lg border-2 border-teal-400 text-slate-50 p-2 m-2"
                      : "border-teal-400 border-2 rounded-lg text-teal-400 p-2 m-2 "
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
            (Child, index) => (
              <Tab.Panel key={"tab-panel-" + index}>
                <div className="flex flex-col items-center mb-8">
                  <h2>
                    {index === 0
                      ? "Current Weight"
                      : index === 1
                      ? "Target Weight"
                      : "Current Goal"}
                  </h2>

                  {index === 0 ? (
                    <p className="text-2xl">
                      {currentUserWeight
                        ? `${currentUserWeight.weight_in_lbs} lbs`
                        : "Not Set"}
                    </p>
                  ) : index === 1 ? (
                    <p className="text-2xl">
                      {currentWeightGoal
                        ? `${currentWeightGoal.goal_in_lbs} lbs`
                        : "Not Set"}
                    </p>
                  ) : index === 2 ? (
                    <p className="text-2xl">
                      {currentDistanceGoal
                        ? `${currentDistanceGoal.daily_goal_in_miles} Miles Daily`
                        : "Not Set"}
                    </p>
                  ) : (
                    <p className="text-2xl">
                      {currentStepsGoal
                        ? `${currentStepsGoal.daily_goal_in_steps} Steps Daily`
                        : "Not Set"}
                    </p>
                  )}
                </div>
                <Child gqlClient={props.gqlClient} date={date} />
              </Tab.Panel>
            )
          )}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

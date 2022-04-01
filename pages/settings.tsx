import { Layout } from "components/Layout";
// import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
// import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
// import { PopGoal } from "components/settings/popGoal/PopGoal";
import { UserWeight } from "components/settings/userWeight/UserWeight";
// import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
import dayjs from "dayjs";
import { PropTypes } from "types/propTypes";

import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";
import { Pie } from "components/Pie";

const Settings = (props: PropTypes) => {
  const date = dayjs().format("YYYY-MM-DD");
  const { data } = useCurrentGoalsQuery(props.gqlClient);
  console.log(data);
  return (
    <Layout>
      <h1>Settings</h1>
      <h3>Weight Change</h3>

      <h3>Calorie Intake</h3>
      <h3>Sleep Quality</h3>

      <h3>Sleep Amount</h3>

      <h3>Stress Levels</h3>
      <Pie
        data={[
          { title: "High", value: 10, color: "#E38627" },
          { title: "Moderate", value: 15, color: "#C13C37" },
          { title: "Low", value: 20, color: "#6A2135" },
        ]}
      />
      <h3>Mood</h3>

      <UserWeight gqlClient={props.gqlClient} date={date} />
      {/*<WeightGoal gqlClient={props.gqlClient} date={date} />
      <PopGoal gqlClient={props.gqlClient} date={date} />
      <DailyDistanceGoals gqlClient={props.gqlClient} date={date} />
      <DailyStepsGoals gqlClient={props.gqlClient} date={date} /> */}
    </Layout>
  );
};

export default Settings;

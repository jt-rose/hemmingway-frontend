import { Layout } from "components/Layout";
// import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
// import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
// import { PopGoal } from "components/settings/popGoal/PopGoal";
import { UserWeight } from "components/settings/userWeight/UserWeight";
// import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
import dayjs from "dayjs";
import { PropTypes } from "types/propTypes";

import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";
import { Radio } from "components/forms/Radio";

const Settings = (props: PropTypes) => {
  const date = dayjs().format("YYYY-MM-DD");
  const { data } = useCurrentGoalsQuery(props.gqlClient);
  console.log(data);
  return (
    <Layout>
      <h1>Settings</h1>
      <Radio radioOptions={["MALE", "FEMALE", "NB"]} name="gender" />
      <UserWeight gqlClient={props.gqlClient} date={date} />
      {/*<WeightGoal gqlClient={props.gqlClient} date={date} />
      <PopGoal gqlClient={props.gqlClient} date={date} />
      <DailyDistanceGoals gqlClient={props.gqlClient} date={date} />
      <DailyStepsGoals gqlClient={props.gqlClient} date={date} /> */}
    </Layout>
  );
};

export default Settings;

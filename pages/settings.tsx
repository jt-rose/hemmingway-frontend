import { Layout } from "components/Layout";
// import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
// import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
// import { PopGoal } from "components/settings/popGoal/PopGoal";
// import { UserWeight } from "components/settings/userWeight/UserWeight";
// import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
//import dayjs from "dayjs";
import { PropTypes } from "types/propTypes";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
} from "victory";
import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";
import { Pie } from "components/Pie";

const Chart = () => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryLine
      interpolation="natural"
      labels={({ datum }) => datum.y}
      labelComponent={<VictoryLabel renderInPortal dy={-20} />}
      style={{
        data: { stroke: "#c43a31", strokeWidth: 5 },
        parent: { border: "1px solid #ccc" },
      }}
      data={[
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 },
      ]}
    />
  </VictoryChart>
);

const Settings = (props: PropTypes) => {
  //const date = dayjs().format("YYYY-MM-DD");
  const { data } = useCurrentGoalsQuery(props.gqlClient);
  console.log(data);
  return (
    <Layout>
      <h1>Settings</h1>
      <h3>Weight Change</h3>
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
      <Chart />
      <h3>Calorie Intake</h3>
      <h3>Sleep Quality</h3>
      <Pie
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
      <h3>Sleep Amount</h3>
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
      <h3>Stress Levels</h3>
      <Pie
        data={[
          { title: "High", value: 10, color: "#E38627" },
          { title: "Moderate", value: 15, color: "#C13C37" },
          { title: "Low", value: 20, color: "#6A2135" },
        ]}
      />
      <h3>Mood</h3>

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

      {/* <UserWeight gqlClient={props.gqlClient} date={date} />
      <WeightGoal gqlClient={props.gqlClient} date={date} />
      <PopGoal gqlClient={props.gqlClient} date={date} />
      <DailyDistanceGoals gqlClient={props.gqlClient} date={date} />
      <DailyStepsGoals gqlClient={props.gqlClient} date={date} /> */}
    </Layout>
  );
};

export default Settings;

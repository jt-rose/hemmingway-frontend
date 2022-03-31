import { Layout } from "components/Layout";
import { DailyDistanceGoals } from "components/settings/dailyDistanceGoal/DistanceGoal";
import { DailyStepsGoals } from "components/settings/dailyStepsGoal/StepsGoals";
import { PopGoal } from "components/settings/popGoal/PopGoal";
import { UserWeight } from "components/settings/userWeight/UserWeight";
import { WeightGoal } from "components/settings/weightGoal/WeightGoal";
import dayjs from "dayjs";
import React, { ComponentProps, useState } from "react";
import { PropTypes } from "types/propTypes";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryPie,
  VictoryArea,
  VictoryPolarAxis,
} from "victory";
import { PieChart } from "react-minimal-pie-chart";

type Props = {
  data: ComponentProps<typeof PieChart>["data"];
};

function FullOption(props: Props) {
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "grey",
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: "8px",
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={60}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      segmentsShift={(index) => (index === selected ? 6 : 1)}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: "#fff",
        opacity: 0.75,
        pointerEvents: "none",
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

const Chart = () => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryLine
      style={{
        data: { stroke: "#c43a31" },
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
  const date = dayjs().format("YYYY-MM-DD");
  return (
    <Layout>
      <h1>Settings</h1>
      <FullOption
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
      />
      <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
        radius={PieChart.defaultProps.radius - 7}
        segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
        label={({ dataEntry }) => dataEntry.value}
        animate
        // center={[100, 100]}
        // lineWidth={15}
        // labelStyle={{
        //   ...defaultLabelStyle,
        // }}
      />
      <Chart />
      <VictoryPie
        theme={VictoryTheme.material}
        // colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        padAngle={10}
        innerRadius={80}
        data={[
          { x: "Cats", y: 35 },
          { x: "Dogs", y: 40 },
          { x: "Birds", y: 55 },
        ]}
      />
      <VictoryChart polar theme={VictoryTheme.material}>
        <VictoryArea
          data={[
            { x: "Cats", y: 35 },
            { x: "Dogs", y: 40 },
            { x: "Birds", y: 55 },
          ]}
        />
        <VictoryPolarAxis />
      </VictoryChart>
      <UserWeight gqlClient={props.gqlClient} date={date} />
      <WeightGoal gqlClient={props.gqlClient} date={date} />
      <PopGoal gqlClient={props.gqlClient} date={date} />
      <DailyDistanceGoals gqlClient={props.gqlClient} date={date} />
      <DailyStepsGoals gqlClient={props.gqlClient} date={date} />
    </Layout>
  );
};

export default Settings;

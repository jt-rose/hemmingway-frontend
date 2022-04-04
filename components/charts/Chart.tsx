import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory";

export const Chart = (props: { data: { x: string; y: number }[] }) => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryLine
      style={{
        data: { stroke: "#c43a31", strokeWidth: 5 },
        parent: { border: "1px solid #ccc" },
      }}
      data={props.data}
    />
    <VictoryAxis dependentAxis fixLabelOverlap />
    <VictoryAxis fixLabelOverlap />
  </VictoryChart>
);

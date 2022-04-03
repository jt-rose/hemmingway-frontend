import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory";

export const Chart = (props: { data: { x: string; y: number }[] }) => (
  <VictoryChart theme={VictoryTheme.material}>
    <VictoryLine
      //interpolation="natural"
      labels={({ datum }) => datum.y}
      labelComponent={<VictoryLabel renderInPortal dy={-20} />}
      style={{
        data: { stroke: "#c43a31", strokeWidth: 5 },
        parent: { border: "1px solid #ccc" },
      }}
      data={props.data}
    />
  </VictoryChart>
);

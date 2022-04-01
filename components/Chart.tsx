import { VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory";

export const Chart = () => (
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

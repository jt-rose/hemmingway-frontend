import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryScatter,
  VictoryAxis,
  VictoryZoomContainer,
} from "victory";

export const Chart = (props: { data: { x: string; y: number }[] }) => (
  <VictoryChart
    theme={VictoryTheme.material}
    //containerComponent={<VictoryZoomContainer />}
  >
    <VictoryLine
      //interpolation="natural"
      //labels={({ datum }) => datum.y}
      //labelComponent={<VictoryLabel renderInPortal dy={-20} />}
      style={{
        data: { stroke: "#c43a31", strokeWidth: 5 },
        parent: { border: "1px solid #ccc" },
      }}
      data={props.data}

      // domain={{ y: [500, -600] }}
      //categories={["hi", "bye"]}
    />
    <VictoryAxis dependentAxis fixLabelOverlap />
    <VictoryAxis
      fixLabelOverlap
      //tickValues={[1, 2, 3, 4, 5]}
      //style={{ tickLabels: { angle: 45 } }}
    />
  </VictoryChart>
);

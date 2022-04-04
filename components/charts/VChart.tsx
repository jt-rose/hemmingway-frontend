import { VictoryChart, VictoryTheme, VictoryArea } from "victory";

export const VChart = (props: { data: { x: string; y: number }[] }) => {
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryArea
        style={{ data: { fill: "#c43a31" } }}
        data={props.data}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
    </VictoryChart>
  );
};

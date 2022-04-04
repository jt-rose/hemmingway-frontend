import { VictoryPie, VictoryTheme } from "victory";

export const VPie = (props: { data: { x: string; y: number }[] }) => {
  return (
    <VictoryPie
      theme={VictoryTheme.material}
      colorScale={["green", "orange", "red", "cyan"]}
      //innerRadius={({ datum }) => datum.y + 10}
      padAngle={5}
      innerRadius={80}
      //padAngle={({ datum }) => datum.y}
      data={props.data}
    />
  );
};

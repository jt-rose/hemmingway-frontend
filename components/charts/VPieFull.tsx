import { VictoryPie } from "victory";

export const VPieFull = (props: { data: { x: string; y: number }[] }) => {
  return (
    <svg width={300} height={300}>
      <circle cx={150} cy={150} r={50} fill="#c43a31" />
      <VictoryPie
        standalone={false}
        width={300}
        height={300}
        innerRadius={75}
        style={{ labels: { fontFamily: "sans-serif" } }}
        //colorScale={["red", "yellow", "green"]}
        data={props.data}
      />
    </svg>
  );
};

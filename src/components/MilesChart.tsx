import styled from "@emotion/styled";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { MilesTuple } from "./Miles";

const StyledAreaChart = styled(AreaChart)`
  .recharts-cartesian-grid line {
    stroke: #ffffff54;
  }

  .recharts-cartesian-axis-tick text {
    fill: #ffcdb5a3;
  }

  .recharts-default-tooltip {
    background: #724434 !important;
    border: none !important;
    color: #ffffff94;
    border-radius: 5px;
    font-size: 13px;
    padding: 8px 12px !important;
  }
`;

export interface MilesChartProps {
  miles: MilesTuple[];
  width?: number;
  height?: number;
}

export function MilesChart({ miles, ...props }: MilesChartProps) {
  return (
    <StyledAreaChart data={miles} {...props}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#fb5200" stopOpacity={0.6} />
          <stop offset="95%" stopColor="#fb5200" stopOpacity={0.1} />
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="0"
        tickFormatter={(date) =>
          date.includes("-") ? date.split(" ")[1] : date
        }
        interval={miles[0][0].includes("-") ? undefined : 0}
      />
      <YAxis
        dataKey={([_, miles]) => parseInt(miles)}
        domain={[0, "dataMax"]}
      />
      <Tooltip />

      <Area
        type="monotone"
        dataKey={([_, miles]) => miles.toFixed(2)}
        name="Miles"
        strokeWidth={2}
        stroke="#fb5200"
        activeDot={{ r: 8 }}
        dot={{
          strokeWidth: 2,
          r: 4,
          strokeDasharray: "",
          fill: "#2a1c15",
        }}
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </StyledAreaChart>
  );
}

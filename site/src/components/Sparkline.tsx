import type { StarHistory } from "../../../scripts/lib/types.ts";
import { chartOf } from "../lib/sparkline.ts";

const WIDTH = 60;
const HEIGHT = 16;

export function Sparkline({ series }: { series: StarHistory }) {
  const chart = chartOf(series, WIDTH, HEIGHT);
  if (!chart) return null;
  return (
    <svg className="sparkline" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className="star-chart-area" d={chart.area} />
      <path className="star-chart-line" d={chart.line} vector-effect="non-scaling-stroke" />
    </svg>
  );
}

import type { Incident, Config, Metrics } from "../types";

export function getMonthIncidents(
  incidents: Incident[],
  config: Config
): Incident[] {
  const [y, m] = config.periode.split("-").map(Number);
  return incidents.filter((i) => {
    const d = new Date(i.start);
    return (
      d.getFullYear() === y &&
      d.getMonth() + 1 === m &&
      i.type === "Unplanned" &&
      i.status === "closed"
    );
  });
}

export function calcMetrics(incidents: Incident[], config: Config): Metrics {
  const mi = getMonthIncidents(incidents, config);
  const totalDowntime = mi.reduce((s, i) => s + (i.duration || 0), 0);
  const count = mi.length;
  const jamOps = config.jamOps;
  const minsOps = jamOps * 60;
  const availability =
    minsOps > 0 ? ((minsOps - totalDowntime) / minsOps) * 100 : 100;
  const mttr = count > 0 ? totalDowntime / count : 0;
  const mtbf = count > 0 ? (jamOps - totalDowntime / 60) / count : jamOps;
  return { totalDowntime, count, availability, mttr, mtbf, minsOps, jamOps };
}

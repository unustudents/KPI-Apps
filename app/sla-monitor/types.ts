export interface Incident {
  id: string;
  start: string;
  end: string;
  duration: number;
  type: "Unplanned" | "Planned";
  rootCause: string;
  units: string[];
  notes: string;
  status: "active" | "closed";
}

export interface Config {
  periode: string;
  sistem: string;
  pic: string;
  jamOps: number;
}

export interface Metrics {
  totalDowntime: number;
  count: number;
  availability: number;
  mttr: number;
  mtbf: number;
  minsOps: number;
  jamOps: number;
}

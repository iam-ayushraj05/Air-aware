export type RoutinePeriod = "morning" | "afternoon" | "evening" | "night";

export interface RoutinePeriodHeader {
  period: RoutinePeriod;
  title: string;
  timeRange: string;
  focus: string;
}

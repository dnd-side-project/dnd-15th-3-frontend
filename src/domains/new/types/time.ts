export interface Time {
  hours: number;
  minutes: number;
}
export interface TimeWithPeriod extends Time {
  period: "AM" | "PM";
}

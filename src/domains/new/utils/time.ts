import type { Time, TimeWithPeriod } from "../types/time";

const MINUTE_STEP = 5;
const HOUR_STEP = 1;
export const formatTwoDigits = (n: number) => String(n).padStart(2, "0");

export const stepHour = (hours: number, stepType: "up" | "down"): number =>
  stepType === "up" ? (hours % 12) + HOUR_STEP : ((hours + 12 - HOUR_STEP - 1) % 12) + 1;

export const stepMinute = (minutes: number, stepType: "up" | "down"): number =>
  stepType === "up" ? (minutes + MINUTE_STEP) % 60 : (minutes - MINUTE_STEP + 60) % 60;

export const togglePeriod = (period: "AM" | "PM"): "AM" | "PM" => (period === "AM" ? "PM" : "AM");

export const to24HourTime = (time: TimeWithPeriod): Time => {
  const { hours, minutes, period } = time;
  return { hours: period === "PM" ? (hours % 12) + 12 : hours % 12, minutes };
};

export const toTimeWithPeriod = (time: Time): TimeWithPeriod => {
  const period = time.hours >= 12 ? "PM" : "AM";
  return {
    hours: time.hours % 12 || 12,
    minutes: time.minutes,
    period,
  };
};

export const formatTime = (time: TimeWithPeriod) =>
  `${formatTwoDigits(time.hours)}:${formatTwoDigits(time.minutes)} ${time.period}`;

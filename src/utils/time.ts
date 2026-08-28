export interface Time {
  hours: number;
  minutes: number;
}
export interface TimeWithPeriod extends Time {
  period: "AM" | "PM";
}

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

/** YYYY-MM-DD */
export const toDateString = (date: Date) =>
  `${date.getFullYear()}-${formatTwoDigits(date.getMonth() + 1)}-${formatTwoDigits(date.getDate())}`;

/** HH:mm */
export const toTimeString = (time: Time) =>
  `${formatTwoDigits(time.hours)}:${formatTwoDigits(time.minutes)}`;

export function parseDateString(value: string) {
  if (value === "") {
    return undefined;
  }
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year!, month! - 1, day!);
}

export function parseTimeString(value: string): Time | null {
  if (value === "") {
    return null;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return { hours: hours!, minutes: minutes! };
}

export function getNearestFutureTime(): Time {
  const now = new Date();
  const currentMinutes = now.getMinutes();
  const roundedMinutes = Math.ceil((currentMinutes + 1) / MINUTE_STEP) * MINUTE_STEP;

  if (roundedMinutes >= 60) {
    return {
      hours: (now.getHours() + 1) % 24,
      minutes: 0,
    };
  }

  return {
    hours: now.getHours(),
    minutes: roundedMinutes,
  };
}

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import { SectionIntro } from "../../../../components/section-intro";
import { DayPicker } from "../../components/day-picker";
import { StepPage } from "../../components/step-page";
import { TimePicker } from "../../components/time-picker";
import type { MeetingDraft } from "../../draft";
import type { Time } from "../../types/time";
import { formatTwoDigits } from "../../utils/time";

import { fields, intro } from "./index.css";

/** CreateMeetingDto.date 는 YYYY-MM-DD */
function toDateString(date: Date) {
  return `${date.getFullYear()}-${formatTwoDigits(date.getMonth() + 1)}-${formatTwoDigits(date.getDate())}`;
}

/** CreateMeetingDto.time 은 HH:mm */
function toTimeString(time: Time) {
  return `${formatTwoDigits(time.hours)}:${formatTwoDigits(time.minutes)}`;
}

function parseDate(value: string) {
  if (value === "") {
    return undefined;
  }
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year!, month! - 1, day!);
}

function parseTime(value: string): Time | null {
  if (value === "") {
    return null;
  }
  const [hours, minutes] = value.split(":").map(Number);
  return { hours: hours!, minutes: minutes! };
}

export function MeetingSchedulePage() {
  const navigate = useNavigate();
  const { control } = useFormContext<MeetingDraft>();
  const [date, time] = useWatch({ control, name: ["date", "time"] });

  return (
    <StepPage
      primaryDisabled={date === "" || time === ""}
      title="모임생성"
      onPrimary={() => void navigate("/new/complete")}
    >
      <SectionIntro
        className={intro}
        description="모두가 만날 수 있는 날짜와 시간을 선택해주세요"
        title="정해진 모임 날짜와 시간을 작성해주세요"
      />

      <div className={fields}>
        <Controller
          control={control}
          name="date"
          render={({ field }) => {
            const selected = parseDate(field.value);
            return (
              <DayPicker
                date={selected}
                setDate={(action) => {
                  const next = typeof action === "function" ? action(selected) : action;
                  field.onChange(next === undefined ? "" : toDateString(next));
                }}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="time"
          render={({ field }) => {
            const selected = parseTime(field.value);
            return (
              <TimePicker
                meetingTime={selected}
                setMeetingTime={(action) => {
                  const next = typeof action === "function" ? action(selected) : action;
                  field.onChange(next === null ? "" : toTimeString(next));
                }}
              />
            );
          }}
        />
      </div>
    </StepPage>
  );
}

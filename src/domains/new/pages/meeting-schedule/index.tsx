import { useState } from "react";
import { useNavigate } from "react-router";

import { DayPicker } from "../../components/day-picker";
import { StepPage } from "../../components/step-page";
import { TimePicker } from "../../components/time-picker";
import { useMeetingDraft } from "../../draft";
import type { Time } from "../../types/time";
import { formatTwoDigits } from "../../utils/time";

import { fields, intro, introDescription, introTitle } from "./index.css";

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
  const { draft, patch } = useMeetingDraft();

  const [date, setDate] = useState<Date | undefined>(() => parseDate(draft.date));
  const [time, setTime] = useState<Time | null>(() => parseTime(draft.time));

  const changeDate = (next: Date | undefined) => {
    setDate(next);
    patch({ date: next === undefined ? "" : toDateString(next) });
  };

  const changeTime = (next: Time | null) => {
    setTime(next);
    patch({ time: next === null ? "" : toTimeString(next) });
  };

  return (
    <StepPage
      primaryDisabled={draft.date === "" || draft.time === ""}
      title="모임생성"
      onPrimary={() => void navigate("/new/complete")}
    >
      <div className={intro}>
        <h2 className={introTitle}>정해진 모임 날짜와 시간을 작성해주세요</h2>
        <p className={introDescription}>모두가 만날 수 있는 날짜와 시간을 선택해주세요</p>
      </div>

      <div className={fields}>
        <DayPicker
          date={date}
          setDate={(action) => changeDate(typeof action === "function" ? action(date) : action)}
        />
        <TimePicker
          meetingTime={time}
          setMeetingTime={(action) =>
            changeTime(typeof action === "function" ? action(time) : action)
          }
        />
      </div>
    </StepPage>
  );
}

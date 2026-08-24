import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import { DayPicker } from "@/components/day-picker";
import { SectionIntro } from "@/components/section-intro";
import { TimePicker } from "@/components/time-picker";
import { StepPage } from "@/domains/new/components/step-page";
import type { MeetingDraft } from "@/domains/new/constants";
import { parseDateString, parseTimeString, toDateString, toTimeString } from "@/utils/time";

import { fields, intro } from "./index.css";

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
            const selected = parseDateString(field.value);
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
            const selected = parseTimeString(field.value);
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

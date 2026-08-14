import { useState, type ButtonHTMLAttributes, type Dispatch, type SetStateAction } from "react";

import ArrowDownIcon from "../../../../assets/icon-arrow-down.svg?react";
import ArrowUpIcon from "../../../../assets/icon-arrow-up.svg?react";
import ClockIcon from "../../../../assets/icon-clock.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import type { Time, TimeWithPeriod } from "../../types/time";
import {
  formatTwoDigits,
  stepHour,
  stepMinute,
  to24HourTime,
  toTimeWithPeriod,
  togglePeriod,
  formatTime,
} from "../../utils/time";

import * as styles from "./index.css";

interface StepperButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  stepType: "up" | "down";
}
function StepperButton({ stepType, onClick }: StepperButtonProps) {
  return (
    <button className={styles.stepperButton} onClick={onClick}>
      {stepType === "up" ? (
        <ArrowUpIcon width={36} height={36} />
      ) : (
        <ArrowDownIcon width={36} height={36} />
      )}
    </button>
  );
}

interface TimePickerProps {
  meetingTime: Time | null;
  setMeetingTime: Dispatch<SetStateAction<Time | null>>;
}
export function TimePicker({ meetingTime, setMeetingTime }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const meetingTimeWithPeriod = meetingTime ? toTimeWithPeriod(meetingTime) : null;
  const timeString = meetingTimeWithPeriod ? formatTime(meetingTimeWithPeriod) : "-- -- : --";
  const [inputTime, setInputTime] = useState<TimeWithPeriod>(
    meetingTimeWithPeriod ?? {
      hours: 12,
      minutes: 0,
      period: "AM",
    },
  );

  const handleClickConfirmButton = () => {
    setMeetingTime(to24HourTime(inputTime));
    setIsOpen(false);
  };

  return (
    <>
      <button className={styles.trigger} onClick={() => setIsOpen((isOpen) => !isOpen)}>
        <ClockIcon width={24} height={24} /> {timeString}
      </button>
      <BottomSheet
        hasBackdrop
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onTapBackdrop={() => setIsOpen(false)}
      >
        <div className={styles.timePickArea}>
          <div className={styles.stepperGroup}>
            <div className={styles.timeGroup}>
              <div className={styles.stepper}>
                <StepperButton
                  stepType="up"
                  onClick={() =>
                    setInputTime((inputTime) => ({
                      ...inputTime,
                      hours: stepHour(inputTime.hours, "up"),
                    }))
                  }
                />
                <span>{formatTwoDigits(inputTime.hours)}</span>
                <StepperButton
                  stepType="down"
                  onClick={() =>
                    setInputTime((inputTime) => ({
                      ...inputTime,
                      hours: stepHour(inputTime.hours, "down"),
                    }))
                  }
                />
              </div>
              :
              <div className={styles.stepper}>
                <StepperButton
                  stepType="up"
                  onClick={() =>
                    setInputTime((inputTime) => ({
                      ...inputTime,
                      minutes: stepMinute(inputTime.minutes, "up"),
                    }))
                  }
                />
                {formatTwoDigits(inputTime.minutes)}
                <StepperButton
                  stepType="down"
                  onClick={() =>
                    setInputTime((inputTime) => ({
                      ...inputTime,
                      minutes: stepMinute(inputTime.minutes, "down"),
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles.stepper}>
              <StepperButton
                stepType="up"
                onClick={() =>
                  setInputTime((inputTime) => ({
                    ...inputTime,
                    period: togglePeriod(inputTime.period),
                  }))
                }
              />
              {inputTime.period}
              <StepperButton
                stepType="down"
                onClick={() =>
                  setInputTime((inputTime) => ({
                    ...inputTime,
                    period: togglePeriod(inputTime.period),
                  }))
                }
              />
            </div>
          </div>
          <button className={styles.confirmButton()} onClick={handleClickConfirmButton}>
            확인
          </button>
        </div>
      </BottomSheet>
    </>
  );
}

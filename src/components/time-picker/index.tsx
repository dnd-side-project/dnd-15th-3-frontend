import { useState, type ButtonHTMLAttributes, type Dispatch, type SetStateAction } from "react";

import ArrowDownIcon from "../../assets/icon-arrow-down.svg?react";
import ArrowUpIcon from "../../assets/icon-arrow-up.svg?react";
import ClockIcon from "../../assets/icon-clock.svg?react";
import type { Time, TimeWithPeriod } from "../../utils/time";
import {
  formatTwoDigits,
  stepHour,
  stepMinute,
  to24HourTime,
  toTimeWithPeriod,
  togglePeriod,
  formatTime,
} from "../../utils/time";
import { BottomSheet } from "../bottom-sheet";

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

const DEFAULT_TIME: TimeWithPeriod = { hours: 12, minutes: 0, period: "AM" };

interface TimePickerSheetProps {
  isOpen: boolean;
  time: Time | null;
  onConfirm: (time: Time) => void;
  onClose: () => void;
}

interface TimePickerProps {
  meetingTime: Time | null;
  setMeetingTime: Dispatch<SetStateAction<Time | null>>;
}

export function TimePickerSheet({ isOpen, time, onConfirm, onClose }: TimePickerSheetProps) {
  // 시트에서 돌린 값은 확인을 눌러야 밖으로 나간다. 다시 열면 바깥 값에서 시작한다.
  const [inputTime, setInputTime] = useState<TimeWithPeriod>(
    time ? toTimeWithPeriod(time) : DEFAULT_TIME,
  );
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setInputTime(time ? toTimeWithPeriod(time) : DEFAULT_TIME);
    }
  }

  return (
    <BottomSheet hasBackdrop isOpen={isOpen} onClose={onClose} onTapBackdrop={onClose}>
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
        <button
          className={styles.confirmButton()}
          onClick={() => onConfirm(to24HourTime(inputTime))}
        >
          확인
        </button>
      </div>
    </BottomSheet>
  );
}

export function TimePicker({ meetingTime, setMeetingTime }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeString = meetingTime ? formatTime(toTimeWithPeriod(meetingTime)) : "-- -- : --";

  return (
    <>
      <button className={styles.trigger} onClick={() => setIsOpen(true)}>
        <ClockIcon width={24} height={24} /> {timeString}
      </button>
      <TimePickerSheet
        isOpen={isOpen}
        time={meetingTime}
        onClose={() => setIsOpen(false)}
        onConfirm={(next) => {
          setMeetingTime(next);
          setIsOpen(false);
        }}
      />
    </>
  );
}

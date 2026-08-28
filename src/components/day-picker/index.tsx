import { DayPicker as ReactDayPicker } from "@daypicker/react";
import { Chevron as RdpChevron } from "@daypicker/react";
import type { Matcher } from "@daypicker/react";
import { ko } from "@daypicker/react/locale";
import { useState, type Dispatch, type SetStateAction, type ComponentProps } from "react";

import CalendarIcon from "@/assets/icon-calendar.svg?react";
import CaretLeftIcon from "@/assets/icon-caret-left.svg?react";
import CaretRightIcon from "@/assets/icon-caret-right.svg?react";
import { BottomSheet } from "@/components/bottom-sheet";
import { formatTwoDigits } from "@/utils/time";

import * as styles from "./index.css";

interface DayPickerSheetProps {
  isOpen: boolean;
  date: Date | undefined;
  onConfirm: (date: Date | undefined) => void;
  onClose: () => void;
  disabled?: Matcher | Matcher[];
}

interface DayPickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  disabled?: Matcher | Matcher[];
}

function Chevron({ orientation, ...props }: ComponentProps<typeof RdpChevron>) {
  if (orientation === "left") {
    return <CaretLeftIcon width={20} height={20} />;
  }
  if (orientation === "right") {
    return <CaretRightIcon width={20} height={20} />;
  }
  return <RdpChevron orientation={orientation} {...props} />;
}

export function DayPickerSheet({
  isOpen,
  date,
  onConfirm,
  onClose,
  disabled,
}: DayPickerSheetProps) {
  // 시트에서 고른 날짜는 확인을 눌러야 밖으로 나간다. 다시 열면 바깥 값에서 시작한다.
  const [inputDate, setInputDate] = useState(date);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setInputDate(date);
    }
  }

  return (
    <BottomSheet hasBackdrop isOpen={isOpen} onClose={onClose} onTapBackdrop={onClose}>
      <div className={styles.dayPickArea}>
        <ReactDayPicker
          className={styles.calendar}
          classNames={{
            month_caption: styles.monthCaption,
            weekdays: styles.weekdays,
            weekday: styles.weekday,
            nav: styles.navigation,
            month_grid: styles.monthGrid,
            day: styles.day,
            day_button: styles.dayButton,
            button_previous: styles.navigationButton,
            button_next: styles.navigationButton,
            selected: styles.selectedDay,
            today: "",
            outside: styles.outside,
          }}
          locale={ko}
          mode="single"
          selected={inputDate}
          onSelect={setInputDate}
          components={{
            Chevron: Chevron,
          }}
          formatters={{
            formatCaption: (date) => `${date.getFullYear()} ${date.getMonth() + 1}월`,
          }}
          defaultMonth={date}
          disabled={disabled}
        />
        <div className={styles.confirmButtonWrapper}>
          <button
            className={styles.confirmButton({ tone: inputDate ? "primary" : "secondary" })}
            onClick={() => onConfirm(inputDate)}
            disabled={!inputDate}
          >
            확인
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}

export function DayPicker({ date, setDate, disabled }: DayPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dateString = date
    ? `${formatTwoDigits(date.getFullYear() % 100)}.${formatTwoDigits(date.getMonth() + 1)}.${formatTwoDigits(date.getDate())}`
    : "YY.MM.DD";

  return (
    <>
      <button className={styles.trigger} onClick={() => setIsOpen(true)}>
        <CalendarIcon width={24} height={24} />
        {dateString}
      </button>
      <DayPickerSheet
        date={date}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={(next) => {
          setDate(next);
          setIsOpen(false);
        }}
        disabled={disabled}
      />
    </>
  );
}

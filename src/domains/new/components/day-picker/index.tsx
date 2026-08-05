import { DayPicker as ReactDayPicker } from "@daypicker/react";
import { Chevron as RdpChevron } from "@daypicker/react";
import { ko } from "@daypicker/react/locale";
import { useState, type Dispatch, type SetStateAction, type ComponentProps } from "react";

import CalendarIcon from "../../../../assets/icon-calendar.svg?react";
import CaretLeftIcon from "../../../../assets/icon-caret-left.svg?react";
import CaretRightIcon from "../../../../assets/icon-caret-right.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import { formatTwoDigits } from "../../utils/time";

import * as styles from "./index.css";

interface DayPickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}

function Chevron({ orientation }: ComponentProps<typeof RdpChevron>) {
  if (orientation === "left") {
    return <CaretLeftIcon width={20} height={20} />;
  }
  if (orientation === "right") {
    return <CaretRightIcon width={20} height={20} />;
  }
  return <RdpChevron />;
}

export function DayPicker({ date, setDate }: DayPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputDate, setInputDate] = useState<Date | undefined>(date);
  const dateString = date
    ? `${formatTwoDigits(date.getFullYear() % 100)}.${formatTwoDigits(date.getMonth() + 1)}.${formatTwoDigits(date.getDate())}`
    : "YY.MM.DD";
  const handleClickConfirmButton = () => {
    setDate(inputDate);
    setIsOpen(false);
  };
  return (
    <>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <CalendarIcon width={24} height={24} />
        {dateString}
      </button>
      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
          />
          <button
            className={styles.confirmButton({ tone: inputDate ? "primary" : "secondary" })}
            onClick={handleClickConfirmButton}
            disabled={!inputDate}
          >
            확인
          </button>
        </div>
      </BottomSheet>
    </>
  );
}

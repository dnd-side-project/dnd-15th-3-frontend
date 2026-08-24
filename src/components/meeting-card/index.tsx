import "@fontsource/montserrat/latin-400.css";
import CompleteConfetti from "@/assets/complete-confetti.svg?react";
import ArrowRightIcon from "@/assets/icon-arrow-right.svg?react";
import MomoLogo from "@/assets/logo-momo.svg?react";
import type { CourseDetail } from "@/domains/course/api/types";

import {
  arrow,
  body,
  card,
  confetti,
  dateStamp,
  footer,
  heartDrawing,
  momoImage,
  photoArea,
  placeName,
  route,
  routeItem,
  routeLabel,
  title,
} from "./index.css";

export interface MeetingCardProps {
  courseDetail: CourseDetail;
  meetingName: string;
  /** YYYY-MM-DD */
  meetingDate?: string;
  /** HH:mm */
  meetingTime?: string;
}

function formatDateTime(date: string, time: string) {
  return `${date.replace(/-/g, ".")} ${time}`;
}

export function MeetingCard({
  courseDetail,
  meetingName,
  meetingDate,
  meetingTime,
}: MeetingCardProps) {
  const { route: steps } = courseDetail;
  const dateLabel = meetingDate && meetingTime ? formatDateTime(meetingDate, meetingTime) : null;

  return (
    <article className={card}>
      <div className={photoArea}>
        <CompleteConfetti aria-hidden className={confetti} />
        <img alt="" className={momoImage} src="/static/complete-momo.webp" />
        {dateLabel ? <span className={dateStamp}>{dateLabel}</span> : null}
      </div>

      <img alt="" aria-hidden className={heartDrawing} src="/static/heart-drawing.webp" />

      <div className={body}>
        <h2 className={title}>{meetingName}</h2>
        <span className={routeLabel}>{"TODAY'S ROUTE"}</span>

        <div className={route}>
          {steps.map((step, index) => (
            <span className={routeItem} key={step.recommendationId}>
              <span className={placeName}>{step.name}</span>
              {index < steps.length - 1 ? <ArrowRightIcon aria-hidden className={arrow} /> : null}
            </span>
          ))}
        </div>
      </div>

      <div className={footer}>
        <MomoLogo aria-label="momo" height={9} role="img" width={36} />
      </div>
    </article>
  );
}

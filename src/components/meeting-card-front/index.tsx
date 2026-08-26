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
  size?: "small" | "medium" | "large";
}

function formatDateTime(date: string, time: string) {
  return `${date.replace(/-/g, ".")} ${time}`;
}

export function MeetingCard({
  courseDetail,
  meetingName,
  meetingDate,
  meetingTime,
  size = "medium",
}: MeetingCardProps) {
  const { route: steps } = courseDetail;
  const dateLabel = meetingDate && meetingTime ? formatDateTime(meetingDate, meetingTime) : null;

  const logoWidth = size === "small" ? 36 : size === "medium" ? 43 : 53;
  const logoHeight = size === "small" ? 9 : size === "medium" ? 11 : 13;

  return (
    <article className={card({ size })}>
      <div className={photoArea({ size })}>
        <CompleteConfetti aria-hidden className={confetti({ size })} />
        <img alt="" className={momoImage({ size })} src="/static/complete-momo.webp" />
        {dateLabel ? <span className={dateStamp({ size })}>{dateLabel}</span> : null}
      </div>

      <img alt="" aria-hidden className={heartDrawing({ size })} src="/static/heart-drawing.webp" />

      <div className={body({ size })}>
        <h2 className={title({ size })}>{meetingName}</h2>
        <span className={routeLabel({ size })}>{"TODAY'S ROUTE"}</span>

        <div className={route({ size })}>
          {steps.map((step, index) => (
            <span className={routeItem({ size })} key={step.recommendationId}>
              <span className={placeName({ size })}>{step.name}</span>
              {index < steps.length - 1 ? (
                <ArrowRightIcon aria-hidden className={arrow({ size })} />
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className={footer({ size })}>
        <MomoLogo aria-label="momo" height={logoHeight} role="img" width={logoWidth} />
      </div>
    </article>
  );
}

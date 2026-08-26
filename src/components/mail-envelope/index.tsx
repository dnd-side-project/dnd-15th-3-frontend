import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { MeetingCard } from "@/components/meeting-card-front";
import type { CourseDetail } from "@/domains/course/api/types";

import {
  baseLayer,
  cardLayer,
  coverLayer,
  envelope,
  flapCloseLayer,
  flapOpenLayer,
} from "./index.css";

export type MailEnvelopePhase = "closed" | "opening" | "card-rising";

export interface MailEnvelopeProps {
  courseDetail: CourseDetail;
  meetingName: string;
  /** YYYY-MM-DD */
  meetingDate?: string;
  /** HH:mm */
  meetingTime?: string;
  phase: MailEnvelopePhase;
}

// 카드가 봉투(높이 304) 위로 완전히 빠져나오도록 충분히 위로 올린다.
const CARD_RISE_Y = -190;

export function MailEnvelope({
  courseDetail,
  meetingName,
  meetingDate,
  meetingTime,
  phase,
}: MailEnvelopeProps) {
  const reduce = useReducedMotion();
  const isCardRising = phase === "card-rising";

  return (
    <div className={envelope}>
      <img alt="" aria-hidden className={baseLayer} src="/static/mail-cover-base.svg" />

      <motion.div
        animate={{
          x: "-50%",
          y: isCardRising ? CARD_RISE_Y : 0,
        }}
        className={cardLayer}
        initial={{ x: "-50%", y: 0 }}
        transition={{
          duration: reduce ? 0 : 0.6,
          ease: "easeOut",
        }}
      >
        <MeetingCard
          courseDetail={courseDetail}
          meetingDate={meetingDate}
          meetingName={meetingName}
          meetingTime={meetingTime}
          size="small"
        />
      </motion.div>

      <img alt="" aria-hidden className={coverLayer} src="/static/mail-cover.svg" />

      <div className={flapCloseLayer}>
        <AnimatePresence initial={false}>
          {phase === "closed" ? (
            <motion.img
              alt=""
              animate={{ opacity: 1, rotateX: 0 }}
              aria-hidden
              exit={{ opacity: 0, rotateX: -90 }}
              initial={{ opacity: 1, rotateX: 0 }}
              key="close"
              src="/static/mail-cover-top-close.svg"
              style={{ transformOrigin: "center top" }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeInOut" }}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <div className={flapOpenLayer}>
        <AnimatePresence initial={false}>
          {phase !== "closed" ? (
            <motion.img
              alt=""
              animate={{ opacity: 1, rotateX: 0 }}
              aria-hidden
              exit={{ opacity: 0, rotateX: 90 }}
              initial={{ opacity: 0, rotateX: 90 }}
              key="open"
              src="/static/mail-cover-top-open.svg"
              style={{ transformOrigin: "center bottom" }}
              transition={{ duration: reduce ? 0 : 0.5, ease: "easeInOut" }}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

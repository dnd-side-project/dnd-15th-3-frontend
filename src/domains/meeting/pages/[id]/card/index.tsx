import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

import DownloadIcon from "@/assets/icon-download.svg?react";
import { Layout } from "@/components/layout";
import { MailEnvelope, type MailEnvelopePhase } from "@/components/mail-envelope";
import { MeetingCardBack } from "@/components/meeting-card-back";
import { MeetingCard } from "@/components/meeting-card-front";
import { toast } from "@/components/toast/manager";
import { TopAppBar } from "@/components/top-app-bar";
import type { CourseDetail, CourseRouteStep } from "@/domains/course/api/types";
import { useCardDownload } from "@/hooks/use-card-download";

import {
  cardFlipPill,
  cardOverlay,
  cloud1,
  cloud2,
  clouds,
  downloadButton,
  envelopeCentered,
  envelopeStage,
  flipBack,
  flipContainer,
  flipFace,
  flipInner,
  mailButton,
  mailImage,
  mailWrapper,
  pill,
  postbox,
  postboxStage,
  previewBack,
  previewCard,
  previewFront,
  previewStage,
  root,
  shareButton,
  shareSection,
  stage,
} from "./index.css";

// TODO: 실제 meeting id 에 해당하는 courseDetail 을 API 로 불러와 교체.
const sampleRoute: CourseRouteStep[] = [
  {
    recommendationId: "rec-1",
    placeId: "place-1",
    order: 1,
    name: "성수다이닝",
    category: "음식",
    categorySlug: "restaurant",
    address: "서울 성동구 성수동",
    primaryImageUrl: null,
    longitude: 127.056,
    latitude: 37.544,
    walkDurationToNextMin: 8,
  },
  {
    recommendationId: "rec-2",
    placeId: "place-2",
    order: 2,
    name: "서울숲",
    category: "문화",
    categorySlug: "culture",
    address: "서울 성동구 성수동",
    primaryImageUrl: null,
    longitude: 127.044,
    latitude: 37.547,
    walkDurationToNextMin: 5,
  },
  {
    recommendationId: "rec-3",
    placeId: "place-3",
    order: 3,
    name: "왕십리골목",
    category: "여가",
    categorySlug: "activity",
    address: "서울 성동구 행당동",
    primaryImageUrl: null,
    longitude: 127.043,
    latitude: 37.561,
    walkDurationToNextMin: 3,
  },
];

const sampleCourseDetail: CourseDetail = {
  courseName: "성수 다이닝 코스",
  totalDistanceKm: 2.1,
  totalCount: 3,
  route: sampleRoute,
};

const sampleMeetingName = "다같이 으쌰으쌰";
const sampleMeetingDate = "2026-08-25";
const sampleMeetingTime = "13:00";

type Phase = "idle" | "camera-up" | "flap-open" | "card-rise" | "grow" | "done";

// 단계별 누적 타이밍(ms). motion duration 합 + 단계 간 짧은 대기.
const TIMING = {
  cameraUp: 600,
  flapOpen: 700,
  cardRise: 1300,
  grow: 2000,
  done: 2400,
} as const;

export function CardPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const t = (ms: number) => (reduce ? 0 : ms);

  const [preview, setPreview] = useState(false);
  const [previewFrontFlipped, setPreviewFrontFlipped] = useState(false);
  const [previewBackFlipped, setPreviewBackFlipped] = useState(false);
  const frontDownloadRef = useRef<HTMLDivElement>(null);
  const backDownloadRef = useRef<HTMLDivElement>(null);
  const { download } = useCardDownload();

  const meetingUrl = typeof window !== "undefined" ? `${window.location.origin}/meeting/1` : "";

  const handleMailClick = () => {
    if (phase !== "idle") {
      return;
    }
    setPhase("camera-up");
    window.setTimeout(() => setPhase("flap-open"), t(TIMING.flapOpen));
    window.setTimeout(() => setPhase("card-rise"), t(TIMING.cardRise));
    window.setTimeout(() => setPhase("grow"), t(TIMING.grow));
    window.setTimeout(() => setPhase("done"), t(TIMING.done));
  };

  const handleCardClick = () => {
    if (phase === "done") {
      setFlipped((prev) => !prev);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sampleMeetingName,
          url: meetingUrl,
        });
        toast.add({ title: "모임링크가 공유되었습니다." });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(meetingUrl);
      toast.add({ title: "모임링크가 클립보드에 복사되었습니다." });
    }
  };

  const handleDownload = async () => {
    setPreview(true);
    await download(frontDownloadRef.current, "meeting-card-front");
    await download(backDownloadRef.current, "meeting-card-back");
    toast.add({ title: "모임카드 이미지를 저장했습니다." });
  };

  const stageDuration = reduce ? 0 : TIMING.cameraUp / 1000;

  const envelopePhase: MailEnvelopePhase =
    phase === "flap-open"
      ? "opening"
      : phase === "card-rise" || phase === "grow"
        ? "card-rising"
        : "closed";

  const envelopeVisible = phase !== "idle";
  const envelopeOpacity = phase === "grow" || phase === "done" ? 0 : envelopeVisible ? 1 : 0;
  const largeCardOpacity = phase === "grow" || phase === "done" ? 1 : 0;

  const cardProps = {
    courseDetail: sampleCourseDetail,
    meetingName: sampleMeetingName,
    meetingDate: sampleMeetingDate,
    meetingTime: sampleMeetingTime,
  };

  return (
    <Layout>
      <div className={root}>
        <div className={clouds}>
          <img alt="" aria-hidden className={cloud1} src="/static/cloud.svg" />
          <img alt="" aria-hidden className={cloud2} src="/static/cloud.svg" />
        </div>
        <TopAppBar background="transparent" onBack={() => void navigate(-1)} title="" />
        <div className={stage}>
          <motion.div
            animate={{ y: phase === "idle" ? 0 : "100%" }}
            className={postboxStage}
            transition={{ duration: stageDuration, ease: "easeInOut" }}
          >
            <img alt="" aria-hidden className={postbox} src="/static/postbox.svg" />
            <span className={pill}>편지를 클릭해 확인하세요!</span>
            <div className={mailWrapper}>
              <button
                aria-label="편지 확인하기"
                className={mailButton}
                onClick={handleMailClick}
                type="button"
              >
                <img alt="" aria-hidden className={mailImage} src="/static/mail.svg" />
              </button>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: phase === "idle" ? "-100%" : 0 }}
            className={envelopeStage}
            transition={{ duration: stageDuration, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {envelopeVisible ? (
                <motion.div
                  animate={{ opacity: envelopeOpacity }}
                  className={envelopeCentered}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                >
                  <MailEnvelope phase={envelopePhase} {...cardProps} />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div
              animate={{ opacity: largeCardOpacity }}
              className={envelopeCentered}
              initial={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              {preview ? (
                <div className={previewStage}>
                  <div
                    className={`${previewCard} ${previewFront}`}
                    onClick={() => setPreviewFrontFlipped((p) => !p)}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className={flipInner}
                      style={{
                        transform: previewFrontFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div className={flipFace}>
                        <MeetingCard size="small" {...cardProps} />
                      </div>
                      <div className={`${flipFace} ${flipBack}`}>
                        <MeetingCardBack
                          courseDetail={sampleCourseDetail}
                          meetingUrl={meetingUrl}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${previewCard} ${previewBack}`}
                    onClick={() => setPreviewBackFlipped((p) => !p)}
                    role="button"
                    tabIndex={0}
                  >
                    <div
                      className={flipInner}
                      style={{
                        transform: previewBackFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                      }}
                    >
                      <div className={flipFace}>
                        <MeetingCardBack
                          courseDetail={sampleCourseDetail}
                          meetingUrl={meetingUrl}
                          size="small"
                        />
                      </div>
                      <div className={`${flipFace} ${flipBack}`}>
                        <MeetingCard size="small" {...cardProps} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  {phase === "done" ? (
                    <span className={cardFlipPill}>카드를 뒤집어 코스를 확인해보세요!</span>
                  ) : null}
                  <div style={{ position: "relative" }}>
                    <div className={cardOverlay} />
                    <div
                      className={flipContainer}
                      onClick={handleCardClick}
                      role="button"
                      tabIndex={0}
                    >
                      <div
                        className={flipInner}
                        style={{ transform: flipped ? "rotateY(-180deg)" : "rotateY(0deg)" }}
                      >
                        <div className={flipFace}>
                          <MeetingCard size="large" {...cardProps} />
                        </div>
                        <div className={`${flipFace} ${flipBack}`}>
                          <MeetingCardBack meetingUrl={meetingUrl} size="large" {...cardProps} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {phase === "done" ? (
          <div className={shareSection}>
            <button className={downloadButton} onClick={handleDownload} type="button">
              <DownloadIcon aria-hidden width={24} height={24} />
              이미지 저장
            </button>
            <button className={shareButton} onClick={handleShare} type="button">
              공유하기
            </button>
          </div>
        ) : null}
      </div>

      <div
        ref={frontDownloadRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <MeetingCard size="large" {...cardProps} />
      </div>
      <div
        ref={backDownloadRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <MeetingCardBack meetingUrl={meetingUrl} size="large" {...cardProps} />
      </div>
    </Layout>
  );
}

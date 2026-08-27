import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import DownloadIcon from "@/assets/icon-download.svg?react";
import { Layout } from "@/components/layout";
import { MailEnvelope, type MailEnvelopePhase } from "@/components/mail-envelope";
import { MeetingCardBack } from "@/components/meeting-card-back";
import { MeetingCard } from "@/components/meeting-card-front";
import { toast } from "@/components/toast/manager";
import { TopAppBar } from "@/components/top-app-bar";
import { courseQueries } from "@/domains/course/api/queries";
import { meetingQueries } from "@/domains/meeting/api/queries";
import { useMeeting } from "@/domains/meeting/hooks";
import { useCardDownload } from "@/hooks/use-card-download";
import { getAccessToken } from "@/utils/access-token";

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
  const { id = "" } = useParams();
  const accessToken = getAccessToken(id);
  const { data: meeting } = useMeeting();
  const { data: status } = useQuery(meetingQueries.status(id, accessToken));
  const confirmedCourseId = status?.confirmedCourseCandidateId ?? "";
  const { data: courseDetail } = useQuery(courseQueries.detail(id, confirmedCourseId, accessToken));

  const [phase, setPhase] = useState<Phase>("idle");
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const t = (ms: number) => (reduce ? 0 : ms);

  const [preview, setPreview] = useState(false);
  const [previewFrontFlipped, setPreviewFrontFlipped] = useState(false);
  const [previewBackFlipped, setPreviewBackFlipped] = useState(false);
  const frontDownloadRef = useRef<HTMLDivElement>(null);
  const backDownloadRef = useRef<HTMLDivElement>(null);
  const { downloadCombined } = useCardDownload();

  const meetingUrl =
    typeof window !== "undefined" && meeting
      ? `${window.location.origin}/meeting/${meeting.id}`
      : "";

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
          title: meeting?.name ?? "",
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
    const ok = await downloadCombined(
      frontDownloadRef.current,
      backDownloadRef.current,
      "meeting-card",
    );
    toast.add({ title: ok ? "모임카드 이미지를 저장했습니다." : "이미지 저장에 실패했습니다." });
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
    courseDetail: courseDetail ?? { courseName: "", totalDistanceKm: 0, totalCount: 0, route: [] },
    meetingName: meeting?.name ?? "",
    meetingDate: meeting?.date ?? "",
    meetingTime: meeting?.time ?? "",
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
            {phase === "idle" || phase === "camera-up" ? (
              <>
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
              </>
            ) : null}
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
                        <MeetingCardBack meetingUrl={meetingUrl} size="small" {...cardProps} />
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
                        <MeetingCardBack meetingUrl={meetingUrl} size="small" {...cardProps} />
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

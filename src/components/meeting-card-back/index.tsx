import { QRCodeSVG } from "qrcode.react";

import MomoLogo from "@/assets/logo-momo.svg?react";
import type { CourseDetail, CourseRouteStep } from "@/domains/course/api/types";
import { MeetingMap, type MeetingMapPlace } from "@/domains/meeting/components/meeting-map";

import { card, footer, mapArea, mapStage, qrCode } from "./index.css";

export interface MeetingCardBackProps {
  courseDetail: CourseDetail;
  /** QR 에 인코딩할 모임 링크. `${origin}/meeting/${id}` */
  meetingUrl: string;
  size?: "medium" | "large";
}

function toMapPlace(step: CourseRouteStep): MeetingMapPlace {
  return {
    id: step.recommendationId,
    name: step.name,
    latitude: step.latitude,
    longitude: step.longitude,
    previewUrl: step.primaryImageUrl,
  };
}

export function MeetingCardBack({
  courseDetail,
  meetingUrl,
  size = "medium",
}: MeetingCardBackProps) {
  const places = courseDetail.route.map(toMapPlace);

  const logoWidth = size === "medium" ? 36 : 53;
  const logoHeight = size === "medium" ? 9 : 13;
  const qrSize = size === "medium" ? 32 : 47;

  return (
    <article className={card({ size })}>
      <div className={mapArea({ size })}>
        <div className={mapStage({ size })}>
          <MeetingMap
            interactive={false}
            level={6}
            places={places}
            routeLineColor="#3793FF"
            tone="blue"
          />
        </div>
        <QRCodeSVG
          aria-label="모임 링크 QR 코드"
          bgColor="transparent"
          className={qrCode({ size })}
          level="M"
          size={qrSize}
          value={meetingUrl}
        />
      </div>

      <div className={footer({ size })}>
        <MomoLogo aria-label="momo" height={logoHeight} role="img" width={logoWidth} />
      </div>
    </article>
  );
}

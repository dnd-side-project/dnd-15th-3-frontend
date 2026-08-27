import { QRCodeSVG } from "qrcode.react";

import MomoLogo from "@/assets/logo-momo.svg?react";
import type { CourseDetail, CourseRouteStep } from "@/domains/course/api/types";
import { MeetingMapOsm, type MeetingMapPlace } from "@/domains/meeting/components/meeting-map-osm";

import { card, footer, mapArea, mapStage, qrCode } from "./index.css";

export interface MeetingCardBackProps {
  courseDetail: CourseDetail;
  /** QR 에 인코딩할 모임 링크. `${origin}/meeting/${id}` */
  meetingUrl: string;
  size?: "small" | "large";
}

function toMapPlace({ recommendationId: id, ...step }: CourseRouteStep): MeetingMapPlace {
  return { id, ...step };
}

export function MeetingCardBack({
  courseDetail,
  meetingUrl,
  size = "small",
}: MeetingCardBackProps) {
  const places = courseDetail.route.map(toMapPlace);

  const logoWidth = size === "large" ? 53 : 36;
  const logoHeight = size === "large" ? 13 : 9;
  const qrSize = size === "large" ? 47 : 32;
  const mapSize = size === "large" ? "large" : "medium";

  return (
    <article className={card({ size })}>
      <div className={mapArea({ size })}>
        <div className={mapStage({ size })}>
          <MeetingMapOsm
            level={6}
            places={places}
            routeLineColor="#3793FF"
            size={mapSize}
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

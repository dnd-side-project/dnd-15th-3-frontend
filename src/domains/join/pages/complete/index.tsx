import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router";

import LocationIcon from "../../../../assets/icon-marker.svg?react";
import { Confetti } from "../../../../components/confetti";
import { CtaButtonRow } from "../../../../components/cta-button";
import { previewInvitation } from "../../../meeting/api";
import type { JoinDraft } from "../../types/draft";

import {
  body,
  card,
  cardTitle,
  dateTimePill,
  description,
  footer,
  locationIcon,
  locationRow,
  momoImage,
  root,
  textSection,
  title,
} from "./index.css";

export function JoinCompletePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const { setValue } = useFormContext<JoinDraft>();

  const { data, isError } = useQuery({
    queryKey: ["meeting", "invitation-preview", code] as const,
    queryFn: () => previewInvitation(code),
    enabled: code.length > 0,
  });

  useEffect(() => {
    if (data) {
      setValue("invitationCode", data.invitationCode, { shouldValidate: true });
    }
  }, [data, setValue]);

  if (!code || isError) {
    return <Navigate to="/join/error" replace />;
  }
  if (!data) {
    return null;
  }

  return (
    <main className={root}>
      <Confetti />
      <section className={body}>
        <div className={textSection}>
          <h1 className={title}>모임 방에 초대되었습니다!</h1>
          <p className={description}>친구들과 함께 모임 장소를 정할 수 있어요</p>
        </div>
        <article className={card}>
          <div className={locationRow}>
            <LocationIcon className={locationIcon} />
            <span>{data.locationName}</span>
          </div>
          <h2 className={cardTitle}>{data.name}</h2>
          <div className={dateTimePill}>
            <span>{data.date.replace(/-/g, ".")}</span>
            <span>{data.time}</span>
          </div>
          <img alt="" className={momoImage} src="/static/momo-celebrate.webp" />
        </article>
      </section>
      <footer className={footer}>
        <CtaButtonRow
          onSecondary={() => navigate(-1)}
          primaryLabel="다음"
          onPrimary={() => void navigate("/join/profile")}
        />
      </footer>
    </main>
  );
}

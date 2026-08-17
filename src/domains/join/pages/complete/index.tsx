import { useNavigate } from "react-router";

import LocationIcon from "../../../../assets/icon-marker.svg?react";
import { CtaButtonRow } from "../../../../components/cta-button";

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

  return (
    <main className={root}>
      <section className={body}>
        <div className={textSection}>
          <h1 className={title}>모임 방에 초대되었습니다!</h1>
          <p className={description}>친구들과 함께 모임 장소를 정할 수 있어요</p>
        </div>
        <article className={card}>
          <div className={locationRow}>
            <LocationIcon className={locationIcon} />
            <span>서울특별시 강남구</span>
          </div>
          <h2 className={cardTitle}>을지로·성수 나들이</h2>
          <div className={dateTimePill}>
            <span>2026.07.25</span>
            <span>13:00</span>
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

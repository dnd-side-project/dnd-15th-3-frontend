import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import CaretLeftIcon from "../../../../../../assets/icon-caret-left.svg?react";
import PlusIcon from "../../../../../../assets/icon-plus.svg?react";
import { Layout } from "../../../../../../components/layout";
import { PlaceIcon } from "../../../../../../components/place-icon";
import { useCategorySlug } from "../../../../../catalog/hooks";
import { getAccessToken } from "../../../../access-token";
import { meetingQueries } from "../../../../api/queries";
import { MeetingMap } from "../../../../components/meeting-map";

import {
  addButton,
  address,
  addressLabel,
  addressValue,
  backButton,
  externalLink,
  externalLogo,
  grabber,
  grabberBar,
  header,
  headerTitle,
  name as nameStyle,
  photo,
  photos,
  sheet,
  status,
  summary,
  summaryTexts,
} from "./index.css";
import { root } from "../index.css";

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { id = "", placeId = "" } = useParams();
  const { data: meeting } = useQuery(meetingQueries.detail(id, getAccessToken(id)));
  const categoryOf = useCategorySlug();

  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const place = recommendation?.place ?? meeting?.firstLocation;
  const slug = categoryOf(recommendation?.categoryId ?? "");

  return (
    <Layout>
      <div className={root}>
        <MeetingMap places={place === undefined ? [] : [place]} />

        <div className={sheet}>
          <div className={grabber}>
            <span className={grabberBar} />
          </div>

          <div className={header}>
            <button
              aria-label="뒤로 가기"
              className={backButton}
              type="button"
              onClick={() => void navigate(-1)}
            >
              <CaretLeftIcon aria-hidden height={24} width={24} />
            </button>
            <span className={headerTitle}>장소상세</span>
            <span />
          </div>

          {place === undefined ? (
            <p className={status}>장소 정보를 찾지 못했어요</p>
          ) : (
            <>
              <div className={photos}>
                <img alt="" className={photo} src="/static/meeting-course-map.webp" />
              </div>

              <div className={summary}>
                <div className={summaryTexts}>
                  <span className={nameStyle}>
                    <PlaceIcon category={slug} size={20} />
                    {place.name}
                  </span>
                  <span className={address}>
                    <span className={addressLabel}>주소</span>
                    <span className={addressValue}>{place.address}</span>
                  </span>
                </div>
                <button aria-label="코스에 담기" className={addButton} type="button">
                  <PlusIcon aria-hidden height={20} width={20} />
                </button>
              </div>

              <a
                className={externalLink}
                href={`https://map.kakao.com/link/search/${encodeURIComponent(place.name)}`}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" className={externalLogo} src="/static/kakaomap-logo.webp" />
                상세정보 보러가기
              </a>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

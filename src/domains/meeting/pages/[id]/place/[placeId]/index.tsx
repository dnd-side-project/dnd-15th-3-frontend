import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import CaretLeftIcon from "../../../../../../assets/icon-caret-left.svg?react";
import PlusIcon from "../../../../../../assets/icon-plus.svg?react";
import { PlaceIcon } from "../../../../../../components/place-icon";
import { catalogQueries } from "../../../../../catalog/api/queries";
import { useCategorySlug } from "../../../../../catalog/hooks";
import { MapScreen } from "../../../../components/map-screen";
import { useMeeting } from "../../../../hooks";

import { grabber, grabberBar } from "../index.css";
import {
  addButton,
  address as addressRow,
  addressLabel,
  addressValue,
  backButton,
  externalLink,
  externalLogo,
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

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { placeId = "" } = useParams();
  const { data: meeting } = useMeeting();
  const categoryOf = useCategorySlug();

  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const { data: detail } = useQuery(catalogQueries.placeDetail(placeId));

  // 상세가 오기 전에는 추천 목록에 있는 이름·주소로 먼저 그린다.
  const name = detail?.name ?? recommendation?.place.name;
  const address = detail?.address ?? recommendation?.place.address;
  const slug = detail?.categorySlug ?? categoryOf(recommendation?.categoryId ?? "");
  const photoUrls = detail?.imageUrls ?? [];

  return (
    <MapScreen>
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

        {name === undefined ? (
          <p className={status}>장소 정보를 불러오지 못했습니다.</p>
        ) : (
          <>
            <div className={photos}>
              {photoUrls.length === 0 ? (
                <span className={photo} />
              ) : (
                photoUrls.map((imageUrl, index) => (
                  <img
                    alt={`${name} 사진 ${index + 1}`}
                    className={photo}
                    key={imageUrl}
                    src={imageUrl}
                  />
                ))
              )}
            </div>

            <div className={summary}>
              <div className={summaryTexts}>
                <span className={nameStyle}>
                  <PlaceIcon category={slug} size={20} />
                  {name}
                </span>
                <span className={addressRow}>
                  <span className={addressLabel}>주소</span>
                  <span className={addressValue}>{address}</span>
                </span>
              </div>
              <button aria-label="코스에 담기" className={addButton} type="button">
                <PlusIcon aria-hidden height={20} width={20} />
              </button>
            </div>

            <a
              className={externalLink}
              href={`https://map.kakao.com/link/search/${encodeURIComponent(name)}`}
              rel="noreferrer"
              target="_blank"
            >
              <img alt="" className={externalLogo} src="/static/kakaomap-logo.webp" />
              상세정보 보러가기
            </a>
          </>
        )}
      </div>
    </MapScreen>
  );
}

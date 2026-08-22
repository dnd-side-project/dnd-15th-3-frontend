import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArrowsClockwiseIcon from "../../../../../../assets/icon-arrows-clockwise.svg?react";
import CaretLeftIcon from "../../../../../../assets/icon-caret-left.svg?react";
import PlusIcon from "../../../../../../assets/icon-plus.svg?react";
import { PlaceIcon } from "../../../../../../components/place-icon";
import { getAccessToken } from "../../../../../../utils/access-token";
import { catalogQueries } from "../../../../../catalog/api/queries";
import { useCategories, useCategorySlug } from "../../../../../catalog/hooks";
import { MapScreen, MapSheet } from "../../../../components/map-screen";
import { useMeeting } from "../../../../hooks";

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
  refresh,
  sheetLayout,
  similar,
  similarAddButton,
  similarAddress,
  similarList,
  similarName,
  similarPlace,
  similarTexts,
  similarThumbnail,
  similarTitle,
  status,
  summary,
  summaryTexts,
} from "./index.css";

const SIMILAR_COUNT = 4;
const POOL_SIZE = 20;

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { id = "", placeId = "" } = useParams();
  const { data: meeting } = useMeeting();
  const categoryOf = useCategorySlug();
  const categories = useCategories();

  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const { data: detail } = useQuery(catalogQueries.placeDetail(placeId));

  // 상세가 오기 전에는 추천 목록에 있는 이름·주소로 먼저 그린다.
  const name = detail?.name ?? recommendation?.place.name;
  const address = detail?.address ?? recommendation?.place.address;
  const slug = detail?.categorySlug ?? categoryOf(recommendation?.categoryId ?? "");
  const photoUrls = detail?.imageUrls ?? [];

  // 비슷한 장소는 같은 카테고리의 주변 장소에서 고른다.
  const { data: places } = useQuery(
    catalogQueries.places({
      meetingId: id,
      accessToken: getAccessToken(id),
      categoryId: categories.find((category) => category.slug === slug)?.id,
      size: POOL_SIZE,
    }),
  );
  const pool = (places?.items ?? []).filter((item) => item.id !== placeId);
  // 추천받기를 누르면 받아 둔 목록에서 다음 네 곳으로 넘어간다.
  const [from, setFrom] = useState(0);
  const similarPlaces = [...pool, ...pool].slice(from, from + SIMILAR_COUNT);

  return (
    <MapScreen>
      <MapSheet className={sheetLayout}>
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

            {similarPlaces.length === 0 ? null : (
              <div className={similar}>
                <h2 className={similarTitle}>이 장소와 비슷한 장소에요!</h2>

                <div className={similarList}>
                  {similarPlaces.map((place) => (
                    <button
                      className={similarPlace}
                      key={place.id}
                      type="button"
                      onClick={() => void navigate(`/meeting/${id}/place/${place.id}`)}
                    >
                      {place.previewUrl === null ? (
                        <span className={similarThumbnail} />
                      ) : (
                        <img alt="" className={similarThumbnail} src={place.previewUrl} />
                      )}
                      <span className={similarTexts}>
                        <span className={similarName}>
                          <PlaceIcon category={place.category.slug} size={20} />
                          {place.name}
                        </span>
                        <span className={similarAddress}>{place.address}</span>
                      </span>
                      <span aria-hidden className={similarAddButton}>
                        <PlusIcon height={16} width={16} />
                      </span>
                    </button>
                  ))}
                </div>

                {pool.length <= SIMILAR_COUNT ? null : (
                  <button
                    className={refresh}
                    type="button"
                    onClick={() => setFrom((from + SIMILAR_COUNT) % pool.length)}
                  >
                    <ArrowsClockwiseIcon aria-hidden height={16} width={16} />
                    다른 장소 추천받기
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </MapSheet>
    </MapScreen>
  );
}

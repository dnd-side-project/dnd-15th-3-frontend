import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArrowsClockwiseIcon from "../../../../../../assets/icon-arrows-clockwise.svg?react";
import CaretLeftIcon from "../../../../../../assets/icon-caret-left.svg?react";
import PlusIcon from "../../../../../../assets/icon-plus.svg?react";
import { PlaceIcon } from "../../../../../../components/place-icon";
import { toast } from "../../../../../../components/toast/manager";
import { getAccessToken } from "../../../../../../utils/access-token";
import { catalogQueries } from "../../../../../catalog/api/queries";
import { useCategorySlug } from "../../../../../catalog/hooks";
import { addRecommendation } from "../../../../api";
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
  similarName,
  similarOpen,
  similarPlace,
  similarTexts,
  similarThumbnail,
  similarTitle,
  status,
  summary,
  summaryTexts,
} from "./index.css";

export function PlaceDetailPage() {
  const navigate = useNavigate();
  const { id = "", placeId = "" } = useParams();
  const queryClient = useQueryClient();
  const { data: meeting } = useMeeting();
  const categoryOf = useCategorySlug();

  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const { data: detail } = useQuery(catalogQueries.placeDetail(placeId));

  // 상세가 오기 전에는 추천 목록에 있는 이름·주소로 먼저 그린다.
  const name = detail?.name ?? recommendation?.place.name;
  const address = detail?.address ?? recommendation?.place.address;
  const slug = detail?.categorySlug ?? categoryOf(recommendation?.categoryId ?? "");
  const photoUrls = detail?.imageUrls ?? [];

  const [excludeIds, setExcludeIds] = useState<string[]>([]);
  const { data: similarPlaces = [] } = useQuery(
    catalogQueries.similarPlaces({
      meetingId: id,
      placeId,
      accessToken: getAccessToken(id),
      excludeIds,
      size: 4,
    }),
  );

  const { mutate: addPlace } = useMutation({
    mutationFn: (target: string) => addRecommendation(id, getAccessToken(id), target),
    onSuccess: () => {
      toast.add({ title: "장소가 저장되었습니다." });
      return queryClient.invalidateQueries({ queryKey: ["meeting", id] });
    },
  });

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
              <button
                aria-label="코스에 담기"
                className={addButton}
                type="button"
                onClick={() => addPlace(placeId)}
              >
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

                {similarPlaces.map((place) => (
                  <div className={similarPlace} key={place.id}>
                    <button
                      className={similarOpen}
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
                          <PlaceIcon category={categoryOf(place.categoryId)} size={20} />
                          {place.name}
                        </span>
                        <span className={similarAddress}>{place.address}</span>
                      </span>
                    </button>
                    <button
                      aria-label={`${place.name} 코스에 담기`}
                      className={similarAddButton}
                      type="button"
                      onClick={() => addPlace(place.id)}
                    >
                      <PlusIcon aria-hidden height={16} width={16} />
                    </button>
                  </div>
                ))}

                <button
                  className={refresh}
                  type="button"
                  onClick={() => setExcludeIds(similarPlaces.map((place) => place.id))}
                >
                  <ArrowsClockwiseIcon aria-hidden height={16} width={16} />
                  다른 장소 추천받기
                </button>
              </div>
            )}
          </>
        )}
      </MapSheet>
    </MapScreen>
  );
}

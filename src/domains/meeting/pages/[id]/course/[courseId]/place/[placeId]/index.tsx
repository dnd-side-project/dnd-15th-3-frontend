import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArrowsClockwiseIcon from "@/assets/icon-arrows-clockwise.svg?react";
import CaretLeftIcon from "@/assets/icon-caret-left.svg?react";
import HeartIcon from "@/assets/icon-heart.svg?react";
import PlusIcon from "@/assets/icon-plus.svg?react";
import { PlaceIcon } from "@/components/place-icon";
import { PlacePhotoImage } from "@/components/place-photo";
import { toast } from "@/components/toast/manager";
import { catalogQueries } from "@/domains/catalog/api/queries";
import { useCategorySlug } from "@/domains/catalog/hooks";
import { addCoursePlace } from "@/domains/course/api";
import { courseQueries } from "@/domains/course/api/queries";
import { addRecommendation } from "@/domains/meeting/api";
import { MapScreen, MapSheet } from "@/domains/meeting/components/map-screen";
import { useMeeting } from "@/domains/meeting/hooks";
import { getAccessToken } from "@/utils/access-token";
import { ApiError } from "@/utils/http";

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
  scrollContent,
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

export function CoursePlaceDetailPage() {
  const navigate = useNavigate();
  const { id = "", courseId = "", placeId = "" } = useParams();
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(id);
  const { data: meeting } = useMeeting();
  const categoryOf = useCategorySlug();

  const { data: courseDetail } = useQuery(courseQueries.detail(id, courseId, accessToken));
  const { data: detail, isLoading } = useQuery(
    catalogQueries.placeDetail(placeId, id, accessToken),
  );

  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const routeStep = courseDetail?.route.find((step) => step.placeId === placeId);
  const saved = routeStep !== undefined;

  // 상세·추천·코스 루트 중 가장 먼저 있는 이름·주소로 그린다.
  const name = detail?.name ?? recommendation?.place.name ?? routeStep?.name;
  const address = detail?.address ?? recommendation?.place.address ?? routeStep?.address;
  const slug =
    detail?.categorySlug ?? routeStep?.categorySlug ?? categoryOf(recommendation?.categoryId ?? "");
  const placePhotos = detail?.photos ?? [];

  const [excludeIds, setExcludeIds] = useState<string[]>([]);
  const { data: similarPlaces = [] } = useQuery(
    catalogQueries.similarPlaces({
      meetingId: id,
      placeId,
      accessToken,
      excludeIds,
      size: 4,
    }),
  );

  const { mutate: addPlace } = useMutation({
    // 추천에 없는 장소는 먼저 추천에 올린 뒤 코스에 넣는다.
    mutationFn: async (target: string) => {
      const existing = meeting?.recommendations.find((item) => item.place.id === target);
      const recommendationId =
        existing?.id ?? (await addRecommendation(id, accessToken, { placeId: target })).id;
      return addCoursePlace(id, courseId, accessToken, { recommendationId });
    },
    onSuccess: () => {
      toast.add({ title: "장소가 저장되었습니다." });
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["course", id] }),
        queryClient.invalidateQueries({ queryKey: ["meeting", id] }),
      ]);
    },
    onError: (error) => {
      const message =
        error instanceof ApiError && error.status === 409
          ? "이미 추가된 장소입니다."
          : "장소를 추가하지 못했습니다.";
      toast.add({ title: message });
    },
  });

  return (
    <MapScreen gradient hideToggle>
      <MapSheet expandable className={sheetLayout}>
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

        <div className={scrollContent}>
          {isLoading ? (
            <p className={status}>장소 정보를 불러오는 중...</p>
          ) : name === undefined ? (
            <p className={status}>장소 정보를 불러오지 못했습니다.</p>
          ) : (
            <>
              <div className={photos}>
                {placePhotos.length === 0 ? (
                  <PlacePhotoImage category={slug} className={photo} photo={null} />
                ) : (
                  placePhotos.map((item, index) => (
                    <PlacePhotoImage
                      alt={`${name} 사진 ${index + 1}`}
                      category={slug}
                      className={photo}
                      key={item.id}
                      photo={item}
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
                  aria-label={saved ? "코스에 담김" : "코스에 담기"}
                  className={addButton({ saved })}
                  disabled={saved}
                  type="button"
                  onClick={() => addPlace(placeId)}
                >
                  {saved ? (
                    <HeartIcon aria-hidden height={20} width={20} />
                  ) : (
                    <PlusIcon aria-hidden height={20} width={20} />
                  )}
                </button>
              </div>

              <a
                className={externalLink}
                href={`https://map.kakao.com/link/search/${encodeURIComponent(`${address ?? ""} ${name}`)}`}
                rel="noreferrer"
                target="_blank"
              >
                <img alt="" className={externalLogo} src="/static/kakaomap-logo.webp" />
                상세정보 보러가기
              </a>

              {similarPlaces.length === 0 ? null : (
                <div className={similar}>
                  <h2 className={similarTitle}>이 장소와 비슷한 장소에요!</h2>

                  {similarPlaces.map((place) => {
                    const category = categoryOf(place.categoryId);

                    return (
                      <div className={similarPlace} key={place.id}>
                        <button
                          className={similarOpen}
                          type="button"
                          onClick={() =>
                            void navigate(`/meeting/${id}/course/${courseId}/place/${place.id}`)
                          }
                        >
                          <PlacePhotoImage
                            category={category}
                            className={similarThumbnail}
                            photo={place.previewPhoto}
                          />
                          <span className={similarTexts}>
                            <span className={similarName}>
                              <PlaceIcon category={category} size={20} />
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
                    );
                  })}

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
        </div>
      </MapSheet>
    </MapScreen>
  );
}

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
import { addRecommendation } from "@/domains/meeting/api";
import { MapScreen, MapSheet } from "@/domains/meeting/components/map-screen";
import { useMeeting } from "@/domains/meeting/hooks";
import { getAccessToken } from "@/utils/access-token";
import { getErrorMessage } from "@/utils/http";

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

  const [pending, setPending] = useState<Set<string>>(() => new Set());
  const recommendation = meeting?.recommendations.find((item) => item.place.id === placeId);
  const saved = recommendation !== undefined || pending.has(placeId);
  const { data: detail } = useQuery(catalogQueries.placeDetail(placeId, id, getAccessToken(id)));

  // 상세가 오기 전에는 추천 목록에 있는 이름·주소로 먼저 그린다.
  const name = detail?.name ?? recommendation?.place.name;
  const address = detail?.address ?? recommendation?.place.address;
  const slug = detail?.categorySlug ?? categoryOf(recommendation?.categoryId ?? "");
  const placePhotos = detail?.photos ?? [];

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

  const { mutateAsync: addPlace } = useMutation({
    mutationFn: (target: string) => addRecommendation(id, getAccessToken(id), { placeId: target }),
    onMutate: () => {
      toast.add({ title: "장소가 저장되었습니다." });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meeting", id] }),
    onError: (error) => {
      toast.add({ title: getErrorMessage(error, "장소를 추가하지 못했습니다.") });
    },
  });

  const isSaved = (target: string) =>
    meeting?.recommendations.some((item) => item.place.id === target) ?? false;

  async function handleAdd(target: string) {
    setPending((prev) => {
      const next = new Set(prev);
      next.add(target);
      return next;
    });
    try {
      await addPlace(target);
    } catch {
      // 실패 알림은 mutation 의 onError 가 담당한다.
    } finally {
      setPending((prev) => {
        const next = new Set(prev);
        next.delete(target);
        return next;
      });
    }
  }

  return (
    <MapScreen gradient>
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

        {name === undefined ? (
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
                onClick={() => void handleAdd(placeId)}
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

                {similarPlaces.map((place) => {
                  const saved = isSaved(place.id) || pending.has(place.id);
                  const category = categoryOf(place.categoryId);
                  return (
                    <div className={similarPlace} key={place.id}>
                      <button
                        className={similarOpen}
                        type="button"
                        onClick={() => void navigate(`/meeting/${id}/place/${place.id}`)}
                      >
                        <PlacePhotoImage
                          className={similarThumbnail}
                          photo={place.previewPhoto}
                          category={category}
                        />
                        <span className={similarTexts}>
                          <span className={similarName}>
                            <PlaceIcon category={categoryOf(place.categoryId)} size={20} />
                            {place.name}
                          </span>
                          <span className={similarAddress}>{place.address}</span>
                        </span>
                      </button>
                      <button
                        aria-label={
                          saved ? `${place.name} 코스에 담김` : `${place.name} 코스에 담기`
                        }
                        className={similarAddButton({ saved })}
                        disabled={saved}
                        type="button"
                        onClick={() => void handleAdd(place.id)}
                      >
                        {saved ? (
                          <HeartIcon aria-hidden height={16} width={16} />
                        ) : (
                          <PlusIcon aria-hidden height={16} width={16} />
                        )}
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
      </MapSheet>
    </MapScreen>
  );
}

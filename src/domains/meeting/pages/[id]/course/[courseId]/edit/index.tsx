import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PlusIcon from "@/assets/icon-plus.svg?react";
import PushPinIcon from "@/assets/icon-push-pin.svg?react";
import ThumbsDownIcon from "@/assets/icon-thumbs-down.svg?react";
import ThumbsUpIcon from "@/assets/icon-thumbs-up.svg?react";
import { Chip, ChipGroup } from "@/components/chip";
import { CtaButton } from "@/components/cta-button";
import { Layout } from "@/components/layout";
import { PlaceIcon } from "@/components/place-icon";
import { PlacePhotoImage } from "@/components/place-photo";
import { toast } from "@/components/toast/manager";
import { TopAppBar } from "@/components/top-app-bar";
import type { CategorySlug } from "@/domains/catalog/api/types";
import { useCategories } from "@/domains/catalog/hooks";
import { addCoursePlace, updateCoursePlaces } from "@/domains/course/api";
import { courseQueries } from "@/domains/course/api/queries";
import { CoursePlaceStrip } from "@/domains/course/components/course-place-strip";
import { getAccessToken } from "@/utils/access-token";

import {
  addPlaceButton,
  address,
  count,
  footer,
  name,
  preference,
  preferences,
  root,
  saved,
  savedList,
  savedPlace,
  savedTexts,
  savedTitle,
  selected,
  selectedTitle,
  status,
  summary,
  thumbnail,
} from "./index.css";

function Preference({ Icon, value }: { Icon: typeof ThumbsUpIcon; value: number }) {
  return (
    <span className={preference}>
      <Icon aria-hidden height={14} width={14} />
      <span className={count}>{value}</span>
    </span>
  );
}

export function CourseCandidateEditPage() {
  const navigate = useNavigate();
  const { id = "", courseId = "" } = useParams();
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(id);
  const categories = useCategories();

  const detailQuery = courseQueries.detail(id, courseId, accessToken);
  const { data: detail, isPending } = useQuery(detailQuery);
  const [category, setCategory] = useState<CategorySlug | undefined>(undefined);
  const { data: savedPlaces } = useQuery(
    courseQueries.excludedPlaces(id, courseId, accessToken, { category }),
  );

  const { mutate: addPlace } = useMutation({
    mutationFn: (recommendationId: string) =>
      addCoursePlace(id, courseId, accessToken, { recommendationId }),
    onSuccess: (saved) => queryClient.setQueryData(detailQuery.queryKey, saved),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["course", id] }),
  });

  const { mutate: save, isPending: isSaving } = useMutation({
    mutationFn: (recommendationIds: string[]) =>
      updateCoursePlaces(id, courseId, accessToken, { recommendationIds }),
    onSuccess: (saved) => queryClient.setQueryData(detailQuery.queryKey, saved),
  });

  if (isPending) {
    return (
      <Layout>
        <TopAppBar title="코스수정" onBack={() => void navigate(-1)} />
        <p className={status}>코스 불러오는 중</p>
      </Layout>
    );
  }

  const route = detail?.route ?? [];
  const savedItems = savedPlaces?.items ?? [];
  const inCourse = new Set(route.map((step) => step.recommendationId));

  const addToCourse = (recommendationId: string) => {
    if (inCourse.has(recommendationId)) {
      toast.add({ title: "이미 추가된 장소입니다." });
      return;
    }
    addPlace(recommendationId);
  };

  return (
    <Layout>
      <div className={root}>
        <TopAppBar title="코스수정" onBack={() => void navigate(-1)} />

        <section className={selected}>
          <h2 className={selectedTitle}>
            <PushPinIcon aria-hidden height={16} width={16} />
            현재 선택된 장소
          </h2>
          <p className={summary}>
            <span>이동거리</span>
            <b>{detail?.totalDistanceKm ?? 0}km</b>
            <span>방문 장소</span>
            <b>{route.length}</b>
          </p>
          <CoursePlaceStrip
            route={route}
            onAdd={() => void navigate(`/meeting/${id}/course/${courseId}/edit/place`)}
          />
        </section>

        <section className={saved}>
          <h2 className={savedTitle}>함께 저장된 장소</h2>

          <ChipGroup scroll>
            <Chip selected={category === undefined} onClick={() => setCategory(undefined)}>
              전체
            </Chip>
            {categories.map((item) => (
              <Chip
                key={item.slug}
                selected={category === item.slug}
                onClick={() => setCategory(item.slug)}
              >
                {item.name}
              </Chip>
            ))}
          </ChipGroup>

          <button
            className={addPlaceButton}
            type="button"
            onClick={() => void navigate(`/meeting/${id}/course/${courseId}/edit/place`)}
          >
            <PlusIcon aria-hidden height={20} width={20} />
            장소 추가
          </button>

          <div className={savedList}>
            {savedItems.map((place) => (
              <button
                className={savedPlace}
                key={place.recommendationId}
                type="button"
                onClick={() => addToCourse(place.recommendationId)}
              >
                <PlacePhotoImage
                  category={place.categorySlug}
                  className={thumbnail}
                  photo={place.previewPhoto}
                />
                <span className={savedTexts}>
                  <span className={name}>
                    <PlaceIcon category={place.categorySlug} size={20} />
                    {place.name}
                  </span>
                  <span className={address}>{place.address}</span>
                </span>
                <span className={preferences}>
                  <Preference Icon={ThumbsUpIcon} value={place.likeCount} />
                  <Preference Icon={ThumbsDownIcon} value={place.dislikeCount} />
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className={footer}>
          <CtaButton
            disabled={isSaving || route.length === 0}
            onClick={() => save(route.map((step) => step.recommendationId))}
          >
            해당 코스로 선택하기
          </CtaButton>
        </div>
      </div>
    </Layout>
  );
}

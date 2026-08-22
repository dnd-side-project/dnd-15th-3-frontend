import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";

import PushPinIcon from "../../../../../assets/icon-push-pin.svg?react";
import ThumbsDownIcon from "../../../../../assets/icon-thumbs-down.svg?react";
import ThumbsUpIcon from "../../../../../assets/icon-thumbs-up.svg?react";
import { Chip, ChipGroup } from "../../../../../components/chip";
import { CtaButton } from "../../../../../components/cta-button";
import { Layout } from "../../../../../components/layout";
import { PlaceIcon } from "../../../../../components/place-icon";
import { toast } from "../../../../../components/toast/manager";
import { TopAppBar } from "../../../../../components/top-app-bar";
import { getAccessToken } from "../../../../../utils/access-token";
import type { CategorySlug } from "../../../../catalog/api/types";
import { useCategories } from "../../../../catalog/hooks";
import { addCoursePlace, updateCoursePlaces } from "../../../../course/api";
import { courseQueries } from "../../../../course/api/queries";
import { CoursePlaceStrip } from "../../../../course/components/course-place-strip";
import { useMeeting } from "../../../hooks";

import {
  chips,
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
  texts,
  thumbnail,
} from "./index.css";

export function CourseEditPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(id);
  const categories = useCategories();

  const { data: meeting, isPending } = useMeeting();
  const courseId = meeting?.selectedCourse?.id ?? "";

  const [category, setCategory] = useState<CategorySlug | undefined>(undefined);
  const detailQuery = courseQueries.detail(id, courseId, accessToken);
  const { data: detail } = useQuery(detailQuery);
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
    onSuccess: () => void navigate(`/meeting/${id}/detail`, { replace: true }),
  });

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <TopAppBar title="코스수정" onBack={() => void navigate(-1)} />
        <p className={status}>코스 불러오는 중</p>
      </Layout>
    );
  }

  if (meeting.selectedCourse === null) {
    return <Navigate replace to={`/meeting/${id}`} />;
  }

  const route = detail?.route ?? [];
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
            <b>{detail?.totalCount ?? 0}</b>
          </p>
          <CoursePlaceStrip route={route} onAdd={() => void navigate(`/meeting/${id}/place`)} />
        </section>

        <section className={saved}>
          <h2 className={savedTitle}>함께 저장된 장소</h2>

          <div className={chips}>
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
          </div>

          <div className={savedList}>
            {(savedPlaces?.items ?? []).map((place) => (
              <button
                className={savedPlace}
                key={place.recommendationId}
                type="button"
                onClick={() => addToCourse(place.recommendationId)}
              >
                {place.primaryImageUrl === undefined ? (
                  <span className={thumbnail} />
                ) : (
                  <img alt="" className={thumbnail} src={place.primaryImageUrl} />
                )}
                <span className={savedTexts}>
                  <span className={name}>
                    <PlaceIcon category={place.categorySlug} size={20} />
                    {place.name}
                  </span>
                  <span className={texts}>{place.address}</span>
                </span>
                <span className={preferences}>
                  <span className={preference}>
                    <ThumbsUpIcon aria-hidden height={14} width={14} />
                    <span className={count}>{place.likeCount}</span>
                  </span>
                  <span className={preference}>
                    <ThumbsDownIcon aria-hidden height={14} width={14} />
                    <span className={count}>{place.dislikeCount}</span>
                  </span>
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

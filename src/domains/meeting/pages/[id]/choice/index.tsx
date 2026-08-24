import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretDownIcon from "@/assets/icon-caret-down.svg?react";
import CaretRightIcon from "@/assets/icon-caret-right.svg?react";
import { Chip, ChipGroup } from "@/components/chip";
import { CtaButton } from "@/components/cta-button";
import { Layout } from "@/components/layout";
import { PlaceIcon } from "@/components/place-icon";
import { Popup } from "@/components/popup";
import { PreferenceButton } from "@/components/preference-button";
import { Toggle } from "@/components/toggle";
import type { CategorySlug } from "@/domains/catalog/api/types";
import { useCategories, useCategorySlug } from "@/domains/catalog/hooks";
import { updatePlacePreference } from "@/domains/meeting/api";
import type { RecommendationPreview, ViewerPreference } from "@/domains/meeting/api/types";
import { useCourseGeneration, useMeeting } from "@/domains/meeting/hooks";
import { palette } from "@/styles/palette";
import { getAccessToken } from "@/utils/access-token";

import {
  bar,
  card,
  cardAddress,
  cardBody,
  cardCaret,
  cardHeader,
  cardImage,
  cardLink,
  cardName,
  cardScrim,
  cardTexts,
  column,
  count as countStyle,
  emptyDescription,
  emptyPreview,
  emptyPreviewCard,
  emptyState,
  emptyTexts,
  emptyTitle,
  filters,
  footer,
  grid,
  retry,
  preferences,
  root,
  sort,
  status,
  toggle,
} from "./index.css";

type Filter = CategorySlug | "all";

type Preference = ViewerPreference | null;

interface PreferenceChange {
  recommendationId: string;
  preference: Preference;
}

/** 왼쪽·오른쪽 열이 6장 주기로 반복하는 카드 높이 */
const CARD_HEIGHTS = [
  [249, 164, 212],
  [212, 164, 249],
];

/** 빈 상태에 놓는 카드 모양 장식 */
const PREVIEW_CARDS = [
  { left: 14, top: 14, height: 82 },
  { left: 68, top: 14, height: 44 },
  { left: 68, top: 63, height: 68 },
  { left: 14, top: 102, height: 44, background: palette.blue28 },
];

function RecommendationCard({
  recommendation,
  height,
  slug,
  onOpen,
  onPreferenceChange,
}: {
  recommendation: RecommendationPreview;
  height: number;
  slug: CategorySlug;
  onOpen: () => void;
  onPreferenceChange: (preference: Preference) => void;
}) {
  const { place } = recommendation;

  return (
    <div className={card} style={{ height }}>
      {place.previewUrl === null ? (
        <span aria-hidden className={cardImage} />
      ) : (
        <img alt="" className={cardImage} src={place.previewUrl} />
      )}
      <span aria-hidden className={cardScrim} />
      <button aria-label={place.name} className={cardLink} type="button" onClick={onOpen} />
      <span className={cardBody}>
        <span className={cardHeader}>
          <span className={cardTexts}>
            <span className={cardName}>
              <PlaceIcon category={slug} size={16} />
              {place.name}
            </span>
            <span className={cardAddress}>{place.address}</span>
          </span>
          <CaretRightIcon aria-hidden className={cardCaret} height={14} width={7} />
        </span>
        <span className={preferences}>
          <PreferenceButton
            count={recommendation.likeCount}
            selected={recommendation.viewerPreference === "LIKE"}
            type="like"
            onToggle={(next) => onPreferenceChange(next ? "LIKE" : null)}
          />
          <PreferenceButton
            count={recommendation.dislikeCount}
            selected={recommendation.viewerPreference === "DISLIKE"}
            type="dislike"
            onToggle={(next) => onPreferenceChange(next ? "DISLIKE" : null)}
          />
        </span>
      </span>
    </div>
  );
}

export function ChoicePage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const { data: meeting, isPending, isError, refetch } = useMeeting();
  const categories = useCategories();
  const slugOf = useCategorySlug();

  const [filter, setFilter] = useState<Filter>("all");
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  // 반대쪽은 서버가 알아서 지우므로 고른 값만 그대로 보낸다.
  const { mutate: setPreference } = useMutation({
    mutationFn: ({ recommendationId, preference }: PreferenceChange) =>
      updatePlacePreference(id, recommendationId, getAccessToken(id), { preference }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meeting", id] }),
  });

  const { generate, isGenerating } = useCourseGeneration(id, {
    onSuccess: () => {
      // 상태 폴링 쿼리(["meeting", id, "status"])가 켜 있는 동안 prefix 무효화하면
      // 폴링이 한 번 더 도므로 상세 쿼리만 무효화한다.
      void queryClient.invalidateQueries({ queryKey: ["meeting", id, "detail"] });
      void queryClient.invalidateQueries({ queryKey: ["course", id] });
      void navigate(`/meeting/${id}/course`);
    },
    onError: () => setIsErrorPopupOpen(true),
  });

  if (isError) {
    return (
      <Layout>
        <p className={status}>추천 장소를 불러오지 못했습니다.</p>
        <button className={retry} type="button" onClick={() => void refetch()}>
          다시 시도
        </button>
      </Layout>
    );
  }

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <p className={status}>추천 장소 불러오는 중</p>
      </Layout>
    );
  }

  const hasPlaces = meeting.recommendations.length > 0;
  const visible = meeting.recommendations.filter(
    (recommendation) => filter === "all" || slugOf(recommendation.categoryId) === filter,
  );
  // 왼쪽·오른쪽 열에 번갈아 담는다.
  const columns = [
    visible.filter((_, at) => at % 2 === 0),
    visible.filter((_, at) => at % 2 === 1),
  ];

  return (
    <Layout>
      <div className={root}>
        <div className={toggle}>
          <Toggle value="list" onChange={() => void navigate(`/meeting/${id}/place`)} />
        </div>

        <div className={filters}>
          <ChipGroup scroll>
            <Chip selected={filter === "all"} onClick={() => setFilter("all")}>
              전체
            </Chip>
            {categories.map((category) => (
              <Chip
                key={category.slug}
                selected={filter === category.slug}
                onClick={() => setFilter(category.slug)}
              >
                {category.name}
              </Chip>
            ))}
          </ChipGroup>
        </div>

        <div className={bar}>
          <span className={countStyle}>
            {filter === "all" ? "전체" : categories.find((c) => c.slug === filter)?.name}{" "}
            {visible.length}
          </span>
          <button className={sort} type="button">
            추천순
            <CaretDownIcon aria-hidden height={16} width={16} />
          </button>
        </div>

        {visible.length === 0 ? (
          <div className={emptyState}>
            <div aria-hidden className={emptyPreview}>
              {PREVIEW_CARDS.map((preview, index) => (
                <span className={emptyPreviewCard} key={index} style={preview} />
              ))}
            </div>
            <div className={emptyTexts}>
              <p className={emptyTitle}>
                {hasPlaces ? "이 카테고리에 저장된 장소가 없어요" : "아직 저장된 장소가 없어요"}
              </p>
              <p className={emptyDescription}>
                {hasPlaces
                  ? "다른 카테고리를 눌러 보세요."
                  : "가고 싶은 장소를 저장하고 친구들과 함께 모임 코스를 만들어 보세요."}
              </p>
            </div>
          </div>
        ) : (
          <div className={grid}>
            {columns.map((cards, columnIndex) => (
              <div className={column} key={columnIndex}>
                {cards.map((recommendation, position) => (
                  <RecommendationCard
                    height={CARD_HEIGHTS[columnIndex][position % CARD_HEIGHTS[columnIndex].length]}
                    key={recommendation.id}
                    recommendation={recommendation}
                    slug={slugOf(recommendation.categoryId)}
                    onOpen={() => void navigate(`/meeting/${id}/place/${recommendation.place.id}`)}
                    onPreferenceChange={(preference) =>
                      setPreference({ recommendationId: recommendation.id, preference })
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        <div className={footer}>
          <CtaButton
            disabled={!hasPlaces || !meeting.permissions.canSelectCourse || isGenerating}
            onClick={() => generate()}
          >
            코스 생성하기
          </CtaButton>
        </div>
      </div>

      <Popup
        description="잠시 후 다시 시도해 주세요"
        onOpenChange={setIsErrorPopupOpen}
        open={isErrorPopupOpen}
        title="코스 생성에 실패했어요"
      />
    </Layout>
  );
}

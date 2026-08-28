import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import CaretDownIcon from "@/assets/icon-caret-down.svg?react";
import { Chip, ChipGroup } from "@/components/chip";
import { CtaButton, CtaButtonRow } from "@/components/cta-button";
import { Layout } from "@/components/layout";
import { PlaceIcon } from "@/components/place-icon";
import { PlacePhotoImage } from "@/components/place-photo";
import { Popup } from "@/components/popup";
import { PreferenceButton } from "@/components/preference-button";
import { Toggle } from "@/components/toggle";
import type { CategorySlug } from "@/domains/catalog/api/types";
import { useCategories, useCategorySlug } from "@/domains/catalog/hooks";
import { updatePlacePreference } from "@/domains/meeting/api";
import type { RecommendationPreview, ViewerPreference } from "@/domains/meeting/api/types";
import { useMeeting } from "@/domains/meeting/hooks";
import { getAccessToken } from "@/utils/access-token";

import {
  bar,
  card,
  cardAddress,
  cardBody,
  cardHeader,
  cardImage,
  cardLink,
  cardName,
  cardScrim,
  cardTexts,
  column,
  count as countStyle,
  emptyDescription,
  emptyState,
  emptyTexts,
  emptyTitle,
  filters,
  footer,
  grid,
  infoBox,
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
      <PlacePhotoImage category={slug} className={cardImage} photo={recommendation.previewPhoto} />
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
  const location = useLocation();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const { data: meeting, isPending, isError, refetch } = useMeeting();
  const categories = useCategories();
  const slugOf = useCategorySlug();

  const [filter, setFilter] = useState<Filter>("all");
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(
    () => (location.state as { generationFailed?: boolean } | null)?.generationFailed ?? false,
  );
  const [isInfoBoxVisible, setIsInfoBoxVisible] = useState(
    () => !sessionStorage.getItem(`preference-info-shown-${id}`),
  );

  const handleDismissInfoBox = () => {
    setIsInfoBoxVisible(false);
    sessionStorage.setItem(`preference-info-shown-${id}`, "true");
  };

  // 반대쪽은 서버가 알아서 지우므로 고른 값만 그대로 보낸다.
  const { mutate: setPreference } = useMutation({
    mutationFn: ({ recommendationId, preference }: PreferenceChange) =>
      updatePlacePreference(id, recommendationId, getAccessToken(id), { preference }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meeting", id] }),
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
        {isInfoBoxVisible && !isConfirmPopupOpen && (
          <div className={infoBox} onClick={handleDismissInfoBox}>
            마음에 드는 장소에 선호도를 표시해보세요.
            {"\n"}선호도 결과에 따라 코스가 정해집니다!
          </div>
        )}
        <div className={toggle}>
          <Toggle
            tone="overlay"
            value="list"
            onChange={() => void navigate(`/meeting/${id}/place`)}
          />
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
            <img alt="" aria-hidden src="/static/masonry.svg" />
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
            disabled={!hasPlaces || !meeting.permissions.canSelectCourse}
            onClick={() => setIsConfirmPopupOpen(true)}
          >
            코스 생성하기
          </CtaButton>
        </div>
      </div>

      <Popup
        description="간단한 질문에 답해주시면 모임원들의 취향을 분석해 모임에 꼭 맞는 코스를 만들어드려요."
        footer={
          <CtaButtonRow
            primaryLabel="좋아요!"
            secondaryLabel="괜찮아요"
            fixedWidth={false}
            onPrimary={() => void navigate(`/meeting/${id}/questionnaire`)}
            onSecondary={() =>
              void navigate(`/meeting/${id}/generating`, {
                state: { customization: { type: "SKIP" } },
              })
            }
          />
        }
        onOpenChange={setIsConfirmPopupOpen}
        open={isConfirmPopupOpen}
        showClose={false}
        title="이번 모임, 어떻게 보내볼까요?"
      />

      <Popup
        description="잠시 후 다시 시도해 주세요"
        onOpenChange={setIsErrorPopupOpen}
        open={isErrorPopupOpen}
        title="코스 생성에 실패했어요"
      />
    </Layout>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretDownIcon from "../../../../../assets/icon-caret-down.svg?react";
import CaretRightIcon from "../../../../../assets/icon-caret-right.svg?react";
import { Chip, ChipGroup } from "../../../../../components/chip";
import { CtaButton } from "../../../../../components/cta-button";
import { Layout } from "../../../../../components/layout";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PreferenceButton } from "../../../../../components/preference-button";
import { Toggle } from "../../../../../components/toggle";
import type { CategorySlug } from "../../../../catalog/api/types";
import { useCategories, useCategorySlug } from "../../../../catalog/hooks";
import { useMeeting } from "../../../hooks";

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
  preferences,
  root,
  sort,
  status,
  toggle,
} from "./index.css";

type Filter = CategorySlug | "all";

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
  { left: 14, top: 102, height: 44, background: "#D2DCF1" },
];

export function ChoicePage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting, isPending } = useMeeting();
  const categories = useCategories();
  const slugOf = useCategorySlug();

  const [filter, setFilter] = useState<Filter>("all");

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <p className={status}>추천 장소를 불러오고 있어요</p>
      </Layout>
    );
  }

  const visible = meeting.recommendations.filter(
    (recommendation) => filter === "all" || slugOf(recommendation.categoryId) === filter,
  );

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
              <p className={emptyTitle}>아직 저장된 장소가 없어요</p>
              <p className={emptyDescription}>
                가고 싶은 장소를 저장하고 친구들과 함께 모임 코스를 만들어 보세요.
              </p>
            </div>
          </div>
        ) : (
          <div className={grid}>
            {CARD_HEIGHTS.map((heights, columnIndex) => (
              <div className={column} key={columnIndex}>
                {visible
                  .filter((_, at) => at % 2 === columnIndex)
                  .map((recommendation, position) => (
                    <div
                      className={card}
                      key={recommendation.id}
                      style={{ height: heights[position % heights.length] }}
                    >
                      <img alt="" className={cardImage} src="/static/meeting-course-map.webp" />
                      <span aria-hidden className={cardScrim} />
                      <button
                        aria-label={recommendation.place.name}
                        className={cardLink}
                        type="button"
                        onClick={() =>
                          void navigate(`/meeting/${id}/place/${recommendation.place.id}`)
                        }
                      />
                      <span className={cardBody}>
                        <span className={cardHeader}>
                          <span className={cardTexts}>
                            <span className={cardName}>
                              <PlaceIcon category={slugOf(recommendation.categoryId)} size={16} />
                              {recommendation.place.name}
                            </span>
                            <span className={cardAddress}>{recommendation.place.address}</span>
                          </span>
                          <CaretRightIcon aria-hidden className={cardCaret} height={14} width={7} />
                        </span>
                        <span className={preferences}>
                          <PreferenceButton
                            count={recommendation.likeCount}
                            selected={recommendation.viewerPreference === "LIKE"}
                            type="like"
                          />
                          <PreferenceButton
                            count={recommendation.dislikeCount}
                            selected={recommendation.viewerPreference === "DISLIKE"}
                            type="dislike"
                          />
                        </span>
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        <div className={footer}>
          <CtaButton
            disabled={visible.length === 0 || !meeting.permissions.canSelectCourse}
            onClick={() => void navigate(`/meeting/${id}/course`)}
          >
            코스 생성하기
          </CtaButton>
        </div>
      </div>
    </Layout>
  );
}

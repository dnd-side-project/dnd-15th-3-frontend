import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretDownIcon from "../../../../../assets/icon-caret-down.svg?react";
import CaretRightIcon from "../../../../../assets/icon-caret-right.svg?react";
import { Chip, ChipGroup } from "../../../../../components/chip";
import { CtaButton } from "../../../../../components/cta-button";
import { Layout } from "../../../../../components/layout";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PreferenceButton } from "../../../../../components/preference-button";
import { Toggle, type ToggleValue } from "../../../../../components/toggle";
import type { CategorySlug } from "../../../../catalog/api/types";
import { CategoryIcon } from "../../../../catalog/category-icons";
import { useCategories } from "../../../../catalog/hooks";
import { getAccessToken } from "../../../access-token";
import { meetingQueries } from "../../../api/queries";

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
  count as countStyle,
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

export function ChoicePage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting, isPending } = useQuery(meetingQueries.detail(id, getAccessToken(id)));
  const categories = useCategories();

  const [filter, setFilter] = useState<Filter>("all");

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <p className={status}>추천 장소를 불러오고 있어요</p>
      </Layout>
    );
  }

  const slugOf = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.slug ?? "other";

  const visible = meeting.recommendations.filter(
    (recommendation) => filter === "all" || slugOf(recommendation.categoryId) === filter,
  );

  return (
    <Layout>
      <div className={root}>
        <div className={toggle}>
          <Toggle
            value={"list" satisfies ToggleValue}
            onChange={(next) => {
              if (next === "map") {
                void navigate(`/meeting/${id}/place`);
              }
            }}
          />
        </div>

        <div className={filters}>
          <ChipGroup scroll>
            <Chip selected={filter === "all"} onClick={() => setFilter("all")}>
              전체
            </Chip>
            {categories.map((category) => (
              <Chip
                icon={<CategoryIcon slug={category.slug} />}
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

        <div className={grid}>
          {visible.map((recommendation) => (
            <div className={card} key={recommendation.id}>
              <img alt="" className={cardImage} src="/static/meeting-course-map.webp" />
              <span aria-hidden className={cardScrim} />
              <button
                aria-label={recommendation.place.name}
                className={cardLink}
                type="button"
                onClick={() => void navigate(`/meeting/${id}/place/${recommendation.place.id}`)}
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

        <div className={footer}>
          <CtaButton
            disabled={!meeting.permissions.canSelectCourse}
            onClick={() => void navigate(`/meeting/${id}/course`)}
          >
            코스 생성하기
          </CtaButton>
        </div>
      </div>
    </Layout>
  );
}

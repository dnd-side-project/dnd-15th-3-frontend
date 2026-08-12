import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useNavigate } from "react-router";

import SearchIcon from "../../../../assets/icon-search.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import { Highlight } from "../../../../components/highlight";
import { SectionIntro } from "../../../../components/section-intro";
import { TextInput } from "../../../../components/text-input";
import { catalogQueries } from "../../../catalog/api/queries";
import type { FirstMeetingPlaceResponse } from "../../../catalog/api/types";
import { CourseCategoryPicker } from "../../../catalog/components/course-category-picker";
import { StepPage } from "../../components/step-page";
import { useMeetingDraft } from "../../draft";

import {
  empty,
  intro,
  location,
  locationField,
  locationLabel,
  locationPlaceholder,
  picker,
  result,
  results,
  searchIcon,
  sheetBody,
  sheetSearch,
} from "./index.css";

export function MeetingCoursePage() {
  const navigate = useNavigate();
  const { draft, patch } = useMeetingDraft();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());
  const { data: places } = useQuery(catalogQueries.firstMeetingPlaces(deferredKeyword));

  const select = (place: FirstMeetingPlaceResponse) => {
    patch({ firstLocation: place });
    setSheetOpen(false);
  };

  return (
    <StepPage
      primaryDisabled={draft.firstLocation === null || draft.categorySlugs.length === 0}
      title="모임생성"
      onPrimary={() => void navigate("/new/meeting-schedule")}
    >
      <div className={location}>
        <span className={locationLabel}>모일 위치</span>
        <button className={locationField} type="button" onClick={() => setSheetOpen(true)}>
          {draft.firstLocation === null ? (
            <span className={locationPlaceholder}>위치를 검색해주세요</span>
          ) : (
            <span>{draft.firstLocation.name}</span>
          )}
          <SearchIcon aria-hidden className={searchIcon} height={24} width={24} />
        </button>
      </div>

      <SectionIntro
        className={intro}
        description="가고 싶은 순서대로 장소를 선택해 추가해보세요."
        title="어떤 코스 순서로 가고싶나요?"
      />

      <div className={picker}>
        <CourseCategoryPicker
          value={draft.categorySlugs}
          onChange={(categorySlugs) => patch({ categorySlugs })}
        />
      </div>

      <BottomSheet
        isOpen={sheetOpen}
        topBorderRadius="md"
        onClose={() => setSheetOpen(false)}
        onTapBackdrop={() => setSheetOpen(false)}
      >
        <div className={sheetBody}>
          <div className={sheetSearch}>
            <TextInput
              autoFocus
              aria-label="위치 검색"
              endIcon={<SearchIcon aria-hidden className={searchIcon} height={24} width={24} />}
              placeholder="위치를 검색해주세요"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>

          {deferredKeyword.length > 0 ? (
            <div className={results}>
              {places === undefined || places.length === 0 ? (
                <p className={empty}>검색 결과가 없어요</p>
              ) : (
                places.map((place) => (
                  <button
                    className={result}
                    key={place.id}
                    type="button"
                    onClick={() => select(place)}
                  >
                    <Highlight keyword={deferredKeyword} text={place.name} />
                  </button>
                ))
              )}
            </div>
          ) : null}
        </div>
      </BottomSheet>
    </StepPage>
  );
}

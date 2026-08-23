import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import SearchIcon from "@/assets/icon-search.svg?react";
import { SectionIntro } from "@/components/section-intro";
import { CourseCategoryPicker } from "@/domains/catalog/components/course-category-picker";
import { PlaceSearchSheet } from "@/domains/catalog/components/place-search-sheet";
import { StepPage } from "@/domains/new/components/step-page";
import type { MeetingDraft } from "@/domains/new/constants";

import {
  intro,
  location,
  locationField,
  locationLabel,
  locationPlaceholder,
  picker,
  searchIcon,
} from "./index.css";

export function MeetingCoursePage() {
  const navigate = useNavigate();
  const { control, setValue } = useFormContext<MeetingDraft>();
  const [firstLocation, categorySlugs] = useWatch({
    control,
    name: ["firstLocation", "categorySlugs"],
  });

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <StepPage
      primaryDisabled={firstLocation === null || categorySlugs.length === 0}
      title="모임생성"
      onPrimary={() => void navigate("/new/meeting-schedule")}
    >
      <div className={location}>
        <span className={locationLabel}>모일 위치</span>
        <button className={locationField} type="button" onClick={() => setSheetOpen(true)}>
          {firstLocation === null ? (
            <span className={locationPlaceholder}>위치를 검색해주세요</span>
          ) : (
            <span>{firstLocation.name}</span>
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
        <Controller
          control={control}
          name="categorySlugs"
          render={({ field }) => (
            <CourseCategoryPicker value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <PlaceSearchSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onSelect={(place) => {
          setValue("firstLocation", place);
          setSheetOpen(false);
        }}
      />
    </StepPage>
  );
}

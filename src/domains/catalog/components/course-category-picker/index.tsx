import { Chip, ChipGroup } from "../../../../components/chip";
import type { CategorySlug } from "../../api/types";
import { CategoryIcon } from "../../category-icons";
import { useCategories } from "../../hooks";

import { available, empty, selected as selectedStyle } from "./index.css";

/** 서버가 허용하는 코스 최대 개수 */
export const MAX_COURSE_STEPS = 6;

const EMPTY_MESSAGE = "아직 코스를 선택하지 않았어요!\n아래에서 원하는 순서대로 눌러보세요.";

export interface CourseCategoryPickerProps {
  value: CategorySlug[];
  /** 넘기지 않으면 읽기 전용이다. */
  onChange?: (value: CategorySlug[]) => void;
  gap?: "wide" | "narrow";
}

export function CourseCategoryPicker({ value, onChange, gap }: CourseCategoryPickerProps) {
  const categories = useCategories();
  const nameOf = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <div className={selectedStyle}>
        {value.length === 0 && onChange !== undefined ? (
          <p className={empty}>{EMPTY_MESSAGE}</p>
        ) : (
          <ChipGroup connected>
            {value.map((slug, index) => (
              <Chip
                selected
                icon={<CategoryIcon slug={slug} />}
                key={`${slug}-${index}`}
                onClick={onChange && (() => onChange(value.filter((_, at) => at !== index)))}
              >
                {nameOf(slug)}
              </Chip>
            ))}
          </ChipGroup>
        )}
      </div>

      {onChange === undefined ? null : (
        <div className={available({ gap })}>
          <ChipGroup>
            {categories.map((category) => (
              <Chip
                icon={<CategoryIcon slug={category.slug} />}
                key={category.slug}
                onClick={
                  value.length >= MAX_COURSE_STEPS
                    ? undefined
                    : () => onChange([...value, category.slug])
                }
              >
                {category.name}
              </Chip>
            ))}
          </ChipGroup>
        </div>
      )}
    </>
  );
}

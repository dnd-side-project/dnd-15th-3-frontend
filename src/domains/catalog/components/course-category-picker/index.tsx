import { Chip, ChipGroup } from "../../../../components/chip";
import type { CategorySlug } from "../../api/types";
import { CategoryIcon } from "../../category-icons";
import { useCategories } from "../../hooks";

import { available, selected as selectedStyle } from "./index.css";

/** 서버가 허용하는 코스 최대 개수 */
export const MAX_COURSE_STEPS = 6;

export interface CourseCategoryPickerProps {
  value: CategorySlug[];
  onChange: (value: CategorySlug[]) => void;
}

export function CourseCategoryPicker({ value, onChange }: CourseCategoryPickerProps) {
  const categories = useCategories();
  const nameOf = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <div className={selectedStyle}>
        <ChipGroup connected>
          {value.map((slug, index) => (
            <Chip
              selected
              icon={<CategoryIcon slug={slug} />}
              key={`${slug}-${index}`}
              onClick={() => onChange(value.filter((_, at) => at !== index))}
            >
              {nameOf(slug)}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <div className={available}>
        <ChipGroup>
          {categories.map((category) => (
            <Chip
              icon={<CategoryIcon slug={category.slug} />}
              key={category.slug}
              onClick={() =>
                value.length < MAX_COURSE_STEPS && onChange([...value, category.slug])
              }
            >
              {category.name}
            </Chip>
          ))}
        </ChipGroup>
      </div>
    </>
  );
}

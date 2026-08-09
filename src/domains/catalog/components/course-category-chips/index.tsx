import { Chip, ChipGroup, type ChipVariant } from "../../../../components/chip";
import type { CategorySlug } from "../../api/types";
import { CategoryIcon } from "../../category-icons";
import { useCategories } from "../../hooks";

export interface CourseCategoryChipsProps {
  value: CategorySlug[];
  variant?: ChipVariant;
}

/** 정해진 코스 순서를 화살표로 이어 보여주기만 한다. */
export function CourseCategoryChips({ value, variant }: CourseCategoryChipsProps) {
  const categories = useCategories();
  const nameOf = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <ChipGroup connected>
      {value.map((slug, index) => (
        <Chip icon={<CategoryIcon slug={slug} />} key={`${slug}-${index}`} variant={variant}>
          {nameOf(slug)}
        </Chip>
      ))}
    </ChipGroup>
  );
}

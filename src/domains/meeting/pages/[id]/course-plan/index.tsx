import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PenIcon from "../../../../../assets/icon-pen.svg?react";
import { Layout } from "../../../../../components/layout";
import { SectionIntro } from "../../../../../components/section-intro";
import { TopAppBar } from "../../../../../components/top-app-bar";
import { getAccessToken } from "../../../../../utils/access-token";
import type { CategorySlug } from "../../../../catalog/api/types";
import { CourseCategoryPicker } from "../../../../catalog/components/course-category-picker";
import { useCategories } from "../../../../catalog/hooks";
import { updateCoursePlan } from "../../../api";
import { meetingQueries } from "../../../api/queries";
import type { CourseCategoryStep, CoursePlan } from "../../../api/types";
import { useMeetingPermissions } from "../../../hooks";

import { editButton, intro, picker, root, status, surfaceColor } from "./index.css";

export function CoursePlanPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const accessToken = getAccessToken(id);
  const queryClient = useQueryClient();
  const { queryKey } = meetingQueries.coursePlan(id, accessToken);

  const { data: plan, isPending } = useQuery(meetingQueries.coursePlan(id, accessToken));
  const { canManageMeeting } = useMeetingPermissions();
  const categories = useCategories();

  const [editing, setEditing] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (categorySlugs: CategorySlug[]) =>
      updateCoursePlan(id, accessToken, {
        categorySlugs,
        version: queryClient.getQueryData<CoursePlan>(queryKey)?.version ?? 1,
      }),
    // 누른 즉시 화면을 바꾸고 요청은 뒤에서 보낸다.
    onMutate: async (categorySlugs) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<CoursePlan>(queryKey);
      queryClient.setQueryData<CoursePlan>(queryKey, (old) =>
        old === undefined ? old : { ...old, categorySteps: toSteps(categorySlugs, categories) },
      );
      return { previous };
    },
    onError: (_error, _categorySlugs, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
    },
    onSuccess: (saved) => {
      queryClient.setQueryData(queryKey, saved);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["meeting", id] });
    },
  });

  if (isPending || plan === undefined) {
    return (
      <Layout>
        <TopAppBar background={surfaceColor} title="코스 순서" onBack={() => void navigate(-1)} />
        <p className={status}>코스 불러오는 중</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={root}>
        <TopAppBar background={surfaceColor} title="코스 순서" onBack={() => void navigate(-1)} />

        <SectionIntro
          action={
            canManageMeeting ? (
              <button
                aria-label={editing ? "코스 편집 끝내기" : "코스 편집"}
                className={editButton({ editing })}
                type="button"
                onClick={() => setEditing(!editing)}
              >
                <PenIcon aria-hidden height={30} width={29} />
              </button>
            ) : null
          }
          className={intro}
          description="코스는 편집버튼을 클릭해 수정할 수 있어요."
          title="현재 정해진 모임 코스"
        />

        <div className={picker}>
          <CourseCategoryPicker
            gap="narrow"
            value={plan.categorySteps.map((step) => step.slug)}
            onChange={editing ? mutate : undefined}
          />
        </div>
      </div>
    </Layout>
  );
}

function toSteps(
  slugs: CategorySlug[],
  categories: { slug: CategorySlug; name: string }[],
): CourseCategoryStep[] {
  return slugs.map((slug, at) => ({
    id: `${slug}-${at}`,
    name: categories.find((category) => category.slug === slug)?.name ?? slug,
    slug,
    order: at + 1,
  }));
}

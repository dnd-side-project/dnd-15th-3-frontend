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
import { updateCoursePlan } from "../../../api";
import { meetingQueries } from "../../../api/queries";
import { useMeetingPermissions } from "../../../hooks";

import { editButton, intro, picker, root, status, surfaceColor } from "./index.css";

export function CoursePlanPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const planQuery = meetingQueries.coursePlan(id, getAccessToken(id));

  const { data: plan, isPending } = useQuery(planQuery);
  const { canManageMeeting } = useMeetingPermissions();

  const [editing, setEditing] = useState(false);
  // 저장 응답을 기다리지 않고 먼저 보여줄 코스.
  const [pending, setPending] = useState<CategorySlug[] | null>(null);

  const { mutate } = useMutation({
    mutationFn: (categorySlugs: CategorySlug[]) =>
      updateCoursePlan(id, getAccessToken(id), { categorySlugs, version: plan?.version ?? 1 }),
    onMutate: setPending,
    onError: () => setPending(null),
    onSuccess: (saved) => {
      queryClient.setQueryData(planQuery.queryKey, saved);
      setPending(null);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["meeting", id] }),
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
            value={pending ?? plan.categorySteps.map((step) => step.slug)}
            onChange={editing ? mutate : undefined}
          />
        </div>
      </div>
    </Layout>
  );
}

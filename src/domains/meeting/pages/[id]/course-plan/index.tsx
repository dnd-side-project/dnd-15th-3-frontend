import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PenIcon from "@/assets/icon-pen.svg?react";
import { Layout } from "@/components/layout";
import { SectionIntro } from "@/components/section-intro";
import { TopAppBar } from "@/components/top-app-bar";
import type { CategorySlug } from "@/domains/catalog/api/types";
import { CourseCategoryPicker } from "@/domains/catalog/components/course-category-picker";
import { updateCoursePlan } from "@/domains/meeting/api";
import { meetingQueries } from "@/domains/meeting/api/queries";
import type { CoursePlan } from "@/domains/meeting/api/types";
import { useMeetingPermissions } from "@/domains/meeting/hooks";
import { getAccessToken } from "@/utils/access-token";

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
    // 같은 모임의 저장은 직렬로만 실행한다.
    scope: { id: `course-plan-${id}` },
    mutationFn: (categorySlugs: CategorySlug[]) => {
      // 큐에서 실행될 때 최신 version을 읽어야 해서 클로저(plan) 대신 캐시를 본다.
      const current = queryClient.getQueryData<CoursePlan>(planQuery.queryKey);
      return updateCoursePlan(id, getAccessToken(id), {
        categorySlugs,
        version: current?.version ?? 1,
      });
    },
    onMutate: setPending,
    onError: () => setPending(null),
    onSuccess: (saved) => {
      queryClient.setQueryData(planQuery.queryKey, saved);
      // 마지막 선택이 저장됐을 때만 해제해야 큐에 남은 저장 중간에 롤백처럼 보이지 않는다.
      setPending((prev) =>
        prev !== null && prev.join() === saved.categorySteps.map((step) => step.slug).join()
          ? null
          : prev,
      );
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

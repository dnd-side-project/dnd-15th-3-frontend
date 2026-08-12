import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import PenIcon from "../../../../../assets/icon-pen.svg?react";
import { Layout } from "../../../../../components/layout";
import { SectionIntro } from "../../../../../components/section-intro";
import { TopAppBar } from "../../../../../components/top-app-bar";
import type { CategorySlug } from "../../../../catalog/api/types";
import { CourseCategoryPicker } from "../../../../catalog/components/course-category-picker";
import { getAccessToken } from "../../../access-token";
import { updateCoursePlan } from "../../../api";
import { meetingQueries } from "../../../api/queries";
import { useMeetingPermissions } from "../../../hooks";

import { editButton, intro, picker, root, status, surfaceColor } from "./index.css";

export function CoursePlanPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const accessToken = getAccessToken(id);
  const queryClient = useQueryClient();

  const { data: plan, isPending } = useQuery(meetingQueries.coursePlan(id, accessToken));
  const { canManageMeeting } = useMeetingPermissions();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<CategorySlug[] | null>(null);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (categorySlugs: CategorySlug[]) =>
      updateCoursePlan(id, accessToken, { categorySlugs, version: plan?.version ?? 1 }),
    onSuccess: async (saved) => {
      queryClient.setQueryData(meetingQueries.coursePlan(id, accessToken).queryKey, saved);
      await queryClient.invalidateQueries({ queryKey: ["meeting", id] });
      setDraft(null);
      setEditing(false);
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

  const saved = plan.categorySteps.map((step) => step.slug);
  const value = draft ?? saved;

  const toggleEditing = () => {
    if (!editing) {
      setDraft(saved);
      setEditing(true);
      return;
    }
    mutate(value);
  };

  return (
    <Layout>
      <div className={root}>
        <TopAppBar background={surfaceColor} title="코스 순서" onBack={() => void navigate(-1)} />

        <SectionIntro
          action={
            canManageMeeting ? (
              <button
                aria-label={editing ? "코스 저장" : "코스 편집"}
                className={editButton({ editing })}
                disabled={isSaving}
                type="button"
                onClick={toggleEditing}
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
            value={value}
            onChange={editing ? setDraft : undefined}
          />
        </div>
      </div>
    </Layout>
  );
}

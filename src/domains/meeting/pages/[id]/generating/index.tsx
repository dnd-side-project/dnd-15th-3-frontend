import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import MomoShadow from "@/assets/momo-shadow.svg?react";
import { Layout } from "@/components/layout";
import type { CourseCustomization } from "@/domains/course/api/types";
import { useCourseGeneration } from "@/domains/meeting/hooks";

import { description, momo, momoImage, momoShadow, root, texts, title } from "./index.css";

export function CourseGeneratingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const startedRef = useRef(false);
  const state = location.state as { customization: CourseCustomization } | null;

  const { generate } = useCourseGeneration(id, {
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["meeting", id, "detail"] });
      void queryClient.invalidateQueries({ queryKey: ["course", id] });
      void navigate(`/meeting/${id}/course`, { replace: true });
    },
    onError: () => {
      void navigate(`/meeting/${id}/choice`, { replace: true, state: { generationFailed: true } });
    },
  });

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    // 새로고침 등으로 customization 없이 이 페이지에 바로 들어오면 선택 화면으로 되돌린다.
    if (state === null) {
      void navigate(`/meeting/${id}/choice`, { replace: true });
      return;
    }
    generate(state.customization);
  }, [state, generate, id, navigate]);

  return (
    <Layout>
      <div className={root}>
        <div className={texts}>
          <h1 className={title}>코스를 만들고 있어요</h1>
          <p className={description}>잠시만 기다려 주세요. 곧 멋진 코스가 완성돼요!</p>
        </div>
        <div aria-hidden className={momo}>
          <img
            alt=""
            className={momoImage}
            height={241}
            src="/static/momo-searching.webp"
            width={301}
          />
          <MomoShadow className={momoShadow} />
        </div>
      </div>
    </Layout>
  );
}

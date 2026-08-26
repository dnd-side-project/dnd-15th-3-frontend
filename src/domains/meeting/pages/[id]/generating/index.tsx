import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { Layout } from "@/components/layout";
import type { CourseCustomization } from "@/domains/course/api/types";
import { useCourseGeneration } from "@/domains/meeting/hooks";

import { description, mapImage, media, pinImage, root, texts, title } from "./index.css";

interface GeneratingLocationState {
  customization: CourseCustomization;
}

function hasCustomization(state: unknown): state is GeneratingLocationState {
  return typeof state === "object" && state !== null && "customization" in state;
}

/** 코스 생성 요청을 시작하고, 완료·실패가 날 때까지 보여 주는 전용 로딩 화면. */
export function CourseGeneratingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const startedRef = useRef(false);
  const [customization] = useState(() =>
    hasCustomization(location.state) ? location.state.customization : null,
  );

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
    // 새로고침 등으로 customization 없이 이 페이지에 바로 들어오면 선택 화면으로 되돌린다.
    if (customization === null) {
      void navigate(`/meeting/${id}/choice`, { replace: true });
      return;
    }
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    generate(customization);
  }, [customization, generate, id, navigate]);

  return (
    <Layout>
      <div className={root}>
        <div className={texts}>
          <p className={title}>코스를 만들고 있어요</p>
          <p className={description}>잠시만 기다려 주세요. 곧 멋진 코스가 완성돼요!</p>
        </div>
        <div aria-hidden className={media}>
          <img alt="" className={mapImage} src="/static/popup-course-map.webp" />
          <img alt="" className={pinImage} src="/static/popup-course-pin.webp" />
        </div>
      </div>
    </Layout>
  );
}

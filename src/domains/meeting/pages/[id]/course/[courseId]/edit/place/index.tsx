import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/toast/manager";
import { TopAppBar } from "@/components/top-app-bar";
import { addCoursePlace } from "@/domains/course/api";
import { addRecommendation } from "@/domains/meeting/api";
import { PlaceSearch } from "@/domains/meeting/pages/[id]/place";
import { getAccessToken } from "@/utils/access-token";
import { ApiError } from "@/utils/http";

export function CourseCandidatePlaceAddPage() {
  const navigate = useNavigate();
  const { id = "", courseId = "" } = useParams();
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(id);

  const { mutate: addPlace } = useMutation({
    // 검색으로 찾은 장소는 모임 추천에 먼저 올린 뒤 코스에 넣는다.
    mutationFn: async (placeId: string) => {
      const recommendation = await addRecommendation(id, accessToken, { placeId });
      return addCoursePlace(id, courseId, accessToken, {
        recommendationId: recommendation.id,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["course", id] });
      void navigate(`/meeting/${id}/course/${courseId}/edit`, { replace: true });
    },
    onError: (error) => {
      const message =
        error instanceof ApiError && error.status === 409
          ? "이미 추가된 장소입니다."
          : "장소를 추가하지 못했습니다.";
      toast.add({ title: message });
    },
  });

  return (
    <PlaceSearch
      header={<TopAppBar title="코스수정" onBack={() => void navigate(-1)} />}
      onSelect={addPlace}
    />
  );
}

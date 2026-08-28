import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

import { toast } from "@/components/toast/manager";
import { TopAppBar } from "@/components/top-app-bar";
import { addCoursePlace } from "@/domains/course/api";
import { addRecommendation } from "@/domains/meeting/api";
import { useMeeting } from "@/domains/meeting/hooks";
import { PlaceSearch } from "@/domains/meeting/pages/[id]/place";
import { getAccessToken } from "@/utils/access-token";
import { getErrorMessage } from "@/utils/http";

export function CoursePlaceAddPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const queryClient = useQueryClient();
  const accessToken = getAccessToken(id);

  const { data: meeting } = useMeeting();
  const courseId = meeting?.selectedCourse?.id ?? "";

  const { mutateAsync: addPlace } = useMutation({
    // 검색으로 찾은 장소는 모임 추천에 먼저 올린 뒤 코스에 넣는다.
    mutationFn: async (placeId: string) => {
      const recommendation = await addRecommendation(id, accessToken, { placeId });
      return addCoursePlace(id, courseId, accessToken, {
        recommendationId: recommendation.id,
      });
    },
    onMutate: () => {
      toast.add({ title: "코스에 장소를 추가했어요" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["meeting", id] });
      await queryClient.invalidateQueries({ queryKey: ["course", id] });
    },
    onError: (error) => {
      toast.add({ title: getErrorMessage(error, "장소를 추가하지 못했습니다.") });
    },
  });

  const isSaved = (placeId: string) =>
    meeting?.recommendations.some((item) => item.place.id === placeId) ?? false;

  return (
    <PlaceSearch
      header={<TopAppBar title="코스수정" onBack={() => void navigate(-1)} />}
      onSelect={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
      onAdd={async (placeId) => {
        await addPlace(placeId);
      }}
      isSaved={isSaved}
    />
  );
}

import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router";

import { Layout } from "../../../../../components/layout";
import { TopAppBar } from "../../../../../components/top-app-bar";
import { getAccessToken } from "../../../../../utils/access-token";
import { CourseCategoryChips } from "../../../../catalog/components/course-category-chips";
import { courseQueries } from "../../../../course/api/queries";
import { CourseTimeline } from "../../../../course/components/course-timeline";
import { MeetingMap } from "../../../components/meeting-map";
import { useMeeting } from "../../../hooks";

import { course, courseCount, courseTitle, map, plan, planTitle, root, status } from "./index.css";

export function MeetingCourseDetailPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting, isPending } = useMeeting();
  const courseId = meeting?.selectedCourse?.id ?? "";
  const { data: detail } = useQuery(courseQueries.detail(id, courseId, getAccessToken(id)));

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <TopAppBar title="모임 코스" onBack={() => void navigate(-1)} />
        <p className={status}>모임 코스 불러오는 중</p>
      </Layout>
    );
  }

  if (meeting.selectedCourse === null) {
    return <Navigate replace to={`/meeting/${id}`} />;
  }

  return (
    <Layout>
      <div className={root}>
        <TopAppBar title="모임 코스" onBack={() => void navigate(-1)} />

        <section className={plan}>
          <h2 className={planTitle}>코스 순서</h2>
          <CourseCategoryChips selected value={meeting.categorySlugs} />
        </section>

        <div className={map}>
          <MeetingMap
            interactive={false}
            level={6}
            origin={meeting.firstLocation}
            places={(detail?.route ?? []).map((step) => ({
              id: step.recommendationId,
              name: step.name,
              latitude: step.latitude,
              longitude: step.longitude,
              previewUrl: step.primaryImageUrl,
            }))}
          />
        </div>

        <div className={course}>
          <h2 className={courseTitle}>오늘의 모임 코스</h2>
          <span className={courseCount}>방문 장소 {detail?.totalCount ?? 0}</span>
        </div>

        <CourseTimeline
          route={detail?.route ?? []}
          onSelectPlace={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
        />
      </div>
    </Layout>
  );
}

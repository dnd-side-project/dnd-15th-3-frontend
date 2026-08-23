import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router";

import ArrowsOutIcon from "../../../../../assets/icon-arrows-out-simple.svg?react";
import { Layout } from "../../../../../components/layout";
import { TopAppBar } from "../../../../../components/top-app-bar";
import { getAccessToken } from "../../../../../utils/access-token";
import { CourseCategoryChips } from "../../../../catalog/components/course-category-chips";
import { courseQueries } from "../../../../course/api/queries";
import { CourseTimeline } from "../../../../course/components/course-timeline";
import { MeetingMap } from "../../../components/meeting-map";
import { useMeeting } from "../../../hooks";

import {
  course,
  courseCount,
  courseTitle,
  expand,
  map,
  plan,
  planTitle,
  root,
  status,
} from "./index.css";

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

  const route = detail?.route ?? [];

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
            places={route.map(
              ({ recommendationId, name, latitude, longitude, primaryImageUrl }) => ({
                id: recommendationId,
                name,
                latitude,
                longitude,
                previewUrl: primaryImageUrl,
              }),
            )}
          />
          <button
            aria-label="지도 크게 보기"
            className={expand}
            type="button"
            onClick={() => void navigate(`/meeting/${id}/place`)}
          >
            <ArrowsOutIcon aria-hidden height={16} width={16} />
          </button>
        </div>

        <div className={course}>
          <h2 className={courseTitle}>오늘의 모임 코스</h2>
          <span className={courseCount}>방문 장소 {route.length}</span>
        </div>

        <CourseTimeline
          route={route}
          onSelectPlace={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
        />
      </div>
    </Layout>
  );
}

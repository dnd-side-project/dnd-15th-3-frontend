import { RouterProvider, createBrowserRouter } from "react-router";

import { ApiTestPage } from "./domains/debug/pages/api-test";
import { KakaoMapPage } from "./domains/debug/pages/kakao-map";
import { KakaoSharePage } from "./domains/debug/pages/kakao-share";
import { HomePage } from "./domains/home/pages";
import { StartPage } from "./domains/home/pages/start";
import { JoinLayout } from "./domains/join/layout";
import { JoinCodePage } from "./domains/join/pages/code";
import { JoinCompletePage } from "./domains/join/pages/complete";
import { JoinErrorPage } from "./domains/join/pages/error";
import { JoinProfilePage } from "./domains/join/pages/profile";
import { JoinRedirect } from "./domains/join/pages/redirect";
import { meetingLayout } from "./domains/meeting/layout";
import { MeetingPage } from "./domains/meeting/pages/[id]";
import { CardPage } from "./domains/meeting/pages/[id]/card";
import { ChoicePage } from "./domains/meeting/pages/[id]/choice";
import { CoursePage } from "./domains/meeting/pages/[id]/course";
import { CoursePlanPage } from "./domains/meeting/pages/[id]/course-plan";
import { CourseDetailPage } from "./domains/meeting/pages/[id]/course/[courseId]";
import { CourseCandidateEditPage } from "./domains/meeting/pages/[id]/course/[courseId]/edit";
import { CourseCandidatePlaceAddPage } from "./domains/meeting/pages/[id]/course/[courseId]/edit/place";
import { CoursePlaceDetailPage } from "./domains/meeting/pages/[id]/course/[courseId]/place/[placeId]";
import { MeetingCourseDetailPage } from "./domains/meeting/pages/[id]/detail";
import { CourseEditPage } from "./domains/meeting/pages/[id]/edit";
import { CoursePlaceAddPage } from "./domains/meeting/pages/[id]/edit/place";
import { CourseGeneratingPage } from "./domains/meeting/pages/[id]/generating";
import { MyPage } from "./domains/meeting/pages/[id]/my";
import { PlaceSearchPage } from "./domains/meeting/pages/[id]/place";
import { PlaceDetailPage } from "./domains/meeting/pages/[id]/place/[placeId]";
import { QuestionnairePage } from "./domains/meeting/pages/[id]/questionnaire";
import { NewMeetingLayout } from "./domains/new/layout";
import { CompletePage } from "./domains/new/pages/complete";
import { MeetingCoursePage } from "./domains/new/pages/meeting-course";
import { MeetingInfoPage } from "./domains/new/pages/meeting-info";
import { MeetingSchedulePage } from "./domains/new/pages/meeting-schedule";
import { ProfilePage } from "./domains/new/pages/profile";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/start",
    Component: StartPage,
  },
  {
    path: "/join",
    Component: JoinLayout,
    children: [
      {
        index: true,
        Component: JoinRedirect,
      },
      {
        path: "code",
        Component: JoinCodePage,
      },
      {
        path: "error",
        Component: JoinErrorPage,
      },
      {
        path: "complete",
        Component: JoinCompletePage,
      },
      {
        path: "profile",
        Component: JoinProfilePage,
      },
    ],
  },
  {
    path: "/debug/api-test",
    Component: ApiTestPage,
  },
  {
    path: "/debug/kakao-map",
    Component: KakaoMapPage,
  },
  {
    path: "/debug/kakao-share",
    Component: KakaoSharePage,
  },
  {
    path: "/new",
    Component: NewMeetingLayout,
    children: [
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "meeting-info",
        Component: MeetingInfoPage,
      },
      {
        path: "meeting-course",
        Component: MeetingCoursePage,
      },
      {
        path: "meeting-schedule",
        Component: MeetingSchedulePage,
      },
      {
        path: "complete",
        Component: CompletePage,
      },
    ],
  },
  {
    path: "/meeting/:id",
    Component: meetingLayout,
    children: [
      {
        index: true,
        Component: MeetingPage,
      },
      {
        path: "card",
        Component: CardPage,
      },
      {
        path: "my",
        Component: MyPage,
      },
      {
        path: "detail",
        Component: MeetingCourseDetailPage,
      },
      {
        path: "edit",
        Component: CourseEditPage,
      },
      {
        path: "edit/place",
        Component: CoursePlaceAddPage,
      },
      {
        path: "place",
        Component: PlaceSearchPage,
      },
      {
        path: "course-plan",
        Component: CoursePlanPage,
      },
      {
        path: "place/:placeId",
        Component: PlaceDetailPage,
      },
      {
        path: "choice",
        Component: ChoicePage,
      },
      {
        path: "questionnaire",
        Component: QuestionnairePage,
      },
      {
        path: "generating",
        Component: CourseGeneratingPage,
      },
      {
        path: "course",
        Component: CoursePage,
      },
      {
        path: "course/:courseId",
        Component: CourseDetailPage,
      },
      {
        path: "course/:courseId/edit",
        Component: CourseCandidateEditPage,
      },
      {
        path: "course/:courseId/edit/place",
        Component: CourseCandidatePlaceAddPage,
      },
      {
        path: "course/:courseId/place/:placeId",
        Component: CoursePlaceDetailPage,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

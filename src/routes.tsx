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
import { meetingLayout } from "./domains/meeting/layout";
import { MeetingPage } from "./domains/meeting/pages/[id]";
import { ChoicePage } from "./domains/meeting/pages/[id]/choice";
import { CoursePage } from "./domains/meeting/pages/[id]/course";
import { CourseDetailPage } from "./domains/meeting/pages/[id]/course/[courseId]";
import { MyPage } from "./domains/meeting/pages/[id]/my";
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
        Component: JoinCodePage,
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
        path: "my",
        Component: MyPage,
      },
      {
        path: "choice",
        Component: ChoicePage,
      },
      {
        path: "course",
        Component: CoursePage,
      },
      {
        path: "course/:courseId",
        Component: CourseDetailPage,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}

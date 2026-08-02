import { RouterProvider, createBrowserRouter } from "react-router";

import { ApiTestPage } from "./domains/debug/pages/api-test";
import { HomePage } from "./domains/home/pages";
import { StartPage } from "./domains/home/pages/start";
import { JoinPage } from "./domains/join/pages";
import { meetingLayout } from "./domains/meeting/layout";
import { MeetingPage } from "./domains/meeting/pages/[id]";
import { ChoicePage } from "./domains/meeting/pages/[id]/choice";
import { CoursePage } from "./domains/meeting/pages/[id]/course";
import { CourseDetailPage } from "./domains/meeting/pages/[id]/course/[courseId]";
import { MyPage } from "./domains/meeting/pages/[id]/my";
import { newMeetingLayout } from "./domains/new/layout";
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
    Component: JoinPage,
  },
  {
    path: "/debug/api-test",
    Component: ApiTestPage,
  },
  {
    path: "/new",
    Component: newMeetingLayout,
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

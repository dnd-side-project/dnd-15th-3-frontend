import { Outlet } from "react-router";

import { MeetingDraftProvider } from "../draft";

export function newMeetingLayout() {
  return (
    <MeetingDraftProvider>
      <Outlet />
    </MeetingDraftProvider>
  );
}

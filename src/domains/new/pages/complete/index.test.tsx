import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { newMeetingLayout } from "../../layout";
import { CompletePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const MEETING = {
  id: "1",
  meetingId: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
  invitationUrl: "https://momo.example/invite/DNDF0R",
  name: "을지로·성수 나들이",
  date: "2026-08-05",
  time: "18:00",
  role: "HOST",
  isHost: true,
  permissions: { canManageMeeting: true, canSelectCourse: true, canShareInvitation: true },
  meetingType: { id: "1", code: "SOCIAL", name: "친목" },
  meetingTypeCode: "SOCIAL",
  host: { userKey: "device-1", nickname: "방장모모", profileAvatarId: "momo-blue" },
  categorySlugs: ["restaurant"],
  firstLocation: {
    id: "101",
    displayName: "을지로3가역",
    address: "서울",
    latitude: 1,
    longitude: 2,
    syncVersion: 1,
  },
  viewerParticipantId: "11",
  participants: [],
  categorySteps: [],
  recommendations: [],
  selectedCourse: null,
};

const DRAFT = {
  nickname: "방장모모",
  profileAvatarId: "momo-blue",
  name: "을지로·성수 나들이",
  meetingTypeCode: "SOCIAL",
  firstLocation: {
    id: "101",
    externalAddressId: "kakao-101",
    name: "을지로3가역",
    address: "서울",
    latitude: 1,
    longitude: 2,
  },
  categorySlugs: ["restaurant", "cafe"],
  date: "2026-08-05",
  time: "18:00",
};

function renderComplete(initialEntry: string) {
  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: newMeetingLayout,
        children: [{ path: "complete", Component: CompletePage }],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}
    >
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  sessionStorage.clear();
  localStorage.clear();
});

afterEach(() => {
  fetchMock.mockReset();
});

test("초안을 들고 들어오면 모임을 만들고 초대코드를 보여준다", async () => {
  sessionStorage.setItem("momo.meeting-draft", JSON.stringify(DRAFT));
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify(MEETING), {
      status: 201,
      headers: { "content-type": "application/json" },
    }),
  );

  renderComplete("/new/complete");

  await expect.element(page.getByText("DNDF0R")).toBeInTheDocument();

  const [url, init] = fetchMock.mock.calls[0]!;
  expect(new Request(url).url).toContain("/api/v1/meetings");
  expect(init?.method).toBe("POST");
  expect(JSON.parse(init?.body as string)).toMatchObject({
    meetingTypeCode: "SOCIAL",
    name: "을지로·성수 나들이",
    date: "2026-08-05",
    time: "18:00",
    firstMeetingLocation: {
      displayName: "을지로3가역",
      address: "서울",
      latitude: 1,
      longitude: 2,
      externalAddressId: "kakao-101",
    },
    categorySlugs: ["restaurant", "cafe"],
  });
});

test("code 가 이미 있으면 다시 만들지 않는다", async () => {
  sessionStorage.setItem("momo.meeting-draft", JSON.stringify(DRAFT));

  renderComplete("/new/complete?code=DNDF0R");

  await expect.element(page.getByText("DNDF0R")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
});

test("만드는 동안에는 진행 상태를 알린다", async () => {
  sessionStorage.setItem("momo.meeting-draft", JSON.stringify(DRAFT));
  fetchMock.mockReturnValue(new Promise(() => {}));

  renderComplete("/new/complete");

  await expect.element(page.getByText("모임 방 만드는 중")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "모임 시작하기" })).toBeDisabled();
});

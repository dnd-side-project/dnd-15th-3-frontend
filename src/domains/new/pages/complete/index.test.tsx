import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "../../../../components/toast";
import { render } from "../../../../test-utils";
import type { MeetingDraft } from "../../constants";
import { formLayout } from "../../test-utils";
import { CompletePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

// 이 화면은 응답에서 세 값만 쓴다.
const MEETING = {
  id: "1",
  invitationCode: "DNDF0R",
  participantAccessToken: "host-session-token",
};

const DRAFT: MeetingDraft = {
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
        Component: formLayout(DRAFT),
        children: [{ path: "complete", Component: CompletePage }],
      },
    ],
    { initialEntries: [initialEntry] },
  );

  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { mutations: { retry: false } } })}
    >
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
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
  renderComplete("/new/complete?code=DNDF0R");

  await expect.element(page.getByText("DNDF0R")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
});

test("만드는 동안에는 진행 상태를 알린다", async () => {
  fetchMock.mockReturnValue(new Promise(() => {}));

  renderComplete("/new/complete");

  await expect.element(page.getByText("모임 방 만드는 중")).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "모임 시작하기" })).toBeDisabled();
});

test("초대코드를 복사하면 토스트로 알린다", async () => {
  const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
  renderComplete("/new/complete?code=DNDF0R");

  await userEvent.click(page.getByRole("button", { name: "초대코드 복사" }));

  expect(writeText).toHaveBeenCalledWith("DNDF0R");
  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).toBeInTheDocument();
  writeText.mockRestore();
});

test("링크를 복사하면 초대 주소를 넣고 토스트로 알린다", async () => {
  const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
  renderComplete("/new/complete?code=DNDF0R");

  await userEvent.click(page.getByRole("button", { name: "링크 복사" }));

  expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/join/code?code=DNDF0R`);
  await expect.element(page.getByText("링크가 복사되었습니다.")).toBeInTheDocument();
  writeText.mockRestore();
});

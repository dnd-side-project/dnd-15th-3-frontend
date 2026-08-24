import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet, createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { JoinDraft } from "@/domains/join/types/draft";
import { render } from "@/test-utils";

import { JoinProfilePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const PROFILE_AVATARS = [
  { id: "momo-blue", name: "파란 모모" },
  { id: "momo-yellow", name: "노란 모모" },
  { id: "momo-green", name: "초록 모모" },
  { id: "momo-pink", name: "분홍 모모" },
  { id: "momo-mint", name: "민트 모모" },
  { id: "momo-purple", name: "보라 모모" },
];

// 프로필 화면은 참여 응답에서 두 값만 쓴다.
const MEETING = {
  id: "m1",
  participantAccessToken: "member-session-token",
};

const INVITATION = {
  meetingId: "m1",
  invitationCode: "ABC123",
  invitationUrl: "https://example.com/join?code=ABC123",
  name: "을지로 모임",
  date: "2026-08-20",
  time: "18:00",
  locationId: "loc-1",
};

/** complete 페이지를 거쳐 검증된 초대코드가 폼에 들어온 상태를 모방한다. */
function joinFormLayout(code: string) {
  return function JoinFormLayout() {
    const methods = useForm<JoinDraft>({
      defaultValues: {
        nickname: "",
        profileAvatarId: "momo-blue",
        invitationCode: code,
      },
    });
    return (
      <FormProvider {...methods}>
        <Outlet />
      </FormProvider>
    );
  };
}

function renderProfile({
  code = "ABC123",
  previewFail = false,
  joinFail = false,
}: { code?: string; previewFail?: boolean; joinFail?: boolean } = {}) {
  fetchMock.mockImplementation(async (input) => {
    const url = new Request(input).url;
    if (url.includes("/api/v1/profile-avatars")) {
      return new Response(JSON.stringify(PROFILE_AVATARS), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.includes("/api/v1/meetings/invitation/preview")) {
      if (previewFail) {
        return new Response(JSON.stringify({ message: "유효하지 않은 초대코드입니다." }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ...INVITATION, invitationCode: code }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (url.includes("/api/v1/meetings/join")) {
      if (joinFail) {
        return new Response(JSON.stringify({ message: "모임 참여에 실패했습니다." }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(JSON.stringify(MEETING), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(null, { status: 404 });
  });

  const router = createMemoryRouter(
    [
      {
        path: "/join",
        Component: joinFormLayout(code),
        children: [
          { path: "profile", Component: JoinProfilePage },
          { path: "error", Component: () => <p data-testid="error">에러</p> },
        ],
      },
      {
        path: "/meeting/:meetingId/place",
        Component: () => <p data-testid="place">장소 선택</p>,
      },
    ],
    { initialEntries: ["/join/profile"] },
  );

  render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  fetchMock.mockReset();
});

test("닉네임이 비어 있으면 모임 시작하기로 넘어갈 수 없다", async () => {
  renderProfile();

  await expect.element(page.getByRole("button", { name: "모임 시작하기" })).toBeDisabled();
});

test("닉네임을 입력하고 모임 시작하기를 누르면 모임에 참여해 장소 선택으로 이동한다", async () => {
  renderProfile();

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "면킬러");
  await userEvent.click(page.getByRole("button", { name: "모임 시작하기" }));

  await expect.element(page.getByTestId("place")).toBeInTheDocument();

  const [, init] = fetchMock.mock.calls.find(([url]) =>
    new Request(url).url.includes("/api/v1/meetings/join"),
  )!;
  expect(init?.method).toBe("POST");
  expect(JSON.parse(init?.body as string)).toMatchObject({
    nickname: "면킬러",
    profileAvatarId: "momo-blue",
    invitationCode: "ABC123",
  });
});

test("프로필 이미지 변경을 누르면 캐릭터 선택 시트가 열린다", async () => {
  renderProfile();

  await userEvent.click(page.getByRole("button", { name: "프로필 이미지 변경" }));

  await expect.element(page.getByText("원하는 모습을 선택해주세요!")).toBeInTheDocument();
});

test("시트에서 고른 캐릭터를 저장하면 프로필에 반영한다", async () => {
  renderProfile();

  await userEvent.click(page.getByRole("button", { name: "프로필 이미지 변경" }));
  await userEvent.click(page.getByRole("button", { name: "노란 모모" }));
  await userEvent.click(page.getByRole("button", { name: "저장" }));

  await expect
    .element(page.getByRole("img", { name: "내 프로필" }))
    .toHaveAttribute("src", "/static/avatar-momo-yellow.webp");
});

test("모임 참여에 실패하면 에러 화면으로 이동한다", async () => {
  renderProfile({ joinFail: true });

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "면킬러");
  await userEvent.click(page.getByRole("button", { name: "모임 시작하기" }));

  await expect.element(page.getByTestId("error")).toBeInTheDocument();
});

test("초대코드가 비어 있으면 에러 화면으로 이동한다", async () => {
  renderProfile({ code: "" });

  await expect.element(page.getByTestId("error")).toBeInTheDocument();

  const previewCalls = fetchMock.mock.calls.filter(([url]) =>
    new Request(url).url.includes("/api/v1/meetings/invitation/preview"),
  );
  expect(previewCalls).toHaveLength(0);
});

test("초대코드 검증에 실패하면 에러 화면으로 이동한다", async () => {
  renderProfile({ code: "BADCODE", previewFail: true });

  await expect.element(page.getByTestId("error")).toBeInTheDocument();
});

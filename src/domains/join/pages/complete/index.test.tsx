import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { JoinDraft } from "@/domains/join/types/draft";
import { render } from "@/test-utils";

import { JoinCompletePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const INVITATION = {
  meetingId: "m-1",
  invitationCode: "ABC123",
  invitationUrl: "https://example.com/?code=ABC123",
  name: "성수 나들이",
  date: "2026-08-18",
  time: "19:00",
  locationName: "성수동",
};

function FormProbe() {
  const invitationCode = useWatch<JoinDraft>({ name: "invitationCode" });
  return <div data-testid="invitationCode">{invitationCode}</div>;
}

function JoinCompletePageWrapper() {
  const methods = useForm<JoinDraft>({
    defaultValues: {
      userKey: "",
      nickname: "",
      profileAvatarId: "momo-blue",
      invitationCode: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <JoinCompletePage />
      <FormProbe />
    </FormProvider>
  );
}

function renderCompletePage(options: { initialEntry?: string; response?: Response } = {}) {
  const { initialEntry = "/join/complete?code=ABC123", response } = options;
  fetchMock.mockResolvedValue(
    response ??
      new Response(JSON.stringify(INVITATION), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
  );

  const router = createMemoryRouter(
    [
      { path: "/join/complete", Component: JoinCompletePageWrapper },
      { path: "/join/error", element: <div data-testid="error" /> },
      { path: "/join/profile", element: <div data-testid="profile" /> },
    ],
    { initialEntries: [initialEntry] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

afterEach(() => {
  fetchMock.mockReset();
});

test("초대 코드가 있고 API가 성공하면 모임 정보를 렌더링한다", async () => {
  renderCompletePage();

  await expect.element(page.getByText("성수 나들이")).toBeInTheDocument();
  await expect.element(page.getByText("성수동")).toBeInTheDocument();
  await expect.element(page.getByText("2026.08.18")).toBeInTheDocument();
  await expect.element(page.getByText("19:00")).toBeInTheDocument();
});

test("code 쿼리 파라미터가 없으면 /join/error로 리다이렉트한다", async () => {
  renderCompletePage({ initialEntry: "/join/complete" });

  await expect.element(page.getByTestId("error")).toBeInTheDocument();
});

test("API가 실패하면 /join/error로 리다이렉트한다", async () => {
  renderCompletePage({
    response: new Response(JSON.stringify({ message: "not found" }), { status: 404 }),
  });

  await expect.element(page.getByTestId("error")).toBeInTheDocument();
});

test("데이터를 불러오면 폼에 invitationCode를 저장한다", async () => {
  renderCompletePage();

  await expect.element(page.getByTestId("invitationCode")).toHaveTextContent("ABC123");
});

test("다음 버튼을 누르면 /join/profile로 이동한다", async () => {
  renderCompletePage();

  await userEvent.click(page.getByRole("button", { name: "다음" }));

  await expect.element(page.getByTestId("profile")).toBeInTheDocument();
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { Questionnaire } from "@/domains/meeting/api/types";
import { render } from "@/test-utils";

import { QuestionnairePage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const QUESTIONNAIRE: Questionnaire = {
  status: "READY",
  questionnaireId: "12",
  version: 1,
  totalCount: 3,
  availableCount: 3,
  questions: [
    {
      questionId: "101",
      order: 1,
      text: "이번 만남에서 가장 중요하게 생각하는 목적이 어떤 쪽인가요?",
      options: [
        { optionId: "1001", order: 1, emoji: "🗣️", label: "오랜만에 만나 대화하기" },
        { optionId: "1002", order: 2, emoji: "🔍", label: "새로운 곳을 경험하기" },
      ],
    },
    {
      questionId: "102",
      order: 2,
      text: "이동 거리는 어느 정도가 좋을까요?",
      options: [
        { optionId: "1003", order: 1, emoji: "🚶", label: "가까운 곳끼리" },
        { optionId: "1004", order: 2, emoji: "🗺️", label: "멀어도 괜찮아요" },
      ],
    },
    {
      questionId: "103",
      order: 3,
      text: "어떤 분위기가 좋을까요?",
      options: [
        { optionId: "1005", order: 1, emoji: "🌿", label: "조용한 곳" },
        { optionId: "1006", order: 2, emoji: "🎉", label: "활기찬 곳" },
      ],
    },
  ],
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function GeneratingStub() {
  const location = useLocation();
  return <p data-testid="generating-page">{JSON.stringify(location.state)}</p>;
}

function renderQuestionnaire(questionnaire: Questionnaire = QUESTIONNAIRE) {
  fetchMock.mockImplementation((input, init) => {
    const url = new Request(input).url;
    if (url.includes("/meetings/1/questionnaire") && init?.method === "POST") {
      return Promise.resolve(jsonResponse(questionnaire));
    }
    return Promise.resolve(jsonResponse(questionnaire));
  });

  const router = createMemoryRouter(
    [
      { path: "/meeting/:id/questionnaire", Component: QuestionnairePage },
      { path: "/meeting/:id/generating", Component: GeneratingStub },
    ],
    { initialEntries: ["/meeting/1/questionnaire"] },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("들어가면 질문 생성을 요청하고 첫 질문과 진행률을 보여준다", async () => {
  renderQuestionnaire();

  await expect.element(page.getByText("1/3")).toBeInTheDocument();
  await expect
    .element(page.getByText("이번 만남에서 가장 중요하게 생각하는 목적이 어떤 쪽인가요?"))
    .toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
  expect(post).toBeDefined();
  expect(new Request(post![0]).url).toContain("/api/v1/meetings/1/questionnaire");
});

test("옵션을 고르면 다음 버튼이 활성화된다", async () => {
  renderQuestionnaire();

  await userEvent.click(page.getByRole("button", { name: "오랜만에 만나 대화하기" }));

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("세 질문에 모두 답하면 제출 버튼으로 바뀌고, 제출하면 답변과 함께 생성 페이지로 이동한다", async () => {
  renderQuestionnaire();

  await userEvent.click(page.getByRole("button", { name: "오랜만에 만나 대화하기" }));
  await userEvent.click(page.getByRole("button", { name: "다음" }));
  await userEvent.click(page.getByRole("button", { name: "가까운 곳끼리" }));
  await userEvent.click(page.getByRole("button", { name: "다음" }));
  await expect.element(page.getByText("3/3")).toBeInTheDocument();
  await userEvent.click(page.getByRole("button", { name: "조용한 곳" }));

  const submit = page.getByRole("button", { name: "제출" });
  await expect.element(submit).toBeEnabled();
  await userEvent.click(submit);

  const generatingPage = page.getByTestId("generating-page");
  await expect.element(generatingPage).toBeInTheDocument();
  await expect.element(generatingPage).toHaveTextContent(
    JSON.stringify({
      customization: {
        type: "QUESTIONNAIRE",
        questionnaireId: "12",
        questionnaireVersion: 1,
        answers: [
          { questionId: "101", optionId: "1001" },
          { questionId: "102", optionId: "1003" },
          { questionId: "103", optionId: "1005" },
        ],
      },
    }),
  );
});

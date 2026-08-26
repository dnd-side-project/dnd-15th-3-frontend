import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import type { CourseCustomization } from "@/domains/course/api/types";
import { render } from "@/test-utils";

import { CourseGeneratingPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function ChoiceStub() {
  const location = useLocation();
  return <p data-testid="choice-page">{JSON.stringify(location.state)}</p>;
}

function renderGenerating(customization: CourseCustomization | null, generateStatus?: string) {
  fetchMock.mockImplementation((input, init) => {
    const url = new Request(input).url;
    if (url.includes("/meetings/1/courses") && init?.method === "POST") {
      return Promise.resolve(
        jsonResponse({ status: generateStatus, confirmedCourseCandidateId: null }),
      );
    }
    return Promise.resolve(jsonResponse({}));
  });

  const router = createMemoryRouter(
    [
      {
        path: "/meeting/:id/generating",
        Component: CourseGeneratingPage,
      },
      { path: "/meeting/:id/choice", Component: ChoiceStub },
      {
        path: "/meeting/:id/course",
        Component: () => <p data-testid="course-page">코스 페이지</p>,
      },
    ],
    {
      initialEntries: [
        customization === null
          ? "/meeting/1/generating"
          : { pathname: "/meeting/1/generating", state: { customization } },
      ],
    },
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

test("customization 없이 들어오면 선택 화면으로 되돌아가고 코스 생성을 요청하지 않는다", async () => {
  renderGenerating(null);

  await expect.element(page.getByTestId("choice-page")).toBeInTheDocument();
  const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
  expect(post).toBeUndefined();
});

test("SKIP customization 으로 들어오면 코스 생성 POST 를 보내고 완료되면 코스 페이지로 이동한다", async () => {
  renderGenerating({ type: "SKIP" }, "COURSE_GENERATED");

  await expect.element(page.getByTestId("course-page")).toBeInTheDocument();

  const post = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
  expect(post).toBeDefined();
  expect(JSON.parse(post![1]?.body as string)).toEqual({ customization: { type: "SKIP" } });
});

test("생성에 실패하면 선택 화면으로 되돌아가며 실패 상태를 남긴다", async () => {
  renderGenerating({ type: "SKIP" }, "COURSE_GENERATION_FAILED");

  const choicePage = page.getByTestId("choice-page");
  await expect.element(choicePage).toBeInTheDocument();
  await expect.element(choicePage).toHaveTextContent('"generationFailed":true');
});

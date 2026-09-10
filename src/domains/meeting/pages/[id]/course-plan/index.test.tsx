import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { CategorySlug } from "@/domains/catalog/api/types";
import type {
  CoursePlan,
  MeetingPermissions,
  UpdateCoursePlanRequest,
} from "@/domains/meeting/api/types";
import { render } from "@/test-utils";

import { CoursePlanPage } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const CATEGORIES = [
  { id: "1", slug: "restaurant", name: "음식점" },
  { id: "2", slug: "cafe", name: "카페" },
  { id: "3", slug: "bar", name: "술 · 바" },
  { id: "4", slug: "walk", name: "산책 · 야경" },
  { id: "5", slug: "shopping", name: "팝업 · 쇼핑" },
  { id: "6", slug: "activity", name: "액티비티" },
  { id: "7", slug: "culture", name: "문화 · 전시" },
  { id: "8", slug: "other", name: "기타" },
];

const PLAN: CoursePlan = {
  meetingId: "1",
  maxSteps: 6,
  version: 3,
  categorySteps: [
    { id: "1", name: "음식점", slug: "restaurant", order: 1 },
    { id: "2", name: "카페", slug: "cafe", order: 2 },
  ],
};

const HOST: MeetingPermissions = {
  canManageMeeting: true,
  canSelectCourse: true,
  canShareInvitation: true,
};

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function mockApi(permissions: MeetingPermissions) {
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/course-plan")) {
      return Promise.resolve(jsonResponse(PLAN));
    }
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    return Promise.resolve(jsonResponse({ permissions }));
  });
}

function stepsOf(slugs: CategorySlug[]) {
  return slugs.map((slug, index) => ({
    id: String(index + 1),
    name: CATEGORIES.find((category) => category.slug === slug)?.name ?? slug,
    slug,
    order: index + 1,
  }));
}

/** 낙관적 락 서버를 모사한다. PUT은 받은 slugs를 반영해 version을 1 올리고, GET은 최신 상태를 돌려준다. */
function mockCoursePlanServer(onPut: (respond: () => void, body: UpdateCoursePlanRequest) => void) {
  let latest: CoursePlan = PLAN;
  fetchMock.mockImplementation((input, init) => {
    const url = new Request(input).url;
    if (url.includes("/course-plan") && init?.method === "PUT") {
      const body = JSON.parse(init?.body as string) as UpdateCoursePlanRequest;
      return new Promise<Response>((resolve) => {
        onPut(() => {
          latest = {
            ...PLAN,
            categorySteps: stepsOf(body.categorySlugs),
            version: body.version + 1,
          };
          resolve(jsonResponse(latest));
        }, body);
      });
    }
    if (url.includes("/course-plan")) {
      return Promise.resolve(jsonResponse(latest));
    }
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    return Promise.resolve(jsonResponse({ permissions: HOST }));
  });
}

function renderCoursePlanPage() {
  const router = createMemoryRouter(
    [{ path: "/meeting/:id/course-plan", Component: CoursePlanPage }],
    {
      initialEntries: ["/meeting/1/course-plan"],
    },
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

function renderCoursePlan(permissions: MeetingPermissions = HOST) {
  mockApi(permissions);
  renderCoursePlanPage();
}

beforeEach(() => {
  localStorage.setItem("momo.access-token.1", "host-session-token");
});

afterEach(() => {
  fetchMock.mockReset();
  localStorage.clear();
});

test("저장된 코스를 순서대로 보여준다", async () => {
  renderCoursePlan();

  const course = page.getByRole("button", { pressed: true });
  await expect.element(course.first()).toHaveTextContent("음식점");
  await expect.element(course.last()).toHaveTextContent("카페");
});

test("편집을 누르기 전에는 카테고리 목록을 보여주지 않는다", async () => {
  renderCoursePlan();

  await expect.element(page.getByRole("button", { name: "코스 편집" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "술 · 바" })).not.toBeInTheDocument();

  expect(document.querySelectorAll('[aria-pressed="true"]').length).toBe(2);
});

test("모임을 관리할 수 없으면 편집 버튼을 감춘다", async () => {
  renderCoursePlan({ ...HOST, canManageMeeting: false });

  const course = page.getByRole("button", { pressed: true });
  await expect.element(course.first()).toHaveTextContent("음식점");
  await expect.element(page.getByRole("button", { name: "코스 편집" })).not.toBeInTheDocument();
});

test("카테고리를 누르면 바로 조회한 version 으로 PUT 한다", async () => {
  renderCoursePlan();

  await userEvent.click(page.getByRole("button", { name: "코스 편집" }));
  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));

  const put = fetchMock.mock.calls.find(([, init]) => init?.method === "PUT");
  expect(put).toBeDefined();
  expect(new Request(put![0]).url).toContain("/api/v1/meetings/1/course-plan?accessToken=");
  expect(JSON.parse(put![1]?.body as string)).toEqual({
    categorySlugs: ["restaurant", "cafe", "bar"],
    version: 3,
  });
});

test("응답을 기다리지 않고 코스에 먼저 붙인다", async () => {
  renderCoursePlan();

  await userEvent.click(page.getByRole("button", { name: "코스 편집" }));
  fetchMock.mockImplementation(() => new Promise(() => {}));

  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));

  const course = page.getByRole("button", { pressed: true });
  await expect.element(course.last()).toHaveTextContent("술 · 바");
});

test("저장에 실패하면 누르기 전으로 되돌린다", async () => {
  renderCoursePlan();

  await userEvent.click(page.getByRole("button", { name: "코스 편집" }));
  fetchMock.mockImplementation((input) => {
    const url = new Request(input).url;
    if (url.includes("/categories")) {
      return Promise.resolve(jsonResponse(CATEGORIES));
    }
    return Promise.resolve(new Response("", { status: 409 }));
  });

  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));

  await expect
    .element(page.getByRole("button", { pressed: true }).last())
    .toHaveTextContent("카페");
});

test("연달아 눌러도 최신 version으로 순서대로 저장한다", async () => {
  const respondPuts: Array<() => void> = [];
  mockCoursePlanServer((respond) => {
    respondPuts.push(respond);
  });
  renderCoursePlanPage();

  await userEvent.click(page.getByRole("button", { name: "코스 편집" }));
  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));
  await userEvent.click(page.getByRole("button", { name: "산책 · 야경" }));

  respondPuts[0]!();

  await vi.waitFor(() => {
    expect(fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT")).toHaveLength(2);
  });

  const puts = fetchMock.mock.calls.filter(([, init]) => init?.method === "PUT");
  expect(JSON.parse(puts[0]![1]?.body as string)).toEqual({
    categorySlugs: ["restaurant", "cafe", "bar"],
    version: 3,
  });
  expect(JSON.parse(puts[1]![1]?.body as string)).toEqual({
    categorySlugs: ["restaurant", "cafe", "bar", "walk"],
    version: 4,
  });
});

test("저장 중에도 마지막 선택이 화면에 유지된다", async () => {
  const respondPuts: Array<() => void> = [];
  mockCoursePlanServer((respond) => {
    respondPuts.push(respond);
  });
  renderCoursePlanPage();

  await userEvent.click(page.getByRole("button", { name: "코스 편집" }));
  await userEvent.click(page.getByRole("button", { name: "술 · 바" }));
  await userEvent.click(page.getByRole("button", { name: "산책 · 야경" }));

  respondPuts[0]!();

  await vi.waitFor(() => {
    const gets = fetchMock.mock.calls.filter(
      ([input, init]) => new Request(input).url.includes("/course-plan") && init?.method !== "PUT",
    );
    expect(gets.length).toBeGreaterThanOrEqual(2);
  });

  await expect
    .element(page.getByRole("button", { pressed: true }).last())
    .toHaveTextContent("산책 · 야경");
});

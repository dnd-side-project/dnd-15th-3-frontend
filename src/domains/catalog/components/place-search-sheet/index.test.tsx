import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { PlaceSearchSheet } from "./index";

const fetchMock = vi.spyOn(globalThis, "fetch");

const PLACES = [
  {
    id: "1",
    externalAddressId: "region:강남구-서울",
    name: "서울 강남구 전체",
    address: "서울특별시 강남구",
    latitude: 37.4979,
    longitude: 127.0276,
  },
  {
    id: "2",
    externalAddressId: "region:강남동-진주",
    name: "경남 진주시 강남동",
    address: "경상남도 진주시 강남동",
    latitude: 35.1744,
    longitude: 128.0961,
  },
];

function renderSheet(onSelect = vi.fn()) {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <PlaceSearchSheet isOpen onClose={() => {}} onSelect={onSelect} />
    </QueryClientProvider>,
  );
  return onSelect;
}

afterEach(() => {
  fetchMock.mockReset();
});

function respond(places: typeof PLACES) {
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify(places), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  );
}

test("검색어를 입력하기 전에는 결과를 그리지 않는다", async () => {
  respond(PLACES);
  renderSheet();

  await expect.element(page.getByRole("textbox", { name: "위치 검색" })).toBeInTheDocument();
  await expect.element(page.getByText("서울 강남구 전체")).not.toBeInTheDocument();
});

test("검색어를 입력하면 결과를 보여준다", async () => {
  respond(PLACES);
  renderSheet();

  await userEvent.fill(page.getByRole("textbox", { name: "위치 검색" }), "강남");

  await expect.element(page.getByText("서울 강남구 전체")).toBeInTheDocument();
  await expect.element(page.getByText("경남 진주시 강남동")).toBeInTheDocument();
});

test("결과를 고르면 onSelect 로 넘긴다", async () => {
  respond(PLACES);
  const onSelect = renderSheet();

  await userEvent.fill(page.getByRole("textbox", { name: "위치 검색" }), "강남");
  await userEvent.click(page.getByText("서울 강남구 전체"));

  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
});

test("결과가 없으면 안내 문구를 보여준다", async () => {
  respond([]);
  renderSheet();

  await userEvent.fill(page.getByRole("textbox", { name: "위치 검색" }), "없는곳");

  await expect.element(page.getByText("검색 결과가 없어요")).toBeInTheDocument();
});

test("검색에 실패하면 실패 문구를 보여준다", async () => {
  fetchMock.mockResolvedValue(new Response("", { status: 500 }));
  renderSheet();

  await userEvent.fill(page.getByRole("textbox", { name: "위치 검색" }), "강남");

  await expect.element(page.getByText("장소 정보를 불러오지 못했습니다.")).toBeInTheDocument();
});

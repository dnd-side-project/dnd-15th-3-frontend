import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { FirstMeetingPlaceResponse } from "../../domains/catalog/api/types";
import { render } from "../../test-utils";
import { MeetingPlaceSearch } from "./index";

const MOCK_PLACES: FirstMeetingPlaceResponse[] = [
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

function renderMeetingPlaceSearch(
  searchPlaces: (keyword: string) => Promise<FirstMeetingPlaceResponse[]> = vi.fn(async (keyword) =>
    MOCK_PLACES.filter((p) => p.name.includes(keyword)),
  ),
  onSelectPlace: (place: FirstMeetingPlaceResponse) => void = vi.fn(),
) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={queryClient}>
      <MeetingPlaceSearch
        isOpen
        onClose={() => {}}
        onSelectPlace={onSelectPlace}
        searchPlaces={searchPlaces}
      />
    </QueryClientProvider>,
  );
  return { searchPlaces, onSelectPlace };
}

test("위치 검색 입력과 바텀시트를 렌더링한다", async () => {
  renderMeetingPlaceSearch();

  await expect.element(page.getByRole("textbox", { name: "위치 검색" })).toBeInTheDocument();
});

test("검색어를 입력하면 결과가 표시된다", async () => {
  renderMeetingPlaceSearch();

  await userEvent.type(page.getByRole("textbox", { name: "위치 검색" }), "강남");

  await expect.element(page.getByText("서울 강남구 전체")).toBeInTheDocument();
});

test("결과를 클릭하면 onSelectPlace가 호출된다", async () => {
  const { onSelectPlace } = renderMeetingPlaceSearch();

  await userEvent.type(page.getByRole("textbox", { name: "위치 검색" }), "강남");
  await userEvent.click(page.getByText("서울 강남구 전체"));

  expect(onSelectPlace).toHaveBeenCalledWith(
    expect.objectContaining({ id: "1", name: "서울 강남구 전체" }),
  );
});

test("검색 결과가 없으면 빈 메시지를 표시한다", async () => {
  renderMeetingPlaceSearch(async () => []);

  await userEvent.type(page.getByRole("textbox", { name: "위치 검색" }), "없는검색어");

  await expect.element(page.getByText("검색 결과가 없어요")).toBeInTheDocument();
});

test("검색 중 오류가 발생하면 에러 메시지를 표시한다", async () => {
  renderMeetingPlaceSearch(async () => {
    throw new Error("카카오 REST API 키가 설정되지 않았습니다.");
  });

  await userEvent.type(page.getByRole("textbox", { name: "위치 검색" }), "강남");

  await expect
    .element(page.getByText("카카오 REST API 키가 설정되지 않았습니다."))
    .toBeInTheDocument();
});

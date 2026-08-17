import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { fn } from "storybook/test";

import type { FirstMeetingPlaceResponse } from "../../domains/catalog/api/types";
import { withLayout } from "../layout/index.decorators";
import type { MeetingPlaceSearchProps } from "./index";
import { MeetingPlaceSearch } from "./index";

const MOCK_RESULTS: FirstMeetingPlaceResponse[] = [
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
  {
    id: "3",
    externalAddressId: "region:송파구-서울",
    name: "서울 송파구 전체",
    address: "서울특별시 송파구",
    latitude: 37.5145,
    longitude: 127.106,
  },
  {
    id: "4",
    externalAddressId: "region:분당구-성남",
    name: "경기 성남시 분당구",
    address: "경기도 성남시 분당구",
    latitude: 37.3948,
    longitude: 127.117,
  },
  {
    id: "5",
    externalAddressId: "region:마포구-서울",
    name: "서울 마포구 전체",
    address: "서울특별시 마포구",
    latitude: 37.5665,
    longitude: 126.9018,
  },
  {
    id: "6",
    externalAddressId: "region:해운대구-부산",
    name: "부산 해운대구 전체",
    address: "부산광역시 해운대구",
    latitude: 35.1631,
    longitude: 129.1636,
  },
];

function mockSearch(keyword: string) {
  return Promise.resolve(MOCK_RESULTS.filter((r) => r.name.includes(keyword)));
}

function errorSearch() {
  return Promise.reject(new Error("카카오 REST API 키가 설정되지 않았습니다."));
}

function InteractiveStory({ searchPlaces, emptyMessage, placeholder }: MeetingPlaceSearchProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState<FirstMeetingPlaceResponse | null>(null);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)} style={{ margin: 20 }}>
        위치 검색 열기
      </button>
      {selected ? (
        <p style={{ margin: 20, fontFamily: "sans-serif" }}>
          선택됨: <strong>{selected.name}</strong> ({selected.address})
        </p>
      ) : null}
      <MeetingPlaceSearch
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelectPlace={(place) => {
          setSelected(place);
          setIsOpen(false);
        }}
        searchPlaces={searchPlaces}
        placeholder={placeholder}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const meta = {
  component: MeetingPlaceSearch,
  title: "components/MeetingPlaceSearch",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    onClose: fn(),
    onSelectPlace: fn(),
    searchPlaces: mockSearch,
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof MeetingPlaceSearch>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  decorators: [withLayout],
  render: (args) => <InteractiveStory {...args} />,
};

export const ApiError: Story = {
  decorators: [withLayout],
  args: {
    searchPlaces: errorSearch,
  },
  render: (args) => <InteractiveStory {...args} />,
};

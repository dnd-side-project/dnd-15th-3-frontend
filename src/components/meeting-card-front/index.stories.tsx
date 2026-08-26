import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";
import type { CourseDetail, CourseRouteStep } from "@/domains/course/api/types";

import { MeetingCard } from "./index";

const sampleRoute: CourseRouteStep[] = [
  {
    recommendationId: "rec-1",
    placeId: "place-1",
    order: 1,
    name: "성수다이닝",
    category: "음식",
    categorySlug: "restaurant",
    address: "서울 성동구 성수동",
    primaryImageUrl: null,
    longitude: 127.056,
    latitude: 37.544,
    walkDurationToNextMin: 8,
  },
  {
    recommendationId: "rec-2",
    placeId: "place-2",
    order: 2,
    name: "서울숲",
    category: "문화",
    categorySlug: "culture",
    address: "서울 성동구 성수동",
    primaryImageUrl: null,
    longitude: 127.044,
    latitude: 37.547,
    walkDurationToNextMin: 5,
  },
  {
    recommendationId: "rec-3",
    placeId: "place-3",
    order: 3,
    name: "왕십리골목",
    category: "여가",
    categorySlug: "activity",
    address: "서울 성동구 행당동",
    primaryImageUrl: null,
    longitude: 127.043,
    latitude: 37.561,
    walkDurationToNextMin: 3,
  },
  {
    recommendationId: "rec-4",
    placeId: "place-4",
    order: 4,
    name: "한강공원",
    category: "여가",
    categorySlug: "activity",
    address: "서울 영등포구 여의동",
    primaryImageUrl: null,
    longitude: 126.976,
    latitude: 37.529,
    walkDurationToNextMin: 7,
  },
  {
    recommendationId: "rec-5",
    placeId: "place-5",
    order: 5,
    name: "을지로",
    category: "쇼핑",
    categorySlug: "shopping",
    address: "서울 중구 을지로",
    primaryImageUrl: null,
    longitude: 126.988,
    latitude: 37.566,
    walkDurationToNextMin: 6,
  },
  {
    recommendationId: "rec-6",
    placeId: "place-6",
    order: 6,
    name: "이태원",
    category: "음식",
    categorySlug: "restaurant",
    address: "서울 용산구 이태원동",
    primaryImageUrl: null,
    longitude: 126.994,
    latitude: 37.534,
    walkDurationToNextMin: null,
  },
];

const sampleCourseDetail: CourseDetail = {
  courseName: "성수 다이닝 코스",
  totalDistanceKm: 2.1,
  totalCount: 6,
  route: sampleRoute,
};

const meta = {
  component: MeetingCard,
  title: "components/MeetingCardFront",
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          padding: 24,
        }}
      >
        <Story />
      </div>
    ),
    withLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    courseDetail: sampleCourseDetail,
    meetingName: "다같이 으쌰으쌰",
    meetingDate: "2026-07-25",
    meetingTime: "13:00",
    size: "medium",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
  },
} satisfies Meta<typeof MeetingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const LongRoute: Story = {
  args: {
    courseDetail: {
      courseName: "성수 데이트 풀코스",
      totalDistanceKm: 3.4,
      totalCount: 8,
      route: [
        ...sampleRoute,
        {
          recommendationId: "rec-7",
          placeId: "place-7",
          order: 7,
          name: "남산타워",
          category: "문화",
          categorySlug: "culture",
          address: "서울 용산구 용산동2가",
          primaryImageUrl: null,
          longitude: 126.988,
          latitude: 37.551,
          walkDurationToNextMin: 4,
        },
        {
          recommendationId: "rec-8",
          placeId: "place-8",
          order: 8,
          name: "명동",
          category: "쇼핑",
          categorySlug: "shopping",
          address: "서울 중구 명동",
          primaryImageUrl: null,
          longitude: 126.985,
          latitude: 37.561,
          walkDurationToNextMin: null,
        },
      ],
    },
  },
};

export const LargeLongRoute: Story = {
  args: {
    size: "large",
    courseDetail: {
      courseName: "성수 데이트 풀코스",
      totalDistanceKm: 3.4,
      totalCount: 8,
      route: [
        ...sampleRoute,
        {
          recommendationId: "rec-7",
          placeId: "place-7",
          order: 7,
          name: "남산타워",
          category: "문화",
          categorySlug: "culture",
          address: "서울 용산구 용산동2가",
          primaryImageUrl: null,
          longitude: 126.988,
          latitude: 37.551,
          walkDurationToNextMin: 4,
        },
        {
          recommendationId: "rec-8",
          placeId: "place-8",
          order: 8,
          name: "명동",
          category: "쇼핑",
          categorySlug: "shopping",
          address: "서울 중구 명동",
          primaryImageUrl: null,
          longitude: 126.985,
          latitude: 37.561,
          walkDurationToNextMin: null,
        },
      ],
    },
  },
};

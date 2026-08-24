import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { withLayout } from "@/components/layout/index.decorators";
import type { CourseRouteStep } from "@/domains/course/api/types";

import { CoursePlaceStrip } from "./index";

const route: CourseRouteStep[] = [
  {
    recommendationId: "1",
    placeId: "place-1",
    order: 1,
    name: "런던베이글뮤지엄 안국점",
    category: "카페",
    categorySlug: "cafe",
    address: "서울 종로구 안국동 6-1",
    primaryImageUrl: "https://picsum.photos/seed/place1/200/200",
    longitude: 126.985,
    latitude: 37.576,
    walkDurationToNextMin: 8,
  },
  {
    recommendationId: "2",
    placeId: "place-2",
    order: 2,
    name: "을지로 골목 산책",
    category: "산책",
    categorySlug: "walk",
    address: "서울 중구 을지로",
    primaryImageUrl: null,
    longitude: 126.991,
    latitude: 37.566,
    walkDurationToNextMin: null,
  },
];

const meta = {
  component: CoursePlaceStrip,
  title: "domains/course/CoursePlaceStrip",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    route,
    onAdd: fn(),
  },
} satisfies Meta<typeof CoursePlaceStrip>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

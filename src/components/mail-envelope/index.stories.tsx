import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";
import type { CourseDetail, CourseRouteStep } from "@/domains/course/api/types";

import { MailEnvelope, type MailEnvelopePhase } from "./index";

const sampleRoute: CourseRouteStep[] = [
  {
    recommendationId: "rec-1",
    placeId: "place-1",
    order: 1,
    name: "성수다이닝",
    category: "음식",
    categorySlug: "restaurant",
    address: "서울 성동구 성수동",
    previewPhoto: null,
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
    previewPhoto: null,
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
    previewPhoto: null,
    longitude: 127.043,
    latitude: 37.561,
    walkDurationToNextMin: 3,
  },
];

const sampleCourseDetail: CourseDetail = {
  courseName: "성수 다이닝 코스",
  totalDistanceKm: 2.1,
  totalCount: 3,
  route: sampleRoute,
};

const meta = {
  component: MailEnvelope,
  title: "components/MailEnvelope",
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          padding: 24,
          background: "linear-gradient(180deg, #B8D3FF 0%, #E7F4FF 100%)",
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
    meetingDate: "2026-08-25",
    meetingTime: "13:00",
    phase: "closed",
  },
  argTypes: {
    phase: {
      control: "inline-radio",
      options: ["closed", "opening", "card-rising"] satisfies MailEnvelopePhase[],
    },
  },
} satisfies Meta<typeof MailEnvelope>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    phase: "closed",
  },
};

export const Opening: Story = {
  args: {
    phase: "opening",
  },
};

export const CardRising: Story = {
  args: {
    phase: "card-rising",
  },
};

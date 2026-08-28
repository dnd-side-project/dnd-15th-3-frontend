import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";
import { CATEGORY_SLUGS } from "@/domains/catalog/api/types";

import { PlaceMarker } from "./index";

const meta = {
  component: PlaceMarker,
  title: "components/PlaceMarker",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    category: "restaurant",
  },
} satisfies Meta<typeof PlaceMarker>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <PlaceMarker {...args} />
    </div>
  ),
};

export const Categories: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "24px" }}>
      {CATEGORY_SLUGS.map((category) => (
        <PlaceMarker category={category} key={category} label={category} />
      ))}
    </div>
  ),
};

export const OnMap: Story = {
  render: () => (
    <div style={{ background: "#E9ECEF", height: "320px", position: "relative" }}>
      <div style={{ left: "36px", position: "absolute", top: "40px" }}>
        <PlaceMarker category="cafe" label="카페" />
      </div>
      <div style={{ left: "160px", position: "absolute", top: "120px" }}>
        <PlaceMarker category="restaurant" label="식당" />
      </div>
      <div style={{ left: "70px", position: "absolute", top: "204px" }}>
        <PlaceMarker category="bar" label="술집" />
      </div>
    </div>
  ),
};

export default meta;

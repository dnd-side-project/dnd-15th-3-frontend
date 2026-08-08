import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "../layout/index.decorators";
import { RouteMarker } from "./index";

const imageUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='68' height='68'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23FFC98A'/%3E%3Cstop offset='1' stop-color='%23FF7A9A'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='68' height='68' fill='url(%23g)'/%3E%3Ccircle cx='22' cy='22' r='8' fill='%23FFFFFF' fill-opacity='0.7'/%3E%3C/svg%3E";

const meta = {
  component: RouteMarker,
  title: "components/RouteMarker",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    index: 1,
  },
} satisfies Meta<typeof RouteMarker>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <RouteMarker {...args} />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    imageAlt: "성수 카페",
    imageUrl,
  },
  render: (args) => (
    <div style={{ padding: "24px" }}>
      <RouteMarker {...args} />
    </div>
  ),
};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "20px", padding: "24px" }}>
      <RouteMarker {...args} index={1} tone="blue" />
      <RouteMarker {...args} index={2} tone="pink" />
      <RouteMarker {...args} index={3} tone="purple" />
    </div>
  ),
};

export const Sequence: Story = {
  render: (args) => (
    <div style={{ background: "#E9ECEF", height: "320px", position: "relative" }}>
      <div style={{ left: "36px", position: "absolute", top: "40px" }}>
        <RouteMarker {...args} imageAlt="첫 번째 장소" imageUrl={imageUrl} index={1} tone="blue" />
      </div>
      <div style={{ left: "160px", position: "absolute", top: "120px" }}>
        <RouteMarker {...args} index={2} tone="pink" />
      </div>
      <div style={{ left: "70px", position: "absolute", top: "204px" }}>
        <RouteMarker {...args} index={3} tone="purple" />
      </div>
    </div>
  ),
};

export default meta;

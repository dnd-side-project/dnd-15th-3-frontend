import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "../layout/index.decorators";
import type { PlaceCategory } from "./index";
import { PlaceIcon } from "./index";

const categories: PlaceCategory[] = [
  "restaurant",
  "activity",
  "shopping",
  "walk",
  "bar",
  "culture",
  "cafe",
];

const meta = {
  component: PlaceIcon,
  title: "components/PlaceIcon",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    category: "restaurant",
  },
} satisfies Meta<typeof PlaceIcon>;

type Story = StoryObj<typeof meta>;

export const AllCategories: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", padding: "20px" }}>
      {categories.map((category) => (
        <PlaceIcon category={category} key={category} size={20} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "20px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        {categories.map((category) => (
          <PlaceIcon category={category} key={category} size={16} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        {categories.map((category) => (
          <PlaceIcon category={category} key={category} size={20} />
        ))}
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    category: "cafe",
    label: "카페",
  },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <PlaceIcon {...args} />
    </div>
  ),
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";

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
  "other",
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

export const Default: Story = {
  args: {
    category: "restaurant",
    size: 20,
  },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <PlaceIcon {...args} />
    </div>
  ),
};

// 카테고리 8종을 한 번에 보여주는 쇼케이스라 단일 args 로 표현할 수 없어 컨트롤을 끈다
export const AllCategories: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: "12px", padding: "20px" }}>
      {categories.map((category) => (
        <PlaceIcon category={category} key={category} size={20} />
      ))}
    </div>
  ),
};

// 16/20 두 크기를 나란히 비교하는 쇼케이스라 단일 args 로 표현할 수 없어 컨트롤을 끈다
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
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

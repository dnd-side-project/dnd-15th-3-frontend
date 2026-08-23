import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { withLayout } from "@/components/layout/index.decorators";

import { ShareButtonGroup } from "./index";

const meta = {
  component: ShareButtonGroup,
  title: "components/ShareButtonGroup",
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <Story />
      </div>
    ),
    withLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "모임 코스 완성!",
    description: "함께 다녀올 코스를 확인해보세요.",
    imageUrl: "/vite.svg",
    link: "https://example.com/course/1",
    buttonTitle: "코스 보기",
  },
} satisfies Meta<typeof ShareButtonGroup>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "링크 복사" })).toBeEnabled();
    await expect(canvas.getByRole("button", { name: "카카오톡으로 공유" })).toBeInTheDocument();
  },
};

export const WithMore: Story = {
  args: { onMore: () => {} },
};

export default meta;

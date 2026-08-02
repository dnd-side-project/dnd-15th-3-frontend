import type { Meta, StoryObj } from "@storybook/react-vite";

import { Layout } from "./index";

const meta = {
  component: Layout,
  title: "components/Layout",
  parameters: {
    // 레터박스 배경이 캔버스 전체를 채우도록 패딩 제거
    layout: "fullscreen",
  },
  args: {
    children: "홈",
  },
} satisfies Meta<typeof Layout>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;

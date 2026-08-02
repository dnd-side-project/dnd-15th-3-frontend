import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ShareButtonGroup } from "./index";

const meta = {
  component: ShareButtonGroup,
  title: "components/ShareButtonGroup",
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
    await expect(canvas.getByRole("button", { name: "링크 복사" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "카카오톡으로 공유" })).toBeInTheDocument();
  },
};

export const CopyLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole("button", { name: "링크 복사" });
    // 테스트(headless) 환경은 클립보드 권한이 없을 수 있어, 클릭이
    // 에러 없이 처리되고 버튼이 계속 접근 가능한지만 확인한다.
    await userEvent.click(copyButton);
    await expect(copyButton).toBeInTheDocument();
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export default meta;

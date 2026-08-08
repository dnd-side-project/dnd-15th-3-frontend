import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import CaretRightIcon from "../../assets/icon-caret-right.svg?react";
import { withLayout } from "../layout/index.decorators";
import { TopAppBar } from "./index";

import { iconButton } from "./index.css";

const nextAction = (
  <button aria-label="다음" className={iconButton} type="button">
    <CaretRightIcon aria-hidden height={24} width={24} />
  </button>
);

const meta = {
  component: TopAppBar,
  title: "components/TopAppBar",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "모임 만들기",
    onBack: fn(),
  },
} satisfies Meta<typeof TopAppBar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "뒤로 가기" }));
    await expect(args.onBack).toHaveBeenCalled();
  },
};

export const WithAction: Story = {
  args: {
    action: nextAction,
  },
};

export const TitleOnly: Story = {
  args: {
    onBack: undefined,
  },
};

export const OnWhite: Story = {
  args: {
    background: "white",
    title: "코스수정",
  },
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { TextInputProps } from "./index";
import {
  CharCounter,
  CourseFeedbackInput,
  NicknameInput,
  PlaceSearchInput,
  TextInput,
} from "./index";

type PresetArgs = Pick<TextInputProps, "disabled" | "placeholder">;

const meta = {
  component: TextInput,
  title: "components/TextInput",
  decorators: [
    (Story) => (
      <div style={{ padding: 20 }}>
        <Story />
      </div>
    ),
    withLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    placeholder: "내용을 입력해주세요",
    shape: "rounded",
    disabled: false,
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    endAdornment: { control: false },
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof meta>;

const MAX_LENGTH = 10;

export const Default: Story = {
  args: {
    "aria-label": "텍스트 입력",
  },
};

function NicknameField({ disabled, placeholder }: PresetArgs) {
  const [value, setValue] = useState("");

  return (
    <NicknameInput
      disabled={disabled}
      endAdornment={<CharCounter maxLength={MAX_LENGTH} value={value} />}
      maxLength={MAX_LENGTH}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

export const Nickname: Story = {
  args: {
    placeholder: "닉네임을 입력해주세요",
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder }) => (
    <NicknameField disabled={disabled} placeholder={placeholder} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole("textbox", { name: "닉네임" }), "당근마켓");
    await expect(canvas.getByText("4/10")).toBeInTheDocument();
  },
};

export const PlaceSearch: Story = {
  args: {
    placeholder: "장소를 검색하세요",
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder }) => (
    <PlaceSearchInput disabled={disabled} placeholder={placeholder} />
  ),
};

export const CourseFeedback: Story = {
  args: {
    placeholder: "코스에 대한 의견을 남겨주세요!",
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder }) => (
    <CourseFeedbackInput disabled={disabled} placeholder={placeholder} onSend={() => {}} />
  ),
};

export default meta;

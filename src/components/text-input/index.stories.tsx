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

// 프리셋(Nickname/PlaceSearch/CourseFeedback)이 공통으로 받을 수 있는 args 만 추린다
type PresetArgs = Pick<TextInputProps, "disabled" | "filled" | "placeholder">;

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
    filled: false,
    disabled: false,
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    // 노드라 컨트롤로 편집할 수 없다
    endAdornment: { control: false },
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof meta>;

const MAX_LENGTH = 10;

// TextInput 자체를 그리는 대표 스토리라 모든 args 가 그대로 반영된다
export const Default: Story = {
  args: {
    "aria-label": "텍스트 입력",
  },
};

function NicknameField({ disabled, filled, placeholder }: PresetArgs) {
  const [value, setValue] = useState("");

  return (
    <NicknameInput
      disabled={disabled}
      endAdornment={<CharCounter maxLength={MAX_LENGTH} value={value} />}
      filled={filled}
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
  // shape 는 프리셋이 고정하고, value/onChange 는 데모가 직접 들고 있다
  argTypes: { shape: { control: false } },
  render: ({ disabled, filled, placeholder }) => (
    <NicknameField disabled={disabled} filled={filled} placeholder={placeholder} />
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
  // shape 와 endAdornment(검색 아이콘)는 프리셋이 고정한다
  argTypes: { shape: { control: false } },
  render: ({ disabled, filled, placeholder }) => (
    <PlaceSearchInput disabled={disabled} filled={filled} placeholder={placeholder} />
  ),
};

export const CourseFeedback: Story = {
  args: {
    placeholder: "코스에 대한 의견을 남겨주세요!",
  },
  // shape 와 endAdornment(전송 버튼)는 프리셋이 고정한다
  argTypes: { shape: { control: false } },
  render: ({ disabled, filled, placeholder }) => (
    <CourseFeedbackInput
      disabled={disabled}
      filled={filled}
      placeholder={placeholder}
      onSend={() => {}}
    />
  ),
};

export default meta;

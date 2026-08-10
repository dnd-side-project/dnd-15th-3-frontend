import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { TextInputProps } from "./index";
import { CourseFeedbackInput, NicknameInput, PlaceSearchInput, TextInput } from "./index";

type PresetArgs = Pick<TextInputProps, "disabled" | "placeholder" | "showCount">;

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
    showCount: false,
  },
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    endIcon: { control: false },
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "텍스트 입력",
  },
};

export const Nickname: Story = {
  args: {
    placeholder: "닉네임을 입력해주세요",
    showCount: true,
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder, showCount }: PresetArgs) => (
    <NicknameInput
      disabled={disabled}
      maxLength={10}
      placeholder={placeholder}
      showCount={showCount}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole("textbox", { name: "닉네임" }), "강남역");
    await expect(canvas.getByText("3/10")).toBeInTheDocument();
  },
};

export const PlaceSearch: Story = {
  args: {
    placeholder: "장소를 검색하세요",
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder }: PresetArgs) => (
    <PlaceSearchInput disabled={disabled} placeholder={placeholder} />
  ),
};

export const CourseFeedback: Story = {
  args: {
    placeholder: "코스에 대한 의견을 남겨주세요!",
  },
  argTypes: { shape: { control: false } },
  render: ({ disabled, placeholder }: PresetArgs) => (
    <CourseFeedbackInput disabled={disabled} placeholder={placeholder} onSend={() => {}} />
  ),
};

export default meta;

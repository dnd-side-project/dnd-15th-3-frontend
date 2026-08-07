import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import { CharCounter, CourseFeedbackInput, NicknameInput, PlaceSearchInput } from "./index";

const meta = {
  component: NicknameInput,
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
} satisfies Meta<typeof NicknameInput>;

type Story = StoryObj<typeof meta>;

const MAX_LENGTH = 10;

function NicknameField() {
  const [value, setValue] = useState("");

  return (
    <NicknameInput
      endAdornment={<CharCounter maxLength={MAX_LENGTH} value={value} />}
      maxLength={MAX_LENGTH}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

export const Nickname: Story = {
  render: () => <NicknameField />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole("textbox", { name: "닉네임" }), "당근마켓");
    await expect(canvas.getByText("4/10")).toBeInTheDocument();
  },
};

export const PlaceSearch: Story = {
  render: () => <PlaceSearchInput />,
};

export const CourseFeedback: Story = {
  render: () => <CourseFeedbackInput onSend={() => {}} />,
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import { PreferenceButton } from "./index";

const meta = {
  component: PreferenceButton,
  title: "components/PreferenceButton",
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: "#2F3A2A", display: "flex", gap: 8, padding: 16 }}>
        <Story />
      </div>
    ),
    withLayout,
  ],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    count: 3,
    selected: false,
    type: "like",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["like", "dislike"],
    },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    count: { control: "number" },
  },
} satisfies Meta<typeof PreferenceButton>;

type Story = StoryObj<typeof meta>;

function Preference() {
  const [choice, setChoice] = useState<"like" | "dislike" | null>(null);

  return (
    <>
      <PreferenceButton
        count={choice === "like" ? 4 : 3}
        selected={choice === "like"}
        type="like"
        onToggle={(next) => setChoice(next ? "like" : null)}
      />
      <PreferenceButton
        count={choice === "dislike" ? 2 : 1}
        selected={choice === "dislike"}
        type="dislike"
        onToggle={(next) => setChoice(next ? "dislike" : null)}
      />
    </>
  );
}

export const Default: Story = {
  render: () => <Preference />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "좋아요 3" }));
    await expect(canvas.getByRole("button", { name: "좋아요 4" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export const Selected: Story = {
  args: { selected: true },
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import { CtaButton, CtaButtonRow } from "./index";

const meta = {
  component: CtaButton,
  title: "components/CtaButton",
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
    children: "다음",
  },
} satisfies Meta<typeof CtaButton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "다음" }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Row: Story = {
  render: () => <CtaButtonRow nextDisabled nextLabel="다음" onBack={() => {}} onNext={() => {}} />,
};

export default meta;

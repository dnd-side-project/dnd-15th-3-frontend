import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "../layout/index.decorators";
import { CtaButton, CtaButtonRow } from "./index";

const meta = {
  component: CtaButton,
  title: "components/CtaButton",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: "다음",
  },
} satisfies Meta<typeof CtaButton>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Row: Story = {
  render: () => <CtaButtonRow nextLabel="다음" onBack={() => {}} onNext={() => {}} />,
};

export const RowNextDisabled: Story = {
  render: () => <CtaButtonRow nextDisabled nextLabel="다음" onBack={() => {}} onNext={() => {}} />,
};

export default meta;

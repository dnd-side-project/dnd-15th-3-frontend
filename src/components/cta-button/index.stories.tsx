import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import ExportIcon from "../../assets/icon-export.svg?react";
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

export const WithIcon: Story = {
  args: {
    children: "공유하기",
    disabled: true,
    icon: <ExportIcon aria-hidden height={25} width={25} />,
    onClick: fn(),
  },
};

// meta 의 args 는 CtaButton 기준이므로, 각 arg 를 CtaButtonRow 의 대응 prop 으로 넘겨 컨트롤을 살린다.
const onSecondary = fn();

export const Row: Story = {
  args: { onClick: fn() },
  render: ({ children, disabled, onClick }) => (
    <CtaButtonRow
      primaryDisabled={disabled}
      primaryLabel={children}
      onPrimary={() => onClick?.()}
      onSecondary={onSecondary}
    />
  ),
};

export const RowDisabled: Story = {
  args: { disabled: true, onClick: fn() },
  render: ({ children, disabled, onClick }) => (
    <CtaButtonRow
      primaryDisabled={disabled}
      primaryLabel={children}
      onPrimary={() => onClick?.()}
      onSecondary={onSecondary}
    />
  ),
};

export const RowWithIconAction: Story = {
  args: { onClick: fn() },
  render: ({ children, disabled, onClick }) => (
    <CtaButtonRow
      primaryDisabled={disabled}
      primaryLabel={children}
      secondaryAriaLabel="공유하기"
      secondaryLabel={<ExportIcon aria-hidden height={32} width={32} />}
      onPrimary={() => onClick?.()}
      onSecondary={onSecondary}
    />
  ),
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import type { PopupProps } from "./index";
import { Popup } from "./index";

function AlertMedia() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 85,
        height: 85,
        borderRadius: 42.5,
        background: "linear-gradient(180deg, #E7F0FF 0%, #D1E2FE 100%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
        <div style={{ width: 9, height: 40, borderRadius: 4.5, backgroundColor: "#66ADFF" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#66ADFF" }} />
      </div>
    </div>
  );
}

function PinMedia() {
  return (
    <div style={{ position: "relative", width: 55, height: 68.75 }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 55,
          height: 55,
          borderRadius: "50%",
          background: "linear-gradient(180deg, #9AC5FF 0%, #4A93F8 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 44,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderTop: "24.75px solid #4A93F8",
        }}
      />
    </div>
  );
}

function InteractivePopup({ open: initialOpen, onOpenChange, ...props }: PopupProps) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <Popup
      {...props}
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange(next);
      }}
    />
  );
}

const meta = {
  component: Popup,
  title: "components/Popup",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    open: true,
    onOpenChange: fn(),
    title: "이미 추가된 장소에요",
    description: "다른 장소를 찾아봐요",
  },
  render: (args) => <InteractivePopup {...args} />,
} satisfies Meta<typeof Popup>;

type Story = StoryObj<typeof meta>;

export const AlreadyAdded: Story = {
  args: {
    media: <AlertMedia />,
  },
};

export const CourseCreating: Story = {
  args: {
    title: "코스를 생성중이에요",
    description: "코스가 완성되면 함께 확인할 수 있어요.",
    media: <PinMedia />,
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
    media: <AlertMedia />,
  },
  play: async ({ args }) => {
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));

    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  },
};

export const WithoutClose: Story = {
  args: {
    media: <AlertMedia />,
    showClose: false,
  },
  play: async () => {
    await expect(screen.getByRole("dialog")).toBeInTheDocument();
    await expect(screen.queryByRole("button", { name: "닫기" })).not.toBeInTheDocument();
  },
};

export default meta;

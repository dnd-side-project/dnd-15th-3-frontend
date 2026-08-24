import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { withLayout } from "@/components/layout/index.decorators";

import type { PopupProps } from "./index";
import { Popup } from "./index";

function MomoMedia() {
  return (
    <>
      <img
        alt=""
        src="/static/popup-momo.webp"
        style={{ position: "absolute", top: 31, left: 38, width: 183, height: 158 }}
      />
      <span
        style={{
          position: "absolute",
          top: 182,
          left: 91,
          width: 78,
          height: 7,
          borderRadius: "50%",
          backgroundColor: "#DAE1EC",
          filter: "blur(4px)",
        }}
      />
    </>
  );
}

function CourseMapMedia() {
  return (
    <>
      <img
        alt=""
        src="/static/popup-course-map.webp"
        style={{ position: "absolute", top: -53, left: -5.4, width: 268.71, height: 323 }}
      />
      <img
        alt=""
        src="/static/popup-course-pin.webp"
        style={{ position: "absolute", top: 89, left: 102, width: 55, height: 68.75 }}
      />
    </>
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
    media: <MomoMedia />,
  },
};

export const CourseCreating: Story = {
  args: {
    title: "코스를 생성중이에요",
    description: "코스가 완성되면 함께 확인할 수 있어요.",
    media: <CourseMapMedia />,
  },
};

export default meta;

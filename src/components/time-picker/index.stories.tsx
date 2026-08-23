import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { withLayout } from "@/components/layout/index.decorators";
import { type Time } from "@/utils/time";

import { TimePicker } from ".";
const meta = {
  component: TimePicker,
  title: "components/new/TimePicker",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    meetingTime: null,
    setMeetingTime: () => {},
  },
  decorators: [withLayout],
} satisfies Meta<typeof TimePicker>;

export default meta;

function DefaultComponent() {
  const [meetingTime, setMeetingTime] = useState<Time | null>(null);
  return (
    <>
      <TimePicker meetingTime={meetingTime} setMeetingTime={setMeetingTime} />
    </>
  );
}

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DefaultComponent />,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { DayPicker } from ".";
import { withLayout } from "../layout/index.decorators";
const meta = {
  component: DayPicker,
  title: "components/new/DayPicker",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    date: new Date(),
    setDate: () => {},
  },
  decorators: [withLayout],
} satisfies Meta<typeof DayPicker>;

export default meta;

function DefaultComponent() {
  const [meetingDay, setMeetingDay] = useState<Date | undefined>(undefined);
  return (
    <>
      <DayPicker date={meetingDay} setDate={setMeetingDay} />
    </>
  );
}

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DefaultComponent />,
};

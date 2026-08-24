import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";

import { ToastProvider } from "./index";
import { toast } from "./manager";

const meta = {
  component: ToastProvider,
  title: "components/Toast",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withLayout],
} satisfies Meta<typeof ToastProvider>;

type Story = StoryObj<typeof meta>;

function Buttons() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 100 }}>
      <button type="button" onClick={() => toast.add({ title: "초대 코드가 복사되었습니다." })}>
        초대 코드 복사
      </button>
      <button type="button" onClick={() => toast.add({ title: "링크가 복사되었습니다." })}>
        링크 복사
      </button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Buttons />
    </ToastProvider>
  ),
};

export default meta;

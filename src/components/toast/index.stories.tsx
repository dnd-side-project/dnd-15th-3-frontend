import type { Meta, StoryObj } from "@storybook/react-vite";

import { useToast } from "../../hooks/use-toast";
import { withLayout } from "../layout/index.decorators";
import { Toast } from "./index";

const meta = {
  component: Toast,
  title: "components/Toast",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withLayout],
  args: {
    toast: { message: "초대 코드가 복사되었습니다.", visible: true },
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Link: Story = {
  args: {
    toast: { message: "링크가 복사되었습니다.", visible: true },
  },
};

function Playground() {
  const { toast, show } = useToast();

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 100 }}>
      <Toast toast={toast} />
      <button type="button" onClick={() => show("초대 코드가 복사되었습니다.")}>
        띄우기
      </button>
    </div>
  );
}

export const WithHook: Story = {
  render: () => <Playground />,
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "@/components/layout/index.decorators";

import { PreferenceButton } from "./index";

interface SurfaceProps {
  background: string;
  children: ReactNode;
}

// 버튼이 실제로 올라가는 면(흰 카드, 흰 리스트 등)을 흉내내는 래퍼
function Surface({ background, children }: SurfaceProps) {
  return <div style={{ background, display: "flex", gap: 4, padding: 16 }}>{children}</div>;
}

const meta = {
  component: PreferenceButton,
  title: "components/PreferenceButton",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    count: 3,
    selected: false,
    tone: "overlay",
    type: "like",
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["like", "dislike"],
    },
    tone: { control: "inline-radio", options: ["overlay", "muted"] },
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

// 컨트롤을 조작하며 네 가지 상태를 모두 확인하기 위한 중립 배경이다.
// 실제 사용 맥락은 OnWhiteCard / Muted 가 담당한다.
export const Default: Story = {
  render: (args) => (
    <Surface background="#6B7280">
      <PreferenceButton {...args} />
    </Surface>
  ),
};

// 같은 overlay 톤이라도 흰 카드 위에서는 #FBFBFC 로 거의 흰색이 된다.
export const OnWhiteCard: Story = {
  args: { tone: "overlay" },
  render: (args) => (
    <div style={{ background: "#EEF0F4", padding: 16 }}>
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
          display: "flex",
          gap: 4,
          padding: 16,
        }}
      >
        <PreferenceButton {...args} />
      </div>
    </div>
  ),
};

// 흰 리스트("함께 저장된 장소") 위의 선택안함 상태는 불투명한 #ECEFF5 를 쓴다.
export const Muted: Story = {
  args: { tone: "muted" },
  render: (args) => (
    <div style={{ background: "#FFFFFF", padding: 16 }}>
      <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
        <div style={{ background: "#ECEFF5", borderRadius: 8, height: 48, width: 48 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>함께 저장된 장소</span>
          <div style={{ display: "flex", gap: 4 }}>
            <PreferenceButton {...args} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Selected: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Surface background="#FFFFFF">
      <PreferenceButton count={4} selected type="like" />
      <PreferenceButton count={2} selected type="dislike" />
    </Surface>
  ),
};

// 자체 상태로 좋아요/싫어요를 하나만 고르도록 하는 상호작용 데모
export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Surface background="#FFFFFF">
      <Preference />
    </Surface>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "좋아요 3" }));
    await expect(canvas.getByRole("button", { name: "좋아요 4" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  },
};

export default meta;

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { withLayout } from "../layout/index.decorators";
import { PreferenceButton } from "./index";

// overlay 톤은 반투명(#F2F3F7 34%)이라 아래에 깔린 것에 따라 다르게 보인다.
// 에셋을 추가하지 않고 밝은 영역과 어두운 영역이 함께 있는 사진을 SVG 로 흉내낸다.
const photoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#DB8F55" />
      <stop offset="1" stop-color="#FFF3E0" />
    </linearGradient>
  </defs>
  <rect fill="url(#sky)" height="180" width="320" />
  <circle cx="232" cy="68" fill="#FFFFFF" r="24" />
  <path d="M0 118 L90 64 L170 122 L240 86 L320 132 L320 180 L0 180 Z" fill="#1C2530" />
</svg>`;

const photoBackground = `url("data:image/svg+xml,${encodeURIComponent(photoSvg)}") center / cover no-repeat`;

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

export const Default: Story = {
  render: (args) => (
    <Surface background="#FFFFFF">
      <PreferenceButton {...args} />
    </Surface>
  ),
};

// 미선택 상태의 실제 맥락: 장소 사진 위. 반투명이라 사진 색이 그대로 비친다.
export const OnPhoto: Story = {
  args: { tone: "overlay" },
  render: (args) => (
    <div style={{ background: photoBackground, height: 200, position: "relative" }}>
      <div style={{ left: 16, position: "absolute", top: 16 }}>
        <PreferenceButton {...args} />
      </div>
      <div style={{ bottom: 16, left: 16, position: "absolute" }}>
        <PreferenceButton {...args} />
      </div>
    </div>
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

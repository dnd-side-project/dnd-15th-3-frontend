import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { withLayout } from "../layout/index.decorators";
import { ProgressBar } from "./index";

const meta = {
  component: ProgressBar,
  title: "components/ProgressBar",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    currentStep: 1,
    totalStep: 5,
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: 30 }}>
      <ProgressBar {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function InteractiveStory({ currentStep, totalStep }: { currentStep: number; totalStep: number }) {
  const [step, setStep] = useState(currentStep);

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <ProgressBar currentStep={step} totalStep={totalStep} />
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <label htmlFor="step-slider">단계:</label>
        <input
          id="step-slider"
          type="range"
          min={1}
          max={totalStep}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span>
          {step} / {totalStep}
        </span>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: (args) => <InteractiveStory currentStep={args.currentStep} totalStep={args.totalStep} />,
};

export default meta;

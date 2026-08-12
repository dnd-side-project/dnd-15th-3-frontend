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
    totalSteps: 5,
  },
  render: (args) => (
    <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingTop: 30 }}>
      <ProgressBar {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function InteractiveStory({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
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
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <label htmlFor="step-slider">단계:</label>
        <input
          id="step-slider"
          type="range"
          min={1}
          max={totalSteps}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <span>
          {step} / {totalSteps}
        </span>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: (args) => (
    <InteractiveStory currentStep={args.currentStep} totalSteps={args.totalSteps} />
  ),
};

export default meta;

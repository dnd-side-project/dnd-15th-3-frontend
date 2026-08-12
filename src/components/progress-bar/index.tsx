import { container, step } from "./index.css";

interface StepProps {
  isCurrent: boolean;
}

function Step({ isCurrent }: StepProps) {
  return <div className={step({ isCurrent })}></div>;
}

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div
      className={container}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`진행 상태: ${currentStep}/${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Step key={index} isCurrent={currentStep === index + 1} />
      ))}
    </div>
  );
}

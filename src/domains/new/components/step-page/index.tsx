import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { CtaButtonRow } from "../../../../components/cta-button";
import { Layout } from "../../../../components/layout";
import { TopAppBar } from "../../../../components/top-app-bar";

import { surfaceColor } from "../../../../components/layout/index.css";
import { body, footer } from "./index.css";

export interface StepPageProps {
  title: string;
  children: ReactNode;
  primaryLabel?: ReactNode;
  primaryDisabled?: boolean;
  onPrimary: () => void;
}

export function StepPage({
  title,
  children,
  primaryLabel = "다음",
  primaryDisabled = false,
  onPrimary,
}: StepPageProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <TopAppBar background={surfaceColor} title={title} onBack={() => void navigate(-1)} />
      <div className={body}>{children}</div>
      <div className={footer}>
        <CtaButtonRow
          primaryDisabled={primaryDisabled}
          primaryLabel={primaryLabel}
          onPrimary={onPrimary}
          onSecondary={() => void navigate(-1)}
        />
      </div>
    </Layout>
  );
}

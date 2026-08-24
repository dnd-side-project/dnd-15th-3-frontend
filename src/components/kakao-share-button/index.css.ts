import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const wrapper = style({
  display: "inline-flex",
  flexDirection: "column",
  gap: vars.space.xs,
  alignItems: "flex-start",
});

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.external.kakaoYellow,
  color: vars.color.external.kakaoText,
  fontFamily: vars.font.body,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  cursor: "pointer",
  selectors: {
    "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
  },
});

export const error = style({
  margin: 0,
  color: vars.color.status.error,
  fontSize: vars.fontSize.sm,
});

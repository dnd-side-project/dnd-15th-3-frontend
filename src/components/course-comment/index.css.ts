import { style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  inputBackground: vars.color.surface.muted,
  inputBorder: vars.color.surface.muted,
  sendBackground: vars.color.brand.primary,
  placeholder: vars.color.text.secondary,
};

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  backgroundColor: vars.color.surface.default,
});

export const scrollContainer = style({
  height: 297,
  overflowY: "auto",
  paddingBlock: 10,
});

export const inputBar = style({
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: 20,
  backgroundColor: vars.color.surface.default,
  borderTop: `1px solid ${colors.inputBorder}`,
});

export const inputField = style({
  display: "flex",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
  gap: 19,
  height: 50,
  padding: "10px 10px 10px 20px",
  border: "none",
  borderRadius: 30,
  backgroundColor: colors.inputBackground,
});

export const input = style({
  flex: 1,
  minWidth: 0,
  padding: 0,
  border: "none",
  outline: "none",
  background: "transparent",
  ...text({ size: 16, weight: 500, lineHeight: 1.2 }),
  color: vars.color.text.secondary,
  "::placeholder": {
    color: colors.placeholder,
  },
});

export const sendButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 32,
  padding: 0,
  border: "none",
  borderRadius: 20,
  backgroundColor: colors.sendBackground,
  color: vars.color.text.inverse,
  cursor: "pointer",
  outline: "none",
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    // 키보드로 버튼에 직접 닿았을 때.
    "&:focus-visible": {
      outline: `2px solid ${colors.sendBackground}`,
      outlineOffset: 2,
    },
  },
});

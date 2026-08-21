import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../styles/text";

import { vars } from "../../styles/theme.css";

const colors = {
  bubbleIncoming: "#F1F8FF",
  bubbleIncomingText: "#707D91",
  bubbleMine: "#3793FF",
  bubbleMineText: "#FFFFFF",
  nickname: "#3D3D3D",
  timestamp: "#A4B1C5",
  inputBackground: "#ECEFF5",
  inputBorder: "#ECEFF5",
  sendBackground: "#3793FF",
  placeholder: "#707D91",
  crownBackground: "#FF46A9",
  crownForeground: "#FFECF6",
};

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  backgroundColor: "#FFFFFF",
});

export const scrollContainer = style({
  height: 297,
  overflowY: "auto",
  paddingBlock: 10,
});

export const row = recipe({
  base: {
    display: "flex",
    gap: 7,
    alignItems: "center",
    padding: "10px 20px",
  },
  variants: {
    variant: {
      incoming: {},
      mine: { justifyContent: "flex-end" },
    },
  },
  defaultVariants: {
    variant: "incoming",
  },
});

export const avatarWrapper = style({
  position: "relative",
  display: "inline-block",
  flexShrink: 0,
});

export const crown = style({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 15,
  height: 15,
  borderRadius: vars.radius.full,
  backgroundColor: colors.crownBackground,
  color: colors.crownForeground,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  maxWidth: 220,
});

export const meta = style({
  display: "flex",
  gap: 4,
  alignItems: "center",
});

export const nickname = style({
  ...text({ size: 14, weight: 600 }),
  color: colors.nickname,
});

export const timestamp = style({
  ...text({ size: 12, weight: 500 }),
  color: colors.timestamp,
});

export const bubble = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    ...text({ size: 14, weight: 500, lineHeight: 1.4 }),
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  },
  variants: {
    variant: {
      incoming: {
        backgroundColor: colors.bubbleIncoming,
        color: colors.bubbleIncomingText,
        borderRadius: "0 10px 10px 10px",
      },
      mine: {
        backgroundColor: colors.bubbleMine,
        color: colors.bubbleMineText,
        borderRadius: "10px 0 10px 10px",
      },
    },
  },
  defaultVariants: {
    variant: "incoming",
  },
});

export const inputBar = style({
  display: "flex",
  alignItems: "center",
  gap: 9,
  padding: 20,
  backgroundColor: "#FFFFFF",
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
  color: "#707D91",
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
  color: "#FFFFFF",
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

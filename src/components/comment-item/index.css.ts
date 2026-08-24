import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  bubbleIncoming: vars.color.brand.surface,
  bubbleIncomingText: vars.color.text.secondary,
  bubbleMine: vars.color.brand.primary,
  bubbleMineText: vars.color.surface.default,
  nickname: vars.color.text.heading,
  timestamp: vars.color.text.tertiary,
};

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

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "../../../../styles/text";

export const inputRow = style({
  padding: "0 20px",
});

export const buttonRow = style({
  padding: "10px 20px",
});

export const view2Body = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const courseHeader = style({
  flexShrink: 0,
  borderBottom: "1px solid #ECEFF5",
  padding: "0 20px 10px",
});

export const courseBadge = style({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "var(--course-tone-surface, #F1F8FF)",
  borderRadius: 4,
  padding: "3px 10px",
  color: "var(--course-tone, #3793FF)",
  ...text({ size: 14, weight: 500 }),
});

export const courseTitle = style({
  margin: 0,
  padding: "6px 0 10px",
  color: "#262626",
  ...text({ size: 20, weight: 600, lineHeight: 1.4 }),
});

export const statsRow = style({
  display: "flex",
  gap: 5,
});

export const statLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  color: "#7D7D7D",
  ...text({ size: 14, weight: 500 }),
});

export const statValue = style({
  fontFamily: "Montserrat, sans-serif",
  fontSize: 14,
  fontWeight: 600,
  color: "#454545",
});

export const timelineScroll = style({
  flex: 1,
  overflowY: "auto",
  paddingTop: 21,
  paddingBottom: 90,
});

export const footer = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    padding: "10px 0 20px",
    gap: 5,
    position: "relative",
  },
  variants: {
    shadow: {
      true: {
        boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.25)",
        zIndex: 1,
      },
      false: {},
    },
  },
  defaultVariants: { shadow: false },
});

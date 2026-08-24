import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden",
});

export const headerSlot = style({
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  zIndex: 2,
});

export const scrim = style({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
});

export const topScrim = style({
  position: "absolute",
  inset: 0,
  backgroundImage: `linear-gradient(180deg, ${vars.color.overlay.scrim20} 0%, ${palette.neutral16Alpha4} 36%)`,
});

export const toggle = style({
  position: "absolute",
  top: 20,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1,
});

export const chips = style({
  position: "absolute",
  top: 81,
  left: 0,
  right: 0,
  zIndex: 1,
  padding: "0 15px",
});

export const bottomStack = style({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 14,
  pointerEvents: "none",
  paddingBottom: "var(--bottom-offset, 0px)",
});

export const bottomActions = style({
  pointerEvents: "auto",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  gap: 7,
  alignItems: "flex-start",
  alignSelf: "flex-start",
  marginLeft: 20,
});

export const meetingPill = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  height: 35,
  padding: "0 7px",
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.slate.text,
  boxShadow: `0 0 6px ${vars.color.overlay.scrim25}`,
  color: vars.color.text.inverse,
  ...text({ size: 14, weight: 600, lineHeight: "22px" }),
  cursor: "pointer",
});

export const pillIcon = style({
  flexShrink: 0,
  width: 23,
  height: 23,
});

export const sheet = recipe({
  base: {
    pointerEvents: "auto",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    borderRadius: "24px 24px 0 0",
    backgroundColor: vars.color.surface.default,
    boxShadow: `0 4px 70px ${vars.color.overlay.scrim20}`,
  },
  variants: {
    dragging: {
      // 끄는 동안에는 손가락을 그대로 따라와야 한다.
      true: {},
      false: { transition: "height 250ms ease-out, border-radius 250ms ease-out" },
    },
  },
});

export const grabber = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    touchAction: "none",
    selectors: {
      "&::after": {
        content: "",
        width: 50,
        height: 5,
        borderRadius: 10,
        backgroundColor: palette.neutral7,
        transition: "opacity 150ms ease-out",
      },
    },
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        selectors: { "&::after": { transition: "none" } },
      },
    },
  },
  variants: {
    // 끝까지 펼치면 손잡이를 숨기되, 만지면 다시 보여 준다.
    hidden: {
      true: {
        selectors: {
          "&::after": { opacity: 0 },
          "&:hover::after, &:active::after": { opacity: 1 },
        },
      },
      false: {},
    },
  },
});

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const search = style({
  padding: "11px 20px 0",
});

export const results = style({
  display: "flex",
  flexDirection: "column",
  maxHeight: 320,
  marginTop: 16,
  overflowY: "auto",
});

export const result = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
  width: "100%",
  padding: "17px 20px",
  borderTop: `1px solid ${vars.color.surface.mutedStrong}`,
});

export const resultOpen = style({
  display: "flex",
  flex: 1,
  alignItems: "center",
  gap: 14,
  minWidth: 0,
  padding: 0,
  border: "none",
  background: "none",
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 96,
  height: 71,
  borderRadius: 5,
  backgroundColor: vars.color.surface.muted,
  objectFit: "cover",
});

export const resultTexts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

export const resultName = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  color: vars.color.text.primary,
  ...text({ size: 18, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const resultAddress = style({
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const addButton = recipe({
  base: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    border: "none",
    borderRadius: vars.radius.full,
    cursor: "pointer",
  },
  variants: {
    saved: {
      true: {
        backgroundColor: vars.color.brand.primary,
        color: vars.color.text.inverse,
        cursor: "default",
      },
      false: { backgroundColor: vars.color.surface.muted, color: vars.color.text.tertiary },
    },
  },
});

export const notice = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "41px 62px 45px",
  textAlign: "center",
});

export const noticeIcon = style({
  marginBottom: 18,
  color: palette.neutral6,
});

export const noticeTitle = style({
  alignSelf: "stretch",
  margin: 0,
  color: vars.color.text.strong,
  ...text({ size: 20, weight: 600, lineHeight: "30px" }),
});

export const noticeDescription = style({
  alignSelf: "stretch",
  margin: "1px 0 0",
  color: vars.color.text.description,
  ...text({ size: 14, weight: 500, lineHeight: "21px" }),
});

export const sheetBottom = style({
  height: "calc(35px + env(safe-area-inset-bottom))",
});

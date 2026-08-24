import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const courseColor = createVar();
const courseSurfaceColor = createVar();

export const list = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    margin: 0,
    padding: "0 25px 0 30px",
    listStyle: "none",
  },
  variants: {
    tone: {
      blue: {
        vars: {
          [courseColor]: vars.color.course.blue.main,
          [courseSurfaceColor]: vars.color.course.blue.surface,
        },
      },
      pink: {
        vars: {
          [courseColor]: vars.color.course.pink.main,
          [courseSurfaceColor]: vars.color.course.pink.surface,
        },
      },
      purple: {
        vars: {
          [courseColor]: vars.color.course.purple.main,
          [courseSurfaceColor]: vars.color.course.purple.surface,
        },
      },
    },
  },
  defaultVariants: {
    tone: "blue",
  },
});

export const item = style({
  position: "relative",
  display: "flex",
  gap: 20,
  selectors: {
    "&:not(:last-child)::before": {
      content: "",
      position: "absolute",
      top: 20,
      bottom: -12,
      left: 10,
      width: 1,
      backgroundColor: courseColor,
    },
  },
});

export const badge = style({
  zIndex: 1,
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 20,
  height: 20,
  borderRadius: vars.radius.full,
  backgroundColor: courseColor,
  color: vars.color.text.inverse,
  ...text({ size: 12, weight: 600, lineHeight: 1 }),
});

export const body = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 6,
  minWidth: 0,
});

export const place = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 90,
  padding: "0 11px",
  border: "none",
  borderRadius: 10,
  backgroundColor: vars.color.surface.app,
  color: vars.color.text.tertiary,
  textAlign: "left",
  cursor: "pointer",
});

export const thumbnail = style({
  flexShrink: 0,
  width: 70,
  height: 70,
  borderRadius: 8,
  backgroundColor: vars.color.surface.muted,
  objectFit: "cover",
});

export const texts = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: 4,
  minWidth: 0,
});

export const name = style({
  display: "flex",
  alignItems: "center",
  gap: 6,
  color: vars.color.text.primary,
  ...text({ size: 16, weight: 600, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const address = style({
  color: vars.color.text.secondaryAlt,
  ...text({ size: 13, weight: 500, lineHeight: 1.4 }),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const walk = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 30,
  padding: "0 12px",
  borderRadius: 8,
  backgroundColor: courseSurfaceColor,
  color: courseColor,
  ...text({ size: 13, weight: 500, lineHeight: 1.2 }),
});

export const walkTime = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
});

export const routeLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  color: courseColor,
  textDecoration: "none",
});

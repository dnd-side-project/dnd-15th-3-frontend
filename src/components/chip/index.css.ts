import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

const colors = {
  unselectedBackground: vars.color.surface.muted,
  unselectedText: vars.color.text.secondary,
  unselectedIcon: vars.color.text.tertiary,
  selectedBackground: vars.color.brand.subtle,
  selectedText: vars.color.brand.primary,
  solidBackground: palette.white1,
  solidBorder: palette.neutral6,
  solidText: vars.color.text.secondary,
  solidIcon: vars.color.brand.primary,
  overlayBackground: palette.white9Alpha30,
  overlayBorder: palette.neutral11Alpha22,
  overlayText: vars.color.text.secondary,
  overlayIcon: vars.color.brand.primary,
};

const iconColor = createVar();

export const chipIconHost = style({});
globalStyle(`${chipIconHost} > svg`, {
  color: iconColor,
  transition: "color 0.15s ease",
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const chipContainer = recipe({
  base: {
    appearance: "none",
    border: "none",
    background: "none",
    display: "inline-flex",
    alignItems: "center",
    borderRadius: vars.radius.full,
    width: "fit-content",
    flexShrink: 0,
    ...text({ size: 16, weight: 500, lineHeight: "22px" }),
    transition: "background-color 0.15s ease, color 0.15s ease",
    "@media": {
      "(prefers-reduced-motion: reduce)": { transition: "none" },
    },
  },
  variants: {
    standalone: {
      true: {
        gap: 5,
        padding: "0 11px",
        cursor: "pointer",
      },
      false: {},
    },
    variant: {
      filled: { minHeight: 38 },
      solid: {
        minHeight: 33,
        backgroundColor: colors.solidBackground,
        color: colors.solidText,
        boxShadow: `inset 0 0 0 1px ${colors.solidBorder}`,
        vars: { [iconColor]: colors.solidIcon },
      },
      overlay: {
        minHeight: 33,
        backgroundColor: colors.overlayBackground,
        backdropFilter: "blur(4px)",
        color: colors.overlayText,
        boxShadow: `inset 0 0 0 1px ${colors.overlayBorder}`,
        vars: { [iconColor]: colors.overlayIcon },
      },
    },
    selected: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { selected: false, variant: "filled" },
      style: {
        backgroundColor: colors.unselectedBackground,
        color: colors.unselectedText,
        vars: { [iconColor]: colors.unselectedIcon },
      },
    },
    {
      variants: { selected: true, variant: "filled" },
      style: {
        backgroundColor: colors.selectedBackground,
        color: colors.selectedText,
        vars: { [iconColor]: colors.selectedText },
      },
    },
  ],
  defaultVariants: {
    standalone: false,
    variant: "filled",
    selected: false,
  },
});

export const chipLabel = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  alignSelf: "stretch",
  gap: 5,
  padding: "0 0 0 11px",
  font: "inherit",
  color: "inherit",
  cursor: "pointer",
  whiteSpace: "nowrap",
});

export const chipRemoveButton = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "stretch",
  padding: "0 11px 0 5px",
  color: "inherit",
  cursor: "pointer",
});

export const chipGroup = recipe({
  base: {
    display: "flex",
    gap: 7,
  },
  variants: {
    scroll: {
      true: {
        flexWrap: "nowrap",
        // 여백을 스크롤 안쪽에 둬야 칩이 화면 끝까지 지나간다.
        padding: "0 20px",
        overflowX: "auto",
        scrollbarWidth: "none",
        selectors: {
          "&::-webkit-scrollbar": { display: "none" },
        },
      },
      false: { flexWrap: "wrap" },
    },
    connected: {
      true: { gap: 6 },
      false: {},
    },
  },
  defaultVariants: {
    scroll: false,
    connected: false,
  },
});

export const chipConnector = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
});

export const chipConnectorArrow = style({
  flexShrink: 0,
  color: colors.overlayIcon,
});

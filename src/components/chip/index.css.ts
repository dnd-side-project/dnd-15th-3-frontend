import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../styles/theme.css";

const colors = {
  unselectedBackground: "#ECEFF5",
  unselectedText: "#707D91",
  unselectedIcon: "#A4B1C5",
  selectedBackground: "#DBECFF",
  selectedText: "#3793FF",
  overlayBackground: "rgba(255, 255, 255, 0.3)",
  overlayBorder: "rgba(169, 169, 169, 0.22)",
  overlayText: "#707D91",
  overlayIcon: "#3793FF",
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
    boxSizing: "border-box",
    width: "fit-content",
    flexShrink: 0,
    fontFamily: vars.font.body,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: "22px",
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

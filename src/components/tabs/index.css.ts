import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
});

export const list = style({
  display: "flex",
  gap: 4,
  padding: 4,
  borderRadius: 9999,
  backgroundColor: "#E4E7ED",
});

export const tab = recipe({
  base: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 12px",
    border: "none",
    borderRadius: 9999,
    backgroundColor: "transparent",
    color: "#8B8D94",
    fontSize: "0.875rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#2E2E2E",
        color: "#FFFFFF",
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});

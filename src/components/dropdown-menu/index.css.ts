import { recipe } from "@vanilla-extract/recipes";

export const dropdown = recipe({
  base: {
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
    borderRadius: 5,
    marginBlock: 5,
  },
  variants: {
    size: {
      sm: {},
      md: {},
    },
  },
});

export const item = recipe({
  base: {
    selectors: {
      [`${dropdown.classNames.variants.size.sm} &`]: {
        minWidth: 65,
      },
      [`${dropdown.classNames.variants.size.md} &`]: {
        minWidth: 79,
      },
    },
    ":first-child": {
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
      boxShadow: "inset 0px -0.5px #E6E6E6",
    },
    ":last-child": {
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
    },
    lineHeight: "28.7px",
    letterSpacing: -0.4,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  variants: {
    selected: {
      true: {
        color: "#262626",
      },
      false: {
        color: "#B0B0B0",
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

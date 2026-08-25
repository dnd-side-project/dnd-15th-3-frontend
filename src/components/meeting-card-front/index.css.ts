import { recipe } from "@vanilla-extract/recipes";

import { text } from "@/styles/text";

export const card = recipe({
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#FDFDFD",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
  },
  variants: {
    size: {
      small: {
        width: 177,
        height: 247,
      },
      medium: {
        width: 210,
        height: 292,
      },
      large: {
        width: 260,
        height: 363,
      },
    },
  },
});

export const photoArea = recipe({
  base: {
    position: "relative",
    alignSelf: "center",
    borderRadius: 5,
    overflow: "hidden",
    background:
      "linear-gradient(24deg, rgba(102, 173, 255, 0.5) 33%, rgba(172, 189, 255, 0.5) 66%)",
  },
  variants: {
    size: {
      small: {
        width: 156,
        height: 134,
        margin: "10px 0 0",
      },
      medium: {
        width: 185,
        height: 159,
        margin: "12px 0 0",
        borderRadius: 6,
      },
      large: {
        width: 229,
        height: 197,
        margin: "15px 0 0",
        borderRadius: 7,
      },
    },
  },
});

export const confetti = recipe({
  base: {
    position: "absolute",
  },
  variants: {
    size: {
      small: {
        top: 30,
        left: -22,
        width: 200,
        height: 117,
      },
      medium: {
        top: 36,
        left: -26,
        width: 237,
        height: 139,
      },
      large: {
        top: 44,
        left: -32,
        width: 294,
        height: 172,
      },
    },
  },
});

export const momoImage = recipe({
  base: {
    position: "absolute",
    left: "50%",
    width: "125%",
    height: "135%",
    transform: "translateX(-50%)",
    objectFit: "contain",
    objectPosition: "center bottom",
  },
  variants: {
    size: {
      small: {
        bottom: -65,
      },
      medium: {
        bottom: -77,
      },
      large: {
        bottom: -96,
      },
    },
  },
});

export const dateStamp = recipe({
  base: {
    position: "absolute",
    color: "#3D3D3D",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 400,
    lineHeight: 1,
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      small: {
        top: 6,
        left: 6,
        fontSize: 6,
      },
      medium: {
        top: 7,
        left: 7,
        fontSize: 7,
      },
      large: {
        top: 9,
        left: 9,
        fontSize: 9,
      },
    },
  },
});

export const heartDrawing = recipe({
  base: {
    position: "absolute",
    left: 0,
    zIndex: 2,
  },
  variants: {
    size: {
      small: {
        top: 100,
        width: 24,
        height: 19,
      },
      medium: {
        top: 119,
        width: 28,
        height: 23,
      },
      large: {
        top: 147,
        width: 35,
        height: 28,
      },
    },
  },
});

export const body = recipe({
  base: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  variants: {
    size: {
      small: {
        padding: "8px 12px 0",
      },
      medium: {
        padding: "9px 14px 0",
      },
      large: {
        padding: "12px 18px 0",
      },
    },
  },
});

export const title = recipe({
  base: {
    margin: 0,
    color: "#3D3D3D",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      small: {
        ...text({ size: 12, weight: 600, lineHeight: 1.2 }),
      },
      medium: {
        ...text({ size: 14, weight: 600, lineHeight: 1.2 }),
      },
      large: {
        ...text({ size: 18, weight: 600, lineHeight: 1.2 }),
      },
    },
  },
});

export const routeLabel = recipe({
  base: {
    color: "#3D3D3D",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 400,
    lineHeight: 1,
  },
  variants: {
    size: {
      small: {
        marginTop: 6,
        fontSize: 6,
      },
      medium: {
        marginTop: 7,
        fontSize: 7,
      },
      large: {
        marginTop: 9,
        fontSize: 9,
      },
    },
  },
});

export const route = recipe({
  base: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  variants: {
    size: {
      small: {
        gap: 4,
        marginTop: 4,
      },
      medium: {
        gap: 5,
        marginTop: 5,
      },
      large: {
        gap: 6,
        marginTop: 6,
      },
    },
  },
});

export const routeItem = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      small: {
        gap: 4,
      },
      medium: {
        gap: 5,
      },
      large: {
        gap: 6,
      },
    },
  },
});

export const placeName = recipe({
  base: {
    color: "#3D3D3D",
  },
  variants: {
    size: {
      small: {
        ...text({ size: 8, weight: 500, lineHeight: 1.4 }),
      },
      medium: {
        ...text({ size: 9, weight: 500, lineHeight: 1.4 }),
      },
      large: {
        ...text({ size: 12, weight: 500, lineHeight: 1.4 }),
      },
    },
  },
});

export const arrow = recipe({
  base: {
    flexShrink: 0,
    color: "#A4B1C5",
  },
  variants: {
    size: {
      small: {
        width: 7,
        height: 5,
      },
      medium: {
        width: 8,
        height: 6,
      },
      large: {
        width: 10,
        height: 7,
      },
    },
  },
});

export const footer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
  },
  variants: {
    size: {
      small: {
        padding: "0 0 6px",
      },
      medium: {
        padding: "0 0 7px",
      },
      large: {
        padding: "0 0 9px",
      },
    },
  },
});

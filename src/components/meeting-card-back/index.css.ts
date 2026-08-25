import { recipe } from "@vanilla-extract/recipes";

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
      large: {
        width: 260,
        height: 363,
      },
    },
  },
});

export const mapArea = recipe({
  base: {
    position: "relative",
    alignSelf: "center",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#E9EEF5",
  },
  variants: {
    size: {
      small: {
        width: 156,
        height: 210,
        margin: "10px 0 0",
      },
      large: {
        width: 229,
        height: 309,
        margin: "15px 0 0",
        borderRadius: 7,
      },
    },
  },
});

// RouteMarker 가 72×81 로 고정되어 있어 맵 영역엔 너무 크다.
// MeetingMap 을 2× 로 그린 뒤 scale(0.5) 로 줄여 마커를 ~36px 로 보이게 한다.
// QR 은 이 레이어 밖에 둬 선명도를 유지한다.
export const mapStage = recipe({
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    transformOrigin: "top left",
  },
  variants: {
    size: {
      small: {
        width: 312,
        height: 420,
        transform: "scale(0.5)",
      },
      large: {
        width: 458,
        height: 618,
        transform: "scale(0.5)",
      },
    },
  },
});

export const qrCode = recipe({
  base: {
    position: "absolute",
    bottom: 4,
    left: 4,
    display: "block",
  },
  variants: {
    size: {
      small: {
        width: 32,
        height: 32,
      },
      large: {
        bottom: 6,
        left: 6,
        width: 47,
        height: 47,
      },
    },
  },
});

export const footer = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
  },
  variants: {
    size: {
      small: {
        padding: "0 0 6px",
      },
      large: {
        padding: "0 0 9px",
      },
    },
  },
});

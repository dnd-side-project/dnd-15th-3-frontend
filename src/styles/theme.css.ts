import { createGlobalTheme } from "@vanilla-extract/css";

import { palette } from "./palette";

// 전역 디자인 토큰
export const vars = createGlobalTheme(":root", {
  color: {
    brand: {
      primary: palette.blue23,
      strong: palette.blue16,
      subtle: palette.blue5,
      surface: palette.blue1,
      surfaceAlt: palette.blue2,
      badge: palette.blue19,
      // 텍스트 입력창 전송 버튼 포커스 전용 색.
      focusSurface: palette.blue10,
    },
    surface: {
      default: palette.white1,
      app: palette.gray1,
      muted: palette.blue3,
      mutedStrong: palette.blue7,
      pressed: palette.gray3,
    },
    text: {
      primary: palette.neutral24,
      heading: palette.neutral23,
      secondary: palette.gray9,
      secondaryAlt: palette.neutral14,
      description: palette.neutral15,
      tertiary: palette.gray8,
      placeholder: palette.neutral13,
      disabled: palette.neutral10,
      inverse: palette.white1,
      strong: palette.black4,
    },
    icon: {
      default: palette.neutral18,
      strong: palette.neutral17,
    },
    course: {
      blue: { main: palette.blue23, surface: palette.blue1 },
      pink: { main: palette.purple2, surface: palette.purple1 },
      purple: { main: palette.indigo2, surface: palette.indigo1 },
    },
    category: {
      restaurant: palette.red3,
      cafe: palette.orange1,
      bar: palette.indigo2,
      walk: palette.teal1,
      shopping: palette.purple2,
      culture: palette.green1,
      activity: palette.blue23,
      other: palette.neutral17,
    },
    status: {
      like: palette.blue16,
      dislike: palette.purple2,
      error: palette.red2,
    },
    slate: {
      text: palette.gray10,
    },
    external: {
      kakaoYellow: palette.yellow1,
      kakaoText: palette.yellow2,
    },
    overlay: {
      scrim10: palette.black1Alpha10,
      scrim20: palette.black5Alpha20,
      scrim25: palette.black2Alpha25,
    },
  },
  font: {
    body: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  fontSize: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "2rem",
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    bold: "700",
  },
  radius: {
    sm: "4px",
    md: "8px",
    full: "9999px",
  },
  space: {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
});

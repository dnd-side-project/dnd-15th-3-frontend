import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { palette } from "@/styles/palette";
import { text } from "@/styles/text";

import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  background: vars.color.surface.default,
});

export const header = style({
  position: "relative",
  height: 288,
  overflow: "hidden",
  // Figma 는 상태바 48px 를 포함한 336px 이다. 그라디언트 축이 프레임 위쪽에서 시작해 첫 스톱이 음수다.
  background: `linear-gradient(167deg, ${palette.blue26} -16%, ${palette.blue15} 65%)`,
});

export const confetti = style({
  position: "absolute",
  top: -140,
  left: 7,
  width: 387,
  height: 226,
  vars: {
    "--confetti-a": palette.blue31,
    "--confetti-b": palette.yellow4,
    "--confetti-c": palette.blue32,
    "--confetti-d": palette.purple4,
  },
});

export const nav = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 64,
  padding: "16px 16px 0",
});

export const backButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  padding: 0,
  border: "none",
  background: "none",
  color: vars.color.text.inverse,
  cursor: "pointer",
});

export const typeRow = style({
  position: "absolute",
  top: 93,
  left: 25,
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export const typeBadge = style({
  display: "flex",
  alignItems: "center",
  gap: 3,
  height: 24,
  padding: "0 5px",
  border: "none",
  borderRadius: 6,
  background: `radial-gradient(circle at 90% 100%, ${palette.blue22} 0%, ${palette.blue13Alpha26} 100%)`,
  color: vars.color.text.inverse,
  ...text({ size: 14, weight: 500 }),
  letterSpacing: -0.36,
  lineHeight: 1.2,
  cursor: "pointer",
});

export const typeSuffix = style({
  color: vars.color.text.inverse,
  ...text({ size: 16, weight: 600 }),
  letterSpacing: -0.33,
  lineHeight: "22px",
});

export const titleRow = style({
  position: "absolute",
  top: 131,
  right: 20,
  left: 23,
  display: "flex",
  alignItems: "flex-end",
  gap: 7,
});

export const title = style({
  margin: 0,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: vars.color.text.inverse,
  ...text({ size: 26, weight: 600, lineHeight: 1.2 }),
  textShadow: `0 0 4px ${vars.color.overlay.scrim25}`,
});

export const editButton = style({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 29,
  height: 30,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: palette.white3Alpha14,
  color: vars.color.text.inverse,
  cursor: "pointer",
});

export const infoCard = style({
  position: "absolute",
  top: 179,
  right: 22,
  left: 23,
  display: "flex",
  height: 81,
  borderRadius: 10,
  background: `radial-gradient(120% 200% at 50% 120%, ${palette.blue11} 0%, ${palette.blue17} 50%, ${palette.blue21} 100%)`,
});

export const infoCell = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  gap: 6,
  padding: "18px 0 11px",
  border: "none",
  background: "none",
  color: vars.color.text.inverse,
  cursor: "pointer",
  selectors: {
    "&:not(:first-child)": {
      borderLeft: `1px solid ${palette.white4Alpha50}`,
    },
  },
});

export const infoValue = style({
  display: "flex",
  alignItems: "center",
  gap: 2,
  height: 22,
  ...text({ size: 14, weight: 600 }),
  letterSpacing: -0.33,
  lineHeight: "22px",
  textShadow: `0 0 4px ${vars.color.overlay.scrim25}`,
  whiteSpace: "nowrap",
});

export const sectionTitle = style({
  margin: "0 0 0 29px",
  color: vars.color.text.heading,
  ...text({ size: 18, weight: 600, lineHeight: 1.65 }),
});

export const participants = style({
  display: "flex",
  gap: 11,
  marginTop: 18,
  padding: "0 28px",
  overflowX: "auto",
});

export const participant = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  alignItems: "center",
  width: 60,
});

export const participantAvatar = style({
  position: "relative",
});

export const crown = style({
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.course.pink.main,
  color: vars.color.course.pink.surface,
});

export const participantName = style({
  width: "100%",
  color: vars.color.text.secondary,
  ...text({ size: 14, weight: 600, lineHeight: 1.6 }),
  overflow: "hidden",
  textAlign: "center",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const participantsSection = style({
  marginTop: 18,
});

export const courseSection = style({
  marginTop: 17,
});

export const courseCards = style({
  position: "relative",
  display: "flex",
  gap: 8,
  marginTop: 15,
  padding: "0 20px",
});

// 지도 카드가 링크라 그 위에 겹쳐 둔다.
export const courseEditButton = style({
  position: "absolute",
  top: 134,
  right: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand.badge,
  boxShadow: `0 0 4px ${vars.color.overlay.scrim25}`,
  color: vars.color.text.inverse,
  cursor: "pointer",
});

export const card = recipe({
  base: {
    position: "relative",
    display: "block",
    overflow: "hidden",
    height: 206,
    padding: 0,
    border: "none",
    boxShadow: `0 0 4px ${vars.color.overlay.scrim10}`,
    cursor: "pointer",
    textAlign: "left",
    textDecoration: "none",
  },
  variants: {
    card: {
      course: {
        flex: "0 0 113px",
        borderRadius: 16,
        background: `linear-gradient(166deg, ${palette.blue18} 0%, ${palette.blue12} 33%, ${palette.blue9} 98%)`,
      },
      map: { flex: 1, borderRadius: 10 },
    },
  },
});

export const courseLines = style({
  position: "absolute",
  top: -72,
  left: -25,
  width: 142,
  height: 227,
});

export const courseNavigation = style({
  position: "absolute",
  top: 45,
  left: 28,
  width: 80,
  height: 80,
});

export const mapScrim = style({
  position: "absolute",
  // 지도 타일이 자체 z-index 를 쓰므로 그 위로 올린다.
  zIndex: 1,
  inset: 0,
  background: `linear-gradient(0deg, ${palette.neutral20Alpha82} 0%, ${palette.gray7Alpha0} 100%)`,
});

export const cardArrow = recipe({
  base: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.overlay.scrim10,
    color: vars.color.text.inverse,
  },
  variants: {
    card: {
      course: { right: 8 },
      map: { right: 10 },
    },
  },
});

export const cardTexts = recipe({
  base: {
    position: "absolute",
    zIndex: 1,
    top: 155,
    right: 8,
    display: "flex",
    flexDirection: "column",
  },
  variants: {
    card: {
      course: { left: 15 },
      map: { left: 23 },
    },
  },
});

export const cardTitle = style({
  margin: 0,
  color: vars.color.text.inverse,
  ...text({ size: 16, weight: 600, lineHeight: 1.23 }),
  textShadow: `0 0 4px ${vars.color.overlay.scrim25}`,
  whiteSpace: "nowrap",
});

export const cardDescription = style({
  margin: 0,
  color: vars.color.brand.surface,
  ...text({ size: 13, weight: 500, lineHeight: 1.65 }),
  whiteSpace: "nowrap",
});

export const footer = style({
  display: "flex",
  gap: 12,
  marginTop: "auto",
  padding: "10px 20px calc(19px + env(safe-area-inset-bottom))",
});

export const status = style({
  padding: "40px 20px",
  color: vars.color.text.secondary,
  ...text({ size: 16, weight: 500, lineHeight: 1.5 }),
  textAlign: "center",
});

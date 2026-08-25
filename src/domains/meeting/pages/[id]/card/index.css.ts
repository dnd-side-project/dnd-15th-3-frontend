import { keyframes, style } from "@vanilla-extract/css";

import { text } from "@/styles/text";

const colors = {
  pill: "rgba(102, 173, 255, 0.18)",
  pillText: "#FFFFFF",
};

// mail이 처음 위치에서 아래로 내려가며 밝은 색 쉐도우가 나타났다가
// 다시 올라오면서 쉐도우가 사라지는 무한 루프.
const mailFloat = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(28px)" },
  "100%": { transform: "translateY(0)" },
});

// drop-shadow 는 box 가 아니라 svg path 모양 자체를 따라 그림자를 만든다.
const mailGlow = keyframes({
  "0%": { filter: "drop-shadow(0 0 0 rgba(255, 255, 255, 0))" },
  "50%": { filter: "drop-shadow(0 12px 28px rgba(255, 255, 255, 0.75))" },
  "100%": { filter: "drop-shadow(0 0 0 rgba(255, 255, 255, 0))" },
});

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden",
  background: "linear-gradient(180deg, #B8D3FF 0%, #E7F4FF 100%)",
});

export const clouds = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
});

export const cloud1 = style({
  position: "absolute",
  display: "block",
  top: 311,
  left: -130,
  width: "76.34%",
  aspectRatio: "300 / 120",
  opacity: 0.9,
});

export const cloud2 = style({
  position: "absolute",
  display: "block",
  top: 0,
  right: -138,
  width: "76.34%",
  aspectRatio: "300 / 120",
  opacity: 0.8,
});

// stage는 postboxStage(아래, idle)와 envelopeStage(위, 카메라 상승 후) 두 장면을
// 겹쳐 놓는 컨테이너. overflow hidden으로 벗어난 장면을 잘라낸다.
export const stage = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden",
});

// postbox + mail 버튼 장면. idle에서 보이다가 클릭하면 아래로 빠진다.
export const postboxStage = style({
  position: "absolute",
  inset: 0,
});

export const postbox = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "auto",
  display: "block",
});

// postbox.svg 입구(y=160~196) 위에 편지가 끄워진 모습. 우체통 하단 기준으로
// 입구 중심까지 거리를 둬 메일이 입구 위에 떠 있는다.
export const mailWrapper = style({
  position: "absolute",
  bottom: 220,
  left: "50%",
  transform: "translateX(-50%)",
  width: "89.31%",
  zIndex: 2,
});

export const mailButton = style({
  display: "block",
  width: "100%",
  padding: 0,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  animation: `${mailFloat} 2.4s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const mailImage = style({
  display: "block",
  width: "100%",
  aspectRatio: "351 / 72",
  animation: `${mailGlow} 2.4s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

// pill은 메일 위에 떠 있는 유도 텍스트(비클릭). 클릭은 메일을 통해야 한다.
export const pill = style({
  position: "absolute",
  bottom: 568,
  left: "50%",
  transform: "translateX(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: "8px 15px",
  borderRadius: 20,
  background: colors.pill,
  color: colors.pillText,
  ...text({ size: 16, weight: 600, lineHeight: 1.375 }),
  whiteSpace: "nowrap",
  zIndex: 3,
  pointerEvents: "none",
});

// 편지 봉투 + 최종 카드 장면. idle에서는 stage 위쪽(-100%)에 숨어 있다가
// 카메라 상승(y→0)하면 뷰포트로 내려온다.
export const envelopeStage = style({
  position: "absolute",
  inset: 0,
});

// envelopeStage 안에서 MailEnvelope와 large 카드를 같은 중심에 겹쳐 놓는다.
// transform은 motion이 건드리지 않는 한 유지되므로, motion.div에는 opacity만
// 애니메이션한다(transform 충돌 방지).
export const envelopeCentered = style({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
});

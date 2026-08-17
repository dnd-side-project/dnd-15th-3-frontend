import { keyframes, style } from "@vanilla-extract/css";

const DURATION = "2.8s";
const EASING = "cubic-bezier(0.2, 0.6, 0.4, 1)";
const FALL_DISTANCE = "110vh";
const ROTATE_DEG = 720;
const START_OFFSET_PX = -20;
const Z_INDEX = 50;

const fall = keyframes({
  "0%": {
    transform: "translate3d(0, 0, 0) rotate(0deg)",
    opacity: "1",
  },
  "100%": {
    transform: `translate3d(var(--dx), ${FALL_DISTANCE}, 0) rotate(${ROTATE_DEG}deg)`,
    opacity: "0",
  },
});

export const confettiLayer = style({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: Z_INDEX,
});

export const confettiPiece = style({
  position: "absolute",
  top: START_OFFSET_PX,
  borderRadius: 1,
  animation: `${fall} ${DURATION} ${EASING} forwards`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      display: "none",
    },
  },
});

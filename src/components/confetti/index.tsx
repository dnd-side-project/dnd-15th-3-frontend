import { useState } from "react";

import { palette } from "@/styles/palette";

import { confettiLayer, confettiPiece } from "./index.css";

const CONFETTI_COLORS = [palette.blue29, palette.yellow3, palette.blue30, palette.purple3] as const;

const CONFETTI_COUNT = 60;
const MIN_DELAY_S = 0.4;
const DELAY_PER_PIECE_S = 0.013;
const CONFETTI_DELAY_MAX_S = Math.max(MIN_DELAY_S, CONFETTI_COUNT * DELAY_PER_PIECE_S);

const MIN_WIDTH_PX = 3;
const WIDTH_RANGE = 9;
const MIN_HEIGHT_PX = 7;
const HEIGHT_RANGE = 15;
const MAX_DRIFT_PX = 120;
const VIEWPORT_FULL = 100;

function createConfetti() {
  return Array.from({ length: CONFETTI_COUNT }, () => ({
    w: MIN_WIDTH_PX + Math.floor(Math.random() * WIDTH_RANGE),
    h: MIN_HEIGHT_PX + Math.floor(Math.random() * HEIGHT_RANGE),
    bg: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    left: `${Math.random() * VIEWPORT_FULL}%`,
    dx: `${(Math.random() * 2 - 1) * MAX_DRIFT_PX}px`,
    delay: `${Math.random() * CONFETTI_DELAY_MAX_S}s`,
  }));
}

export function Confetti() {
  const [show, setShow] = useState(true);
  const pieces = useState(createConfetti)[0];

  if (!show) {
    return null;
  }

  return (
    <div className={confettiLayer}>
      {pieces.map((piece, i) => (
        <span
          key={i}
          className={confettiPiece}
          onAnimationEnd={i === pieces.length - 1 ? () => setShow(false) : undefined}
          style={{
            width: piece.w,
            height: piece.h,
            left: piece.left,
            backgroundColor: piece.bg,
            ["--dx" as string]: piece.dx,
            animationDelay: piece.delay,
          }}
        />
      ))}
    </div>
  );
}

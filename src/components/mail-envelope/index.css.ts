import { style } from "@vanilla-extract/css";

// base(mail-cover-base.svg, 292×304)를 기준 컨테이너로 잡는다.
// cover/mail-cover.svg(300×308), top 뚜껑(334×173 / 301×140)은 base보다 넓으므로
// 좌우로 자연스럽게 튀어나온다. overflow는 visible(기본)으로 둔다.
export const envelope = style({
  position: "relative",
  width: 292,
  height: 304,
});

// 공통: 가로 중앙 정렬. transform은 motion이 관리하므로 vanilla-extract에는 두지 않는
// 레이어(정적 img)에만 translateX(-50%)를 부여한다.
export const baseLayer = style({
  position: "absolute",
  left: "50%",
  top: 0,
  transform: "translateX(-50%)",
  zIndex: 1,
});

// 카드(210×292)는 base(292×304) 안에서 거의 꽉 차게. 상하 6px 여백.
// motion.div가 y를 애니메이션하므로 transform은 motion이 담당(transform 충돌 방지).
// left: 50%만 두고, motion의 x: "-50%"로 가로 정렬한다.
export const cardLayer = style({
  position: "absolute",
  left: "50%",
  top: 10,
  zIndex: 1,
});

export const coverLayer = style({
  position: "absolute",
  left: "50%",
  top: 0,
  transform: "translateX(-50%)",
  zIndex: 4,
});

// 뚜껑 close용. close SVG(334×173) 기준 정렬.
// perspective로 3D 공간 생성, 뚜껑이 상단 힌지 기준으로 열림.
export const flapCloseLayer = style({
  position: "absolute",
  left: "50%",
  top: -15,
  transform: "translateX(-50%)",
  zIndex: 4,
  perspective: 800,
});

// 뚜껑 open용. open SVG(301×140) 기준 정렬.
// perspective로 3D 공간 생성, 뚜껑이 하단 힌지 기준으로 열림.
export const flapOpenLayer = style({
  position: "absolute",
  left: "50%",
  top: -135,
  transform: "translateX(-50%)",
  zIndex: 0,
  perspective: 800,
});

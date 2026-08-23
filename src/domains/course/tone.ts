import type { RouteMarkerTone } from "../../components/route-marker";

/** 코스 후보 순서대로 쓰는 색. A·B·C 를 색으로 구분한다. */
const COURSE_TONES: RouteMarkerTone[] = ["blue", "pink", "purple"];

/** 서버가 색을 주지 않아 후보 순서(1부터)로 정한다. */
export function courseTone(order: number): RouteMarkerTone {
  return COURSE_TONES[(Math.max(1, Math.round(order)) - 1) % COURSE_TONES.length] ?? "blue";
}

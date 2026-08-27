export interface RenderCardImageOptions {
  pixelRatio?: number;
  backgroundColor?: string;
  cacheBust?: boolean;
  style?: Record<string, string>;
  stabilizationAttempts?: number;
}

/**
 * DOM 노드를 PNG Blob 으로 렌더링한다.
 * `html-to-image` 는 런타임에 동적 import 해 초기 번들에 포함되지 않는다.
 *
 * WebKit(Safari)에서는 큰 이미지가 디코딩 완료 전 canvas에 그려져 빈 이미지로
 * 렌더되는 버그가 있다(html-to-image #461, #488, #591). 이를 우회하기 위해
 * toPng를 반복 호출하여 연속 결과가 동일할 때까지 재시도한다.
 */
export async function renderCardImage(
  node: HTMLElement,
  options: RenderCardImageOptions = {},
): Promise<Blob> {
  const {
    pixelRatio = 2,
    backgroundColor = "#ffffff",
    cacheBust = true,
    style,
    stabilizationAttempts = 3,
  } = options;

  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const { toPng } = await import("html-to-image");
  const toPngOptions = {
    pixelRatio,
    backgroundColor,
    cacheBust,
    style: { opacity: "1", ...style },
  };

  const maxAttempts = Math.max(1, stabilizationAttempts);
  let prevDataUrl = "";
  let dataUrl = "";

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    dataUrl = await toPng(node, toPngOptions);

    if (attempt > 0 && dataUrl === prevDataUrl) {
      break;
    }
    prevDataUrl = dataUrl;
  }

  const response = await fetch(dataUrl);
  return await response.blob();
}

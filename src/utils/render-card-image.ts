export interface RenderCardImageOptions {
  pixelRatio?: number;
  backgroundColor?: string;
  cacheBust?: boolean;
}

/**
 * DOM 노드를 PNG Blob 으로 렌더링한다.
 * `html-to-image` 는 런타임에 동적 import 해 초기 번들에 포함되지 않는다.
 */
export async function renderCardImage(
  node: HTMLElement,
  options: RenderCardImageOptions = {},
): Promise<Blob> {
  const { pixelRatio = 2, backgroundColor = "#ffffff", cacheBust = true } = options;

  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, { pixelRatio, backgroundColor, cacheBust });

  const response = await fetch(dataUrl);
  return await response.blob();
}

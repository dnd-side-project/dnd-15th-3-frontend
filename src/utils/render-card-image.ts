export interface RenderCardImageOptions {
  scale?: number;
  backgroundColor?: string;
  bypassingCache?: boolean;
  style?: Record<string, string>;
}

export async function renderCardImage(
  node: HTMLElement,
  options: RenderCardImageOptions = {},
): Promise<Blob> {
  const { scale = 2, backgroundColor = "#ffffff", bypassingCache = true, style } = options;

  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  const { domToBlob } = await import("modern-screenshot");
  const blob = await domToBlob(node, {
    scale,
    backgroundColor,
    style: { opacity: "1", ...style } as Partial<CSSStyleDeclaration>,
    fetch: { bypassingCache },
  });

  if (!blob) {
    throw new Error("카드 이미지를 생성하지 못했습니다.");
  }

  return blob;
}

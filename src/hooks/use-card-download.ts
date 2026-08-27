import { useCallback, useState } from "react";

import { renderCardImage } from "@/utils/render-card-image";

interface UseCardDownloadReturn {
  loading: boolean;
  error: Error | null;
  downloadCombined: (
    frontNode: HTMLElement | null,
    backNode: HTMLElement | null,
    fileName: string,
  ) => Promise<boolean>;
}

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName.endsWith(".png") ? fileName : `${fileName}.png`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

export function useCardDownload(): UseCardDownloadReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const downloadCombined = useCallback(
    async (frontNode: HTMLElement | null, backNode: HTMLElement | null, fileName: string) => {
      if (frontNode === null || backNode === null) {
        setError(new Error("다운로드할 대상 노드가 없습니다. ref 를 확인하세요."));
        return false;
      }
      if (loading) {
        return false;
      }

      setLoading(true);
      setError(null);
      try {
        const [frontBlob, backBlob] = await Promise.all([
          renderCardImage(frontNode),
          renderCardImage(backNode),
        ]);

        const [frontImg, backImg] = await Promise.all([
          blobToImage(frontBlob),
          blobToImage(backBlob),
        ]);

        const width = frontImg.width + backImg.width;
        const height = Math.max(frontImg.height, backImg.height);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("캔버스 컨텍스트를 생성할 수 없습니다.");
        }

        const frontY = (height - frontImg.height) / 2;
        const backX = frontImg.width;
        const backY = (height - backImg.height) / 2;

        ctx.drawImage(frontImg, 0, frontY);
        ctx.drawImage(backImg, backX, backY);

        const combinedBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("캔버스에서 Blob을 생성할 수 없습니다."));
            }
          }, "image/png");
        });

        saveBlob(combinedBlob, fileName);
        return true;
      } catch (e) {
        const err = e instanceof Error ? e : new Error(String(e));
        setError(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, error, downloadCombined };
}

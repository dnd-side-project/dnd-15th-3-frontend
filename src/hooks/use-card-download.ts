import { useCallback, useState } from "react";

import { renderCardImage } from "@/utils/render-card-image";

interface UseCardDownloadReturn {
  loading: boolean;
  error: Error | null;
  download: (node: HTMLElement | null, fileName: string) => Promise<void>;
}

export function useCardDownload(): UseCardDownloadReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const download = useCallback(
    async (node: HTMLElement | null, fileName: string) => {
      if (node === null) {
        setError(new Error("다운로드할 대상 노드가 없습니다. ref 를 확인하세요."));
        return;
      }
      if (loading) {
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const blob = await renderCardImage(node);
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = fileName.endsWith(".png") ? fileName : `${fileName}.png`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      } catch (e) {
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  return { loading, error, download };
}

import { useCallback, useEffect, useState } from "react";

export interface ShareLinkParams {
  title: string;
  description?: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  link?: string;
  buttonTitle?: string;
}

interface UseKakaoShareReturn {
  loading: boolean;
  error: Error | null;
  shareLink: (params: ShareLinkParams) => void;
}

export function useKakaoShare(): UseKakaoShareReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;
    loadKakaoSdk().then(
      () => {
        if (active) {
          setLoading(false);
          setError(null);
        }
      },
      (e: Error) => {
        if (active) {
          setLoading(false);
          setError(e);
        }
      },
    );
    return () => {
      active = false;
    };
  }, []);

  const shareLink = useCallback((params: ShareLinkParams) => {
    const kakao = window.Kakao;
    if (!kakao?.isInitialized()) {
      console.error("Kakao SDK가 아직 초기화되지 않아 공유를 건너뜁니다.");
      return;
    }
    const origin = window.location.origin;
    const absoluteImageUrl = new URL(params.imageUrl, origin).href;
    const absoluteLink = new URL(params.link ?? origin, origin).href;
    const linkObject: KakaoLinkObject = { webUrl: absoluteLink, mobileWebUrl: absoluteLink };
    kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: params.title,
        ...(params.description ? { description: params.description } : {}),
        imageUrl: absoluteImageUrl,
        ...(params.imageWidth != null ? { imageWidth: params.imageWidth } : {}),
        ...(params.imageHeight != null ? { imageHeight: params.imageHeight } : {}),
        link: linkObject,
      },
      buttons: [{ title: params.buttonTitle ?? "참여하기", link: linkObject }],
    });
  }, []);

  return { loading, error, shareLink };
}

const SDK_SRC = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
const SDK_INTEGRITY = "sha384-OL+ylM/iuPLtW5U3XcvLSGhE8JzReKDank5InqlHGWPhb4140/yrBw0bg0y7+C9J";

let cached: Promise<KakaoStatic> | undefined;

function loadKakaoSdk(): Promise<KakaoStatic> {
  if (cached) {
    return cached;
  }

  cached = new Promise<KakaoStatic>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Kakao SDK는 브라우저 환경에서만 로드할 수 있습니다."));
      return;
    }
    const jsKey = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!jsKey) {
      reject(
        new Error("VITE_KAKAO_JS_KEY 환경변수가 설정되지 않았습니다. .env.local 을 확인하세요."),
      );
      return;
    }

    const init = () => {
      try {
        const kakao = window.Kakao;
        if (!kakao) {
          throw new Error("Kakao SDK 로드 후에도 window.Kakao 가 없습니다.");
        }
        if (!kakao.isInitialized()) {
          kakao.init(jsKey);
        }
        resolve(kakao);
      } catch (error) {
        reject(error);
      }
    };
    const fail = () => reject(new Error("Kakao SDK 스크립트 로드에 실패했습니다."));

    if (window.Kakao) {
      init();
      return;
    }

    const existing = document.getElementById("kakao-js-sdk");
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      existing.addEventListener("error", fail, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-js-sdk";
    script.src = SDK_SRC;
    script.integrity = SDK_INTEGRITY;
    script.crossOrigin = "anonymous";
    script.async = true;
    script.addEventListener("load", init, { once: true });
    script.addEventListener("error", fail, { once: true });
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    cached = undefined;
    if (typeof document !== "undefined") {
      document.getElementById("kakao-js-sdk")?.remove();
    }
    throw error;
  });

  return cached;
}

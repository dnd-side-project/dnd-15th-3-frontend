import type { ReactNode } from "react";

import { type ShareLinkParams, useKakaoShare } from "../../hooks/use-kakao-share";

import * as styles from "./index.css";

interface KakaoShareButtonProps extends ShareLinkParams {
  children?: ReactNode;
}

export function KakaoShareButton({
  children = "카카오톡으로 공유",
  ...params
}: KakaoShareButtonProps) {
  const { loading, error, shareLink } = useKakaoShare();

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={() => shareLink(params)}
        disabled={loading}
      >
        {children}
      </button>
      {error ? <p className={styles.error}>{error.message}</p> : null}
    </div>
  );
}

import { useState } from "react";

import LinkIcon from "../../assets/icon-link-2.svg?react";
import MessageCircleFillIcon from "../../assets/icon-message-circle-fill.svg?react";
import { type ShareLinkParams, useKakaoShare } from "../../hooks/use-kakao-share";

import * as styles from "./index.css";

const COPY_FEEDBACK_DURATION_MS = 1500;

interface ShareButtonGroupProps extends ShareLinkParams {
  onCopyLink?: () => void;
}

export function ShareButtonGroup({ onCopyLink, ...params }: ShareButtonGroupProps) {
  const [copied, setCopied] = useState(false);
  const { loading, error, shareLink } = useKakaoShare();

  const handleCopyLink = async () => {
    const link = params.link ?? window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch {
      // 클립보드 접근이 차단된 환경(권한 미허용 등)에서는 조용히 무시한다.
    }
    onCopyLink?.();
  };

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.iconButton({ tone: "link" })}
        onClick={handleCopyLink}
        aria-label="링크 복사"
      >
        {copied ? "✓" : <LinkIcon width={20} height={20} />}
      </button>
      <button
        type="button"
        className={styles.iconButton({ tone: "kakao" })}
        onClick={() => shareLink(params)}
        disabled={loading}
        aria-label="카카오톡으로 공유"
      >
        <MessageCircleFillIcon width={20} height={20} />
      </button>
      {error ? <p className={styles.label}>{error.message}</p> : null}
    </div>
  );
}

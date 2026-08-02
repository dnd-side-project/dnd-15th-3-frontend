import { useState } from "react";

import LinkIcon from "../../assets/icon-link-2.svg?react";
import MessageCircleFillIcon from "../../assets/icon-message-circle-fill.svg?react";
import { type ShareLinkParams, useKakaoShare } from "../../hooks/use-kakao-share";

import * as styles from "./index.css";

const COPY_FEEDBACK_DURATION_MS = 1500;
const ICON_SIZE = 20;

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
    } catch {}
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
        {copied ? "✓" : <LinkIcon width={ICON_SIZE} height={ICON_SIZE} />}
      </button>
      <button
        type="button"
        className={styles.iconButton({ tone: "kakao" })}
        onClick={() => shareLink(params)}
        disabled={loading}
        aria-label="카카오톡으로 공유"
      >
        <MessageCircleFillIcon width={ICON_SIZE} height={ICON_SIZE} />
      </button>
      {error ? <p className={styles.label}>{error.message}</p> : null}
    </div>
  );
}

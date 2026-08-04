import LinkIcon from "../../assets/icon-link-2.svg?react";
import MessageCircleFillIcon from "../../assets/icon-message-circle-fill.svg?react";
import { type ShareLinkParams, useKakaoShare } from "../../hooks/use-kakao-share";

import * as styles from "./index.css";

const ICON_SIZE = 20;

interface ShareButtonGroupProps extends ShareLinkParams {
  onCopyLink?: () => void;
}

export function ShareButtonGroup({ onCopyLink, ...params }: ShareButtonGroupProps) {
  const { loading, error, shareLink } = useKakaoShare();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(params.link ?? window.location.href);
    onCopyLink?.();
  };

  return (
    <div className={styles.group}>
      <button
        aria-label="링크 복사"
        className={styles.iconButton({ tone: "link" })}
        type="button"
        onClick={handleCopyLink}
      >
        <LinkIcon height={ICON_SIZE} width={ICON_SIZE} />
      </button>
      <button
        aria-label="카카오톡으로 공유"
        className={styles.iconButton({ tone: "kakao" })}
        disabled={loading || error !== null}
        type="button"
        onClick={() => shareLink(params)}
      >
        <MessageCircleFillIcon height={ICON_SIZE} width={ICON_SIZE} />
      </button>
    </div>
  );
}

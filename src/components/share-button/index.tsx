import DotsThreeIcon from "../../assets/icon-dots-three.svg?react";
import LinkIcon from "../../assets/icon-link-2.svg?react";
import MessageCircleFillIcon from "../../assets/icon-message-circle-fill.svg?react";
import { type ShareLinkParams, useKakaoShare } from "../../hooks/use-kakao-share";

import { group, iconButton } from "./index.css";

const LINK_ICON_SIZE = 24;
const KAKAO_ICON_SIZE = 22;
const MORE_ICON_SIZE = 32;

export interface ShareButtonGroupProps extends ShareLinkParams {
  onCopyLink?: () => void;
  onMore?: () => void;
}

export function ShareButtonGroup({ onCopyLink, onMore, ...params }: ShareButtonGroupProps) {
  const { loading, error, shareLink } = useKakaoShare();

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(params.link ?? window.location.href);
    onCopyLink?.();
  };

  return (
    <div className={group}>
      <button
        aria-label="링크 복사"
        className={iconButton({ tone: "link" })}
        type="button"
        onClick={handleCopyLink}
      >
        <LinkIcon aria-hidden height={LINK_ICON_SIZE} width={LINK_ICON_SIZE} />
      </button>
      <button
        aria-label="카카오톡으로 공유"
        className={iconButton({ tone: "kakao" })}
        disabled={loading || error !== null}
        type="button"
        onClick={() => shareLink(params)}
      >
        <MessageCircleFillIcon aria-hidden height={KAKAO_ICON_SIZE} width={KAKAO_ICON_SIZE} />
      </button>
      {onMore ? (
        <button
          aria-label="공유 더보기"
          className={iconButton({ tone: "more" })}
          type="button"
          onClick={onMore}
        >
          <DotsThreeIcon aria-hidden height={MORE_ICON_SIZE} width={MORE_ICON_SIZE} />
        </button>
      ) : null}
    </div>
  );
}

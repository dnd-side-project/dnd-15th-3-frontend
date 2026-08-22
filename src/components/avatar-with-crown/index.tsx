import CrownIcon from "../../assets/icon-crown.svg?react";
import type { ProfileAvatarId } from "../../domains/catalog/api/types";
import { MomoAvatar } from "../momo-avatar";

import { avatarWrapper, crown } from "./index.css";

interface AvatarWithCrownProps {
  avatarId: ProfileAvatarId;
  size: number;
  isHost: boolean;
  alt?: string;
}

export function AvatarWithCrown({ avatarId, size, isHost, alt = "" }: AvatarWithCrownProps) {
  return (
    <span className={avatarWrapper}>
      <MomoAvatar alt={alt} avatarId={avatarId} size={size} />
      {isHost ? (
        <span aria-label="방장" className={crown} role="img">
          <CrownIcon aria-hidden height={12} width={12} />
        </span>
      ) : null}
    </span>
  );
}

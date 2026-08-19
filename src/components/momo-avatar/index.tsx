import type { ProfileAvatarId } from "../../domains/catalog/api/types";
import { cx } from "../../utils/cx";

import { image, root } from "./index.css";

export interface MomoAvatarProps {
  avatarId: ProfileAvatarId;
  /** 지름(px) */
  size: number;
  alt?: string;
  className?: string;
}

export function MomoAvatar({ avatarId, size, alt = "", className }: MomoAvatarProps) {
  return (
    <span className={cx(root, className)} style={{ width: size, height: size }}>
      <img alt={alt} className={image} src={`/static/avatar-${avatarId}.webp`} />
    </span>
  );
}

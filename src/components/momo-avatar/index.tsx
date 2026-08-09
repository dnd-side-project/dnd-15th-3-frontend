import type { ProfileAvatarId } from "../../domains/catalog/api/types";

import { image, root } from "./index.css";

export type MomoAvatarSize = "large" | "medium" | "small";

export interface MomoAvatarProps {
  avatarId: ProfileAvatarId;
  size?: MomoAvatarSize;
  alt?: string;
  className?: string;
}

export function MomoAvatar({ avatarId, size = "medium", alt = "", className }: MomoAvatarProps) {
  return (
    <span className={[root({ size }), className].filter(Boolean).join(" ")}>
      <img alt={alt} className={image} src={`/static/avatar-${avatarId}.webp`} />
    </span>
  );
}

import type { ProfileAvatarId } from "../../catalog/api/types";

export interface JoinDraft {
  userKey: string;
  nickname: string;
  profileAvatarId: ProfileAvatarId;
  invitationCode: string;
}

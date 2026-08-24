import type { ProfileAvatarId } from "@/domains/catalog/api/types";

export interface JoinDraft {
  userKey: string;
  nickname: string;
  profileAvatarId: ProfileAvatarId;
  invitationCode: string;
}

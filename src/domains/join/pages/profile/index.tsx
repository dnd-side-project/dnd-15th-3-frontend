import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";

import ArrowsClockwiseIcon from "../../../../assets/icon-arrows-clockwise.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import { CtaButton, CtaButtonRow } from "../../../../components/cta-button";
import { MomoAvatar } from "../../../../components/momo-avatar";
import { SpeechBubble } from "../../../../components/speech-bubble";
import { NicknameInput } from "../../../../components/text-input";
import { TopAppBar } from "../../../../components/top-app-bar";
import { setAccessToken } from "../../../../utils/access-token";
import { getUserKey } from "../../../../utils/user-key";
import type { ProfileAvatarId } from "../../../catalog/api/types";
import { useProfileAvatars } from "../../../catalog/hooks";
import { joinMeeting, previewInvitation } from "../../../meeting/api";
import type { JoinDraft } from "../../types/draft";

import { surfaceColor } from "../../../../components/layout/index.css";
import {
  avatar,
  changeButton,
  content,
  ctaArea,
  label,
  nickname,
  option,
  options,
  page,
  preview,
  profile,
  root,
  sheetBody,
  sheetDescription,
  sheetFooter,
  sheetTexts,
  sheetTitle,
} from "./index.css";

const NICKNAME_MAX_LENGTH = 10;

export function JoinProfilePage() {
  const navigate = useNavigate();
  const { control, register, getValues, setValue } = useFormContext<JoinDraft>();
  const avatars = useProfileAvatars();
  const [nicknameValue, avatarId, invitationCode] = useWatch({
    control,
    name: ["nickname", "profileAvatarId", "invitationCode"],
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [pending, setPending] = useState<ProfileAvatarId>(() => getValues("profileAvatarId"));

  const { data: invitation, isError } = useQuery({
    queryKey: ["meeting", "invitation-preview", invitationCode] as const,
    queryFn: () => previewInvitation(invitationCode),
    enabled: invitationCode.length > 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: joinMeeting,
    onSuccess: (meeting) => {
      setAccessToken(meeting.id, meeting.participantAccessToken);
      void navigate(`/meeting/${meeting.id}/place`);
    },
    onError: () => void navigate("/join/error"),
  });

  if (!invitationCode || isError) {
    return <Navigate replace to="/join/error" />;
  }
  if (!invitation) {
    return null;
  }

  const openSheet = () => {
    setPending(getValues("profileAvatarId"));
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const save = () => {
    setValue("profileAvatarId", pending);
    closeSheet();
  };

  const handleJoin = () => {
    const draft = getValues();
    mutate({
      userKey: getUserKey(),
      nickname: draft.nickname,
      profileAvatarId: draft.profileAvatarId,
      invitationCode: draft.invitationCode,
    });
  };

  return (
    <div className={page}>
      <TopAppBar background={surfaceColor} onBack={() => void navigate(-1)} title="프로필 작성" />
      <main className={content}>
        <div className={root}>
          <div className={profile}>
            <SpeechBubble>원하는 모습을 선택해보세요!</SpeechBubble>
            <div className={avatar}>
              <MomoAvatar alt="내 프로필" avatarId={avatarId} size={133} />
              <button
                aria-label="프로필 이미지 변경"
                className={changeButton}
                type="button"
                onClick={openSheet}
              >
                <ArrowsClockwiseIcon aria-hidden height={24} width={24} />
              </button>
            </div>
          </div>

          <div className={nickname}>
            <span className={label}>닉네임을 적어볼까요?</span>
            <NicknameInput
              showCount
              maxLength={NICKNAME_MAX_LENGTH}
              {...register("nickname", { required: true, maxLength: NICKNAME_MAX_LENGTH })}
            />
          </div>
        </div>
      </main>

      <div className={ctaArea}>
        <CtaButtonRow
          onSecondary={() => void navigate(-1)}
          primaryDisabled={isPending || nicknameValue.length === 0}
          primaryLabel="모임 시작하기"
          onPrimary={handleJoin}
        />
      </div>

      <BottomSheet hasBackdrop isOpen={sheetOpen} onClose={closeSheet} onTapBackdrop={closeSheet}>
        <div className={sheetBody}>
          <div className={sheetTexts}>
            <h2 className={sheetTitle}>원하는 모습을 선택해주세요!</h2>
            <p className={sheetDescription}>마음에 드는 모모로 변경할 수 있어요.</p>
          </div>

          <MomoAvatar avatarId={pending} className={preview} size={110} />

          <div className={options}>
            {avatars.map((item) => (
              <button
                aria-label={item.name}
                aria-pressed={item.id === pending}
                className={option}
                key={item.id}
                type="button"
                onClick={() => setPending(item.id)}
              >
                <MomoAvatar avatarId={item.id} size={70} />
              </button>
            ))}
          </div>
        </div>

        <div className={sheetFooter}>
          <CtaButton onClick={save}>저장</CtaButton>
        </div>
      </BottomSheet>
    </div>
  );
}

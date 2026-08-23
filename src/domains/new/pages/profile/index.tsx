import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import ArrowsClockwiseIcon from "@/assets/icon-arrows-clockwise.svg?react";
import { BottomSheet } from "@/components/bottom-sheet";
import { CtaButton } from "@/components/cta-button";
import { MomoAvatar } from "@/components/momo-avatar";
import { SpeechBubble } from "@/components/speech-bubble";
import { NicknameInput } from "@/components/text-input";
import type { ProfileAvatarId } from "@/domains/catalog/api/types";
import { useProfileAvatars } from "@/domains/catalog/hooks";
import { StepPage } from "@/domains/new/components/step-page";
import type { MeetingDraft } from "@/domains/new/constants";

import {
  avatar,
  changeButton,
  label,
  nickname,
  option,
  options,
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

export function ProfilePage() {
  const navigate = useNavigate();
  const { control, register, getValues, setValue } = useFormContext<MeetingDraft>();
  const avatars = useProfileAvatars();
  const [nicknameValue, avatarId] = useWatch({ control, name: ["nickname", "profileAvatarId"] });

  const [sheetOpen, setSheetOpen] = useState(false);
  // 시트에서 고른 값은 저장을 눌러야 폼에 반영한다.
  const [pending, setPending] = useState<ProfileAvatarId>(() => getValues("profileAvatarId"));

  const openSheet = () => {
    setPending(getValues("profileAvatarId"));
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const save = () => {
    setValue("profileAvatarId", pending);
    closeSheet();
  };

  return (
    <StepPage
      primaryDisabled={nicknameValue.length === 0}
      title="프로필 작성"
      onPrimary={() => void navigate("/new/meeting-info")}
    >
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
    </StepPage>
  );
}

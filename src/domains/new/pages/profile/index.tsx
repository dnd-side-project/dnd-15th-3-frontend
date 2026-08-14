import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import ArrowsClockwiseIcon from "../../../../assets/icon-arrows-clockwise.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import { CtaButton } from "../../../../components/cta-button";
import { MomoAvatar } from "../../../../components/momo-avatar";
import { SpeechBubble } from "../../../../components/speech-bubble";
import { NicknameInput } from "../../../../components/text-input";
import type { ProfileAvatarId } from "../../../catalog/api/types";
import { useProfileAvatars } from "../../../catalog/hooks";
import { StepPage } from "../../components/step-page";
import { useMeetingDraft } from "../../draft";

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
const AVATAR_PATH = "/new/profile-avatar";

export function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { draft, patch } = useMeetingDraft();
  const avatars = useProfileAvatars();

  const sheetOpen = location.pathname === AVATAR_PATH;
  const [pending, setPending] = useState<ProfileAvatarId>(draft.profileAvatarId);

  const openSheet = () => {
    setPending(draft.profileAvatarId);
    void navigate(AVATAR_PATH);
  };

  const closeSheet = () => void navigate(-1);

  const save = () => {
    patch({ profileAvatarId: pending });
    closeSheet();
  };

  return (
    <StepPage
      primaryDisabled={draft.nickname.length === 0}
      title="프로필 작성"
      onPrimary={() => void navigate("/new/meeting-info")}
    >
      <div className={root}>
        <div className={profile}>
          <SpeechBubble>원하는 모습을 선택해보세요!</SpeechBubble>
          <div className={avatar}>
            <MomoAvatar alt="내 프로필" avatarId={draft.profileAvatarId} size="large" />
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
            value={draft.nickname}
            onChange={(event) => patch({ nickname: event.target.value })}
          />
        </div>
      </div>

      <BottomSheet hasBackdrop isOpen={sheetOpen} onClose={closeSheet} onTapBackdrop={closeSheet}>
        <div className={sheetBody}>
          <div className={sheetTexts}>
            <h2 className={sheetTitle}>원하는 모습을 선택해주세요!</h2>
            <p className={sheetDescription}>마음에 드는 모모로 변경할 수 있어요.</p>
          </div>

          <MomoAvatar avatarId={pending} className={preview} size="medium" />

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
                <MomoAvatar avatarId={item.id} size="small" />
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

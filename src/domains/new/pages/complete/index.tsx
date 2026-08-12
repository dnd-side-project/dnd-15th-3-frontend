import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-600.css";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import CompleteConfetti from "../../../../assets/complete-confetti.svg?react";
import CopyIcon from "../../../../assets/icon-copy.svg?react";
import { CtaButton } from "../../../../components/cta-button";
import { Layout } from "../../../../components/layout";
import { ShareButtonGroup } from "../../../../components/share-button";
import { setAccessToken } from "../../../meeting/access-token";
import { createMeeting } from "../../../meeting/api";
import type { CreateMeetingRequest, MeetingScreen } from "../../../meeting/api/types";
import { getUserKey } from "../../../user/user-key";
import { useMeetingDraft } from "../../draft";

import {
  badge,
  card,
  cardImage,
  code as codeStyle,
  codeRow,
  confetti,
  description,
  divider,
  dividerLabel,
  dividerLine,
  footer,
  root,
  share,
  status,
  texts,
  title,
} from "./index.css";

const MEETING_ID_KEY = (invitationCode: string) => `momo.meeting-id.${invitationCode}`;

export function CompletePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { draft } = useMeetingDraft();

  const invitationCode = searchParams.get("code") ?? "";
  const [meetingId, setMeetingId] = useState(
    () => sessionStorage.getItem(MEETING_ID_KEY(invitationCode)) ?? "",
  );
  const [copied, setCopied] = useState(false);

  const settle = (meeting: MeetingScreen) => {
    setAccessToken(meeting.id, meeting.participantAccessToken);
    sessionStorage.setItem(MEETING_ID_KEY(meeting.invitationCode), meeting.id);
    setMeetingId(meeting.id);
    setSearchParams({ code: meeting.invitationCode }, { replace: true });
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: createMeeting,
    onSuccess: settle,
  });

  // 이 화면에 도착하는 순간 모임을 만든다. 새로고침해도 code 가 남아 있어 다시 만들지 않는다.
  const requested = useRef(false);
  useEffect(() => {
    const { meetingTypeCode, firstLocation } = draft;
    if (
      requested.current ||
      invitationCode !== "" ||
      meetingTypeCode === null ||
      firstLocation === null
    ) {
      return;
    }
    requested.current = true;

    const request: CreateMeetingRequest = {
      meetingTypeCode,
      name: draft.name,
      date: draft.date,
      time: draft.time,
      firstMeetingLocation: {
        displayName: firstLocation.name,
        address: firstLocation.address,
        latitude: firstLocation.latitude,
        longitude: firstLocation.longitude,
        externalAddressId: firstLocation.externalAddressId,
      },
      categorySlugs: draft.categorySlugs,
      host: {
        userKey: getUserKey(),
        nickname: draft.nickname,
        profileAvatarId: draft.profileAvatarId,
      },
    };
    mutate(request);
  }, [draft, invitationCode, mutate]);

  const copyCode = async () => {
    await navigator.clipboard.writeText(invitationCode);
    setCopied(true);
  };

  return (
    <Layout>
      <div className={root}>
        <div className={texts}>
          <h1 className={title}>모임 방이 만들어졌어요!</h1>
          <p className={description}>친구들을 초대해 모임을 시작해볼까요?</p>
        </div>

        {invitationCode === "" ? (
          <p className={status}>
            {error === null ? "모임 방 만드는 중" : "모임 방을 만들지 못했습니다."}
          </p>
        ) : (
          <>
            <div className={card}>
              <CompleteConfetti aria-hidden className={confetti} />
              <img alt="" className={cardImage} src="/static/complete-momo.webp" />
              <span className={badge}>초대코드</span>
              <button
                aria-label={copied ? "초대코드 복사 완료" : "초대코드 복사"}
                className={codeRow}
                type="button"
                onClick={copyCode}
              >
                <span className={codeStyle}>{invitationCode}</span>
                <CopyIcon aria-hidden height={24} width={24} />
              </button>
            </div>

            <div className={divider}>
              <span className={dividerLine} />
              <span className={dividerLabel}>초대장 공유하기</span>
              <span className={dividerLine} />
            </div>

            <div className={share}>
              <ShareButtonGroup
                description={`초대코드 ${invitationCode}`}
                imageUrl={`${window.location.origin}/static/momo-kakao-share.png`}
                title={draft.name}
                onMore={() => void navigator.share?.({ text: invitationCode })}
              />
            </div>
          </>
        )}

        <div className={footer}>
          <CtaButton
            disabled={isPending || meetingId === ""}
            onClick={() => void navigate(`/meeting/${meetingId}`)}
          >
            모임 시작하기
          </CtaButton>
        </div>
      </div>
    </Layout>
  );
}

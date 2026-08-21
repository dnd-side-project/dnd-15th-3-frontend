import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";

import CrownIcon from "../../assets/icon-crown.svg?react";
import SendIcon from "../../assets/icon-send.svg?react";
import type { ProfileAvatarId } from "../../domains/catalog/api/types";
import { createCourseComment } from "../../domains/course/api";
import { courseQueries } from "../../domains/course/api/queries";
import type { CourseComment } from "../../domains/course/api/types";
import { BottomSheet } from "../bottom-sheet";
import { MomoAvatar } from "../momo-avatar";

import {
  avatarWrapper,
  bubble,
  content,
  crown,
  input,
  inputBar,
  inputField,
  list,
  meta,
  nickname,
  row,
  scrollContainer,
  sendButton,
  timestamp,
} from "./index.css";

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function isIOS() {
  if (typeof navigator === "undefined") {
    return false;
  }
  return (
    /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent))
  );
}

interface AvatarWithCrownProps {
  avatarId: ProfileAvatarId;
  size: number;
  isHost: boolean;
  alt?: string;
}

function AvatarWithCrown({ avatarId, size, isHost, alt = "" }: AvatarWithCrownProps) {
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

interface CourseCommentItemProps {
  comment: CourseComment;
}

function CourseCommentItem({ comment }: CourseCommentItemProps) {
  if (comment.isMine) {
    return (
      <div className={row({ variant: "mine" })}>
        <div className={content}>
          <div className={bubble({ variant: "mine" })}>{comment.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={row({ variant: "incoming" })}>
      <AvatarWithCrown
        alt={comment.nickname}
        avatarId={comment.profileAvatarId}
        isHost={comment.authorRole === "HOST"}
        size={40}
      />
      <div className={content}>
        <div className={meta}>
          <span className={nickname}>{comment.nickname}</span>
          <span className={timestamp}>{formatTime(comment.createdAt)}</span>
        </div>
        <div className={bubble({ variant: "incoming" })}>{comment.content}</div>
      </div>
    </div>
  );
}

interface CourseCommentListProps {
  comments: CourseComment[];
}

function CourseCommentList({ comments }: CourseCommentListProps) {
  return (
    <div className={list}>
      {comments.map((comment) => (
        <CourseCommentItem comment={comment} key={comment.commentId} />
      ))}
    </div>
  );
}

interface CourseCommentInputProps {
  avatarId: ProfileAvatarId;
  isHost: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  maxLength?: number;
  placeholder?: string;
}

function CourseCommentInput({
  avatarId,
  isHost,
  value,
  onChange,
  onSend,
  maxLength = 300,
  placeholder = "코스에 대한 의견을 남겨주세요!",
}: CourseCommentInputProps) {
  const canSend = value.trim().length > 0;

  const handleSend = () => {
    if (canSend) {
      onSend();
    }
  };

  return (
    <div className={inputBar}>
      <AvatarWithCrown alt="내 프로필" avatarId={avatarId} isHost={isHost} size={50} />
      <span className={inputField}>
        <input
          aria-label="코스 댓글"
          className={input}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button
          aria-label="댓글 보내기"
          className={sendButton}
          disabled={!canSend}
          type="button"
          onClick={handleSend}
          onMouseDown={(event) => event.preventDefault()}
        >
          <SendIcon aria-hidden height={20} width={20} />
        </button>
      </span>
    </div>
  );
}

export interface CourseCommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  meetingId: string;
  courseCandidateId: string;
  accessToken: string;
  avatarId: ProfileAvatarId;
  isHost: boolean;
}

export function CourseCommentSheet({
  isOpen,
  onClose,
  meetingId,
  courseCandidateId,
  accessToken,
  avatarId,
  isHost,
}: CourseCommentSheetProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const { data: comments } = useQuery({
    ...courseQueries.comments(meetingId, courseCandidateId, accessToken),
    enabled: isOpen,
  });
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate: sendComment, isPending } = useMutation({
    mutationFn: (content: string) =>
      createCourseComment(meetingId, courseCandidateId, accessToken, { content }),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["course", meetingId, "comments", courseCandidateId],
      });
      setValue("");
    },
  });

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [comments, isOpen]);

  return (
    <BottomSheet
      hasBackdrop
      isOpen={isOpen}
      onClose={onClose}
      onTapBackdrop={onClose}
      topBorderRadius="md"
      disableContentDrag
      avoidKeyboard={isIOS()}
    >
      <div ref={listRef} className={scrollContainer}>
        <CourseCommentList comments={comments ?? []} />
      </div>
      <CourseCommentInput
        avatarId={avatarId}
        isHost={isHost}
        onChange={(event) => setValue(event.target.value)}
        onSend={() => {
          if (isPending) {
            return;
          }
          sendComment(value.trim());
        }}
        value={value}
      />
    </BottomSheet>
  );
}

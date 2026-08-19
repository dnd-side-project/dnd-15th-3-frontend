import type { ChangeEvent } from "react";

import CrownIcon from "../../assets/icon-crown.svg?react";
import SendIcon from "../../assets/icon-send.svg?react";
import type { ProfileAvatarId } from "../../domains/catalog/api/types";
import { cx } from "../../utils/cx";
import { MomoAvatar } from "../momo-avatar";

import {
  avatarWrapper,
  bubble,
  bubbleIncoming,
  bubbleMine,
  content,
  crown,
  input,
  inputBar,
  inputField,
  list,
  meta,
  nickname,
  row,
  rowMine,
  sendButton,
  timestamp,
} from "./index.css";

export type CourseCommentAuthorRole = "HOST" | "MEMBER";

export interface CourseComment {
  commentId: string;
  nickname: string;
  profileAvatarId: ProfileAvatarId;
  authorRole: CourseCommentAuthorRole;
  isMine: boolean;
  content: string;
  /** ISO 8601 형식의 작성 시각 */
  createdAt: string;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
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

export interface CourseCommentItemProps {
  comment: CourseComment;
}

export function CourseCommentItem({ comment }: CourseCommentItemProps) {
  if (comment.isMine) {
    return (
      <div className={cx(row, rowMine)}>
        <div className={content}>
          <div className={cx(bubble, bubbleMine)}>{comment.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={row}>
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
        <div className={cx(bubble, bubbleIncoming)}>{comment.content}</div>
      </div>
    </div>
  );
}

export interface CourseCommentListProps {
  comments: CourseComment[];
}

export function CourseCommentList({ comments }: CourseCommentListProps) {
  return (
    <div className={list}>
      {comments.map((comment) => (
        <CourseCommentItem comment={comment} key={comment.commentId} />
      ))}
    </div>
  );
}

export interface CourseCommentInputProps {
  avatarId: ProfileAvatarId;
  isHost: boolean;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  maxLength?: number;
  placeholder?: string;
}

export function CourseCommentInput({
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
        >
          <SendIcon aria-hidden height={20} width={20} />
        </button>
      </span>
    </div>
  );
}

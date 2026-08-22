import type { CourseComment } from "../../domains/course/api/types";
import { AvatarWithCrown } from "../avatar-with-crown";

import { bubble, content, meta, nickname, row, timestamp } from "./index.css";

interface CourseCommentItemProps {
  comment: CourseComment;
  time: string;
}

export function CourseCommentItem({ comment, time }: CourseCommentItemProps) {
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
          <span className={timestamp}>{time}</span>
        </div>
        <div className={bubble({ variant: "incoming" })}>{comment.content}</div>
      </div>
    </div>
  );
}

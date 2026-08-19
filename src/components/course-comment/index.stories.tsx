import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { ChangeEvent } from "react";

import { withLayout } from "../layout/index.decorators";
import type { CourseComment } from "./index";
import { CourseCommentSheet } from "./index";

const baseComments: CourseComment[] = [
  {
    commentId: "1",
    nickname: "가나디가 조아",
    profileAvatarId: "momo-mint",
    authorRole: "MEMBER",
    isMine: false,
    content: "야 이 식당 맛있어?",
    createdAt: "2026-08-19T15:37:00.000Z",
  },
  {
    commentId: "2",
    nickname: "디저트탐색러",
    profileAvatarId: "momo-purple",
    authorRole: "MEMBER",
    isMine: false,
    content: "웅 나는 맛있었던 것 같아!",
    createdAt: "2026-08-19T15:37:00.000Z",
  },
  {
    commentId: "3",
    nickname: "아무거나다좋아",
    profileAvatarId: "momo-pink",
    authorRole: "HOST",
    isMine: false,
    content: "그럼 여기 가자 ㅎㅎ 방장 코스 B로 가는걸로 선택해줘!",
    createdAt: "2026-08-19T15:37:00.000Z",
  },
  {
    commentId: "4",
    nickname: "나",
    profileAvatarId: "momo-blue",
    authorRole: "MEMBER",
    isMine: true,
    content: "오케이!",
    createdAt: "2026-08-19T15:38:00.000Z",
  },
];

const meta = {
  title: "components/CourseComment",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withLayout],
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export default meta;

function DefaultStory() {
  const [isOpen, setIsOpen] = useState(true);
  const [comments, setComments] = useState<CourseComment[]>(baseComments);
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return;
    }
    const next: CourseComment = {
      commentId: String(comments.length + 1),
      nickname: "나",
      profileAvatarId: "momo-blue",
      authorRole: "HOST",
      isMine: true,
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [...prev, next]);
    setValue("");
  };

  return (
    <div>
      <div style={{ padding: 20 }}>
        <button onClick={() => setIsOpen(true)} type="button">
          코스 댓글 바텀시트 열기
        </button>
      </div>
      <CourseCommentSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        comments={comments}
        value={value}
        onChange={handleChange}
        onSend={handleSend}
        avatarId="momo-blue"
        isHost
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

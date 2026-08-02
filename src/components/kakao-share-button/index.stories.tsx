import type { Meta, StoryObj } from "@storybook/react-vite";

import { KakaoShareButton } from "./index";

const meta = {
  component: KakaoShareButton,
  title: "components/KakaoShareButton",
  args: {
    title: "모모(momo) - 모임 초대를 받았어요",
    description: "친구들과 함께 모임 코스를 계획해보세요",
    imageUrl: "/static/momo-kakao-share.png",
    buttonTitle: "참여하기",
    children: "카카오톡으로 공유",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    imageUrl: { control: "text" },
    link: { control: "text" },
    buttonTitle: { control: "text" },
    children: { control: "text" },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof KakaoShareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

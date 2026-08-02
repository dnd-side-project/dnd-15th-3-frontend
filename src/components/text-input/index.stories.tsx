import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import SearchIcon from "../../assets/icon-search.svg?react";
import { CharCounter, TextInput } from "./index";

const meta = {
  component: TextInput,
  title: "components/TextInput",
  args: {
    placeholder: "닉네임을 입력해주세요",
  },
  argTypes: {
    shape: {
      control: "inline-radio",
      options: ["rounded", "pill"],
    },
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof meta>;

/** 닉네임을 입력해주세요 Variant — 글자수 카운터가 우측에 붙는 버전 */
export const 닉네임을입력해주세요_카운터: Story = {
  name: "닉네임을 입력해주세요 (카운터)",
  render: (args) => {
    const NicknameWithCounter = () => {
      const [value, setValue] = useState("");
      const maxLength = 10;

      return (
        <TextInput
          {...args}
          value={value}
          maxLength={maxLength}
          endAdornment={<CharCounter value={value} maxLength={maxLength} />}
          onChange={(event) => setValue(event.target.value)}
        />
      );
    };

    return <NicknameWithCounter />;
  },
};

/** 닉네임을 입력해주세요 Variant — 검색 아이콘이 우측에 붙는 버전 */
export const 닉네임을입력해주세요_검색: Story = {
  name: "닉네임을 입력해주세요 (검색)",
  args: {
    endAdornment: <SearchIcon width={18} height={18} />,
  },
};

/** 코스에 대한 의견을 남겨주세요 Variant — pill 모양, 우측 액세서리 없음 */
export const 코스의견남기기: Story = {
  name: "코스 의견남기기",
  args: {
    shape: "pill",
    placeholder: "코스에 대한 의견을 남겨주세요",
  },
};

export default meta;

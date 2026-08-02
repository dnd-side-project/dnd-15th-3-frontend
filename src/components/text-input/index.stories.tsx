import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import SearchIcon from "../../assets/icon-search.svg?react";
import { CharCounter, TextInput, type TextInputProps } from "./index";

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

function NicknameWithCounter(props: TextInputProps) {
  const [value, setValue] = useState("");
  const maxLength = 10;

  return (
    <TextInput
      {...props}
      value={value}
      maxLength={maxLength}
      endAdornment={<CharCounter value={value} maxLength={maxLength} />}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

export const 닉네임을입력해주세요_카운터: Story = {
  name: "닉네임을 입력해주세요 (카운터)",
  render: (args) => <NicknameWithCounter {...args} />,
};

export const 닉네임을입력해주세요_검색: Story = {
  name: "닉네임을 입력해주세요 (검색)",
  args: {
    endAdornment: <SearchIcon width={18} height={18} />,
  },
};

export const 코스의견남기기: Story = {
  name: "코스 의견남기기",
  args: {
    shape: "pill",
    placeholder: "코스에 대한 의견을 남겨주세요",
  },
};

export default meta;

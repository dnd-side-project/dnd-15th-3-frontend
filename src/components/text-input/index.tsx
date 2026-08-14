import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";

import ChatCircleIcon from "../../assets/icon-chat-circle.svg?react";
import SearchIcon from "../../assets/icon-search.svg?react";
import { cx } from "../../utils/cx";

import { adornment, charCounter, field, input, sendButton, wrapper } from "./index.css";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  shape?: "rounded" | "pill";
  endIcon?: ReactNode;
  showCount?: boolean;
}

export function TextInput({
  shape = "rounded",
  endIcon,
  showCount = false,
  className,
  maxLength,
  value,
  onChange,
  ...props
}: TextInputProps) {
  const [typedLength, setTypedLength] = useState(0);
  const length = typeof value === "string" ? value.length : typedLength;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTypedLength(event.target.value.length);
    onChange?.(event);
  };

  return (
    <span className={cx(field, wrapper({ shape }), className)}>
      <input
        className={input}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {showCount ? (
        <span className={charCounter}>
          {length}
          {maxLength === undefined ? null : `/${maxLength}`}
        </span>
      ) : null}
      {endIcon ? <span className={adornment}>{endIcon}</span> : null}
    </span>
  );
}

export function NicknameInput(props: Omit<TextInputProps, "shape">) {
  return (
    <TextInput aria-label="닉네임" placeholder="닉네임을 입력해주세요" shape="rounded" {...props} />
  );
}

export function PlaceSearchInput(props: Omit<TextInputProps, "shape" | "endIcon">) {
  return (
    <TextInput
      aria-label="장소 검색"
      endIcon={<SearchIcon aria-hidden height={24} width={24} />}
      placeholder="장소를 검색하세요"
      shape="rounded"
      {...props}
    />
  );
}

export interface CourseFeedbackInputProps extends Omit<TextInputProps, "shape" | "endIcon"> {
  onSend?: () => void;
}

export function CourseFeedbackInput({ onSend, ...props }: CourseFeedbackInputProps) {
  return (
    <TextInput
      aria-label="코스 의견"
      endIcon={
        onSend ? (
          <button aria-label="의견 보내기" className={sendButton} type="button" onClick={onSend}>
            <ChatCircleIcon aria-hidden height={24} width={24} />
          </button>
        ) : null
      }
      placeholder="코스에 대한 의견을 남겨주세요!"
      shape="pill"
      {...props}
    />
  );
}

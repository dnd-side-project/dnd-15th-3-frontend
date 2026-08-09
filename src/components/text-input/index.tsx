import type { InputHTMLAttributes, ReactNode } from "react";

import ChatCircleIcon from "../../assets/icon-chat-circle.svg?react";
import SearchIcon from "../../assets/icon-search.svg?react";

import { adornment, charCounter, field, input, sendButton, wrapper } from "./index.css";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  shape?: "rounded" | "pill";
  endAdornment?: ReactNode;
}

export function TextInput({
  shape = "rounded",
  endAdornment,
  className,
  ...props
}: TextInputProps) {
  return (
    <span className={[field, wrapper({ shape }), className].filter(Boolean).join(" ")}>
      <input className={input} {...props} />
      {endAdornment ? <span className={adornment}>{endAdornment}</span> : null}
    </span>
  );
}

export interface CharCounterProps {
  value: string;
  maxLength: number;
}

export function CharCounter({ value, maxLength }: CharCounterProps) {
  return (
    <span className={charCounter}>
      {value.length}/{maxLength}
    </span>
  );
}

export function NicknameInput(props: Omit<TextInputProps, "shape">) {
  return (
    <TextInput aria-label="닉네임" placeholder="닉네임을 입력해주세요" shape="rounded" {...props} />
  );
}

export function PlaceSearchInput(props: Omit<TextInputProps, "shape" | "endAdornment">) {
  return (
    <TextInput
      aria-label="장소 검색"
      endAdornment={<SearchIcon aria-hidden height={24} width={24} />}
      placeholder="장소를 검색하세요"
      shape="rounded"
      {...props}
    />
  );
}

export interface CourseFeedbackInputProps extends Omit<TextInputProps, "shape" | "endAdornment"> {
  onSend?: () => void;
}

export function CourseFeedbackInput({ onSend, ...props }: CourseFeedbackInputProps) {
  return (
    <TextInput
      aria-label="코스 의견"
      endAdornment={
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

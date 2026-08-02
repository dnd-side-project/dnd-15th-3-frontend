import type { InputHTMLAttributes, ReactNode } from "react";

import { adornment, input, wrapper } from "./index.css";

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
    <span className={`${wrapper({ shape })}${className ? ` ${className}` : ""}`}>
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
    <>
      {value.length}/{maxLength}
    </>
  );
}

export function NicknameInput(props: Omit<TextInputProps, "shape">) {
  return <TextInput shape="rounded" placeholder="닉네임을 입력해주세요" {...props} />;
}

export function CourseFeedbackInput(props: Omit<TextInputProps, "shape">) {
  return <TextInput shape="pill" placeholder="코스에 대한 의견을 남겨주세요" {...props} />;
}

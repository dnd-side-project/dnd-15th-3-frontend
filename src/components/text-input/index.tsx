import type { InputHTMLAttributes, ReactNode } from "react";

import { adornment, input, wrapper } from "./index.css";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 인풋 형태. rounded는 살짝 둥근 사각형, pill은 완전히 둥근 알약 모양 */
  shape?: "rounded" | "pill";
  /** 우측 슬롯. 글자수 카운터, 검색 아이콘 등 자유롭게 주입 */
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
      {endAdornment && <span className={adornment}>{endAdornment}</span>}
    </span>
  );
}

export interface CharCounterProps {
  value: string;
  maxLength: number;
}

/** endAdornment로 주입해서 쓰는 글자수 카운터 서브컴포넌트 */
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

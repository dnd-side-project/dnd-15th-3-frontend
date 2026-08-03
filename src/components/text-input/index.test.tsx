import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vite-plus/test";

import { CharCounter, CourseFeedbackInput, NicknameInput, TextInput } from "./index";

test("NicknameInput은 닉네임 placeholder를 가진 textbox를 렌더링한다", () => {
  render(<NicknameInput />);

  expect(screen.getByPlaceholderText("닉네임을 입력해주세요")).toBe(screen.getByRole("textbox"));
});

test("CourseFeedbackInput은 의견 placeholder를 가진 textbox를 렌더링한다", () => {
  render(<CourseFeedbackInput />);

  expect(screen.getByPlaceholderText("코스에 대한 의견을 남겨주세요")).toBe(
    screen.getByRole("textbox"),
  );
});

test("aria-label을 넘기면 accessible name으로 textbox를 조회할 수 있다", () => {
  render(<NicknameInput aria-label="닉네임" />);

  expect(screen.getByRole("textbox", { name: "닉네임" })).toHaveAttribute(
    "placeholder",
    "닉네임을 입력해주세요",
  );
});

test("[접근성 이슈] 연결된 label이 없으면 placeholder만으로는 accessible name이 생기지 않는다", () => {
  render(<NicknameInput />);

  // placeholder는 label의 대체재가 아니다: 스크린리더가 일관되게 읽지 않고 입력 시작 시 사라진다.
  expect(screen.getByRole("textbox")).not.toHaveAccessibleName();
  expect(screen.queryByLabelText("닉네임을 입력해주세요")).not.toBeInTheDocument();
  expect(screen.queryByRole("textbox", { name: "닉네임을 입력해주세요" })).not.toBeInTheDocument();
});

test("endAdornment로 전달한 내용을 렌더링한다", () => {
  render(<TextInput aria-label="검색" endAdornment={<span>초기화</span>} />);

  expect(screen.getByText("초기화")).toBeInTheDocument();
});

test("endAdornment가 없으면 adornment 슬롯을 렌더링하지 않는다", () => {
  render(<TextInput aria-label="검색" />);

  expect(screen.queryByText("초기화")).not.toBeInTheDocument();
});

test("CharCounter는 현재 길이와 최대 길이를 x/y 형태로 표시한다", () => {
  render(<CharCounter maxLength={10} value="" />);

  expect(screen.getByText("0/10")).toBeInTheDocument();
});

test("CharCounter를 endAdornment로 넘기면 입력 길이를 표시한다", () => {
  render(
    <TextInput aria-label="닉네임" endAdornment={<CharCounter maxLength={10} value="hi" />} />,
  );

  expect(screen.getByText("2/10")).toBeInTheDocument();
});

test("사용자가 타이핑하면 입력값이 반영된다", async () => {
  const user = userEvent.setup();
  render(<NicknameInput aria-label="닉네임" />);

  const input = screen.getByRole("textbox", { name: "닉네임" });
  await user.type(input, "당근");

  expect(input).toHaveValue("당근");
});

test("타이핑하면 onChange가 호출된다", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  render(<NicknameInput aria-label="닉네임" onChange={handleChange} />);

  await user.type(screen.getByRole("textbox", { name: "닉네임" }), "abc");

  expect(handleChange).toHaveBeenCalledTimes(3);
});

test("disabled이면 타이핑할 수 없고 onChange도 호출되지 않는다", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  render(<CourseFeedbackInput aria-label="의견" disabled onChange={handleChange} />);

  const input = screen.getByRole("textbox", { name: "의견" });
  await user.type(input, "좋아요");

  expect(input).toBeDisabled();
  expect(input).toHaveValue("");
  expect(handleChange).not.toHaveBeenCalled();
});

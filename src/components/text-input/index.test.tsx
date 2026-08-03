import { useState } from "react";
import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import { CharCounter, CourseFeedbackInput, NicknameInput, TextInput } from "./index";

test("NicknameInput은 닉네임 placeholder를 가진 textbox를 렌더링한다", async () => {
  render(<NicknameInput />);

  await expect
    .element(page.getByRole("textbox"))
    .toHaveAttribute("placeholder", "닉네임을 입력해주세요");
  await expect.element(page.getByPlaceholder("닉네임을 입력해주세요")).toBeInTheDocument();
});

test("CourseFeedbackInput은 의견 placeholder를 가진 textbox를 렌더링한다", async () => {
  render(<CourseFeedbackInput />);

  await expect
    .element(page.getByRole("textbox"))
    .toHaveAttribute("placeholder", "코스에 대한 의견을 남겨주세요");
  await expect.element(page.getByPlaceholder("코스에 대한 의견을 남겨주세요")).toBeInTheDocument();
});

test("aria-label을 넘기면 accessible name으로 textbox를 조회할 수 있다", async () => {
  render(<NicknameInput aria-label="닉네임" />);

  await expect
    .element(page.getByRole("textbox", { name: "닉네임" }))
    .toHaveAttribute("placeholder", "닉네임을 입력해주세요");
});

test("[접근성 이슈] 연결된 label이 없어 accessible name이 placeholder 폴백에 의존한다", async () => {
  render(<NicknameInput />);

  // 연결된 <label>도 aria-label도 없다. 브라우저는 placeholder를 accessible name 폴백으로 사용하지만
  // placeholder는 label의 대체재가 아니다: 스크린리더 지원이 일관되지 않고 입력 시작 시 시각적으로 사라진다.
  await expect.element(page.getByLabelText("닉네임을 입력해주세요")).not.toBeInTheDocument();
  await expect.element(page.getByRole("textbox")).toHaveAccessibleName("닉네임을 입력해주세요");
});

test("endAdornment로 전달한 내용을 렌더링한다", async () => {
  render(<TextInput aria-label="검색" endAdornment={<span>초기화</span>} />);

  await expect.element(page.getByText("초기화")).toBeInTheDocument();
});

test("endAdornment가 없으면 adornment 슬롯을 렌더링하지 않는다", async () => {
  render(<TextInput aria-label="검색" />);

  await expect.element(page.getByRole("textbox", { name: "검색" })).toBeInTheDocument();
  await expect.element(page.getByText("초기화")).not.toBeInTheDocument();
});

test("CharCounter는 현재 길이와 최대 길이를 x/y 형태로 표시한다", async () => {
  render(<CharCounter maxLength={10} value="" />);

  await expect.element(page.getByText("0/10")).toBeInTheDocument();
});

test("CharCounter를 endAdornment로 넘기면 입력 길이를 표시한다", async () => {
  render(
    <TextInput aria-label="닉네임" endAdornment={<CharCounter maxLength={10} value="hi" />} />,
  );

  await expect.element(page.getByText("2/10")).toBeInTheDocument();
});

function NicknameFieldWithCounter() {
  const [value, setValue] = useState("");

  return (
    <NicknameInput
      aria-label="닉네임"
      endAdornment={<CharCounter maxLength={10} value={value} />}
      maxLength={10}
      onChange={(event) => setValue(event.target.value)}
      value={value}
    />
  );
}

test("입력하면 CharCounter의 현재 길이가 갱신된다", async () => {
  render(<NicknameFieldWithCounter />);

  await expect.element(page.getByText("0/10")).toBeInTheDocument();

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "당근마켓");

  await expect.element(page.getByText("4/10")).toBeInTheDocument();
  await expect.element(page.getByText("0/10")).not.toBeInTheDocument();
});

test("사용자가 타이핑하면 입력값이 반영된다", async () => {
  render(<NicknameInput aria-label="닉네임" />);

  const input = page.getByRole("textbox", { name: "닉네임" });
  await userEvent.type(input, "당근");

  await expect.element(input).toHaveValue("당근");
});

test("타이핑하면 onChange가 호출된다", async () => {
  const handleChange = vi.fn();
  render(<NicknameInput aria-label="닉네임" onChange={handleChange} />);

  await userEvent.type(page.getByRole("textbox", { name: "닉네임" }), "abc");

  expect(handleChange).toHaveBeenCalledTimes(3);
});

test("disabled이면 타이핑할 수 없고 onChange도 호출되지 않는다", async () => {
  const handleChange = vi.fn();
  render(<CourseFeedbackInput aria-label="의견" disabled onChange={handleChange} />);

  const input = page.getByRole("textbox", { name: "의견" });
  await expect.element(input).toBeDisabled();

  // disabled 입력은 포커스를 받을 수 없으므로 키 입력이 값에 반영되지 않는다.
  await userEvent.keyboard("좋아요");

  await expect.element(input).toHaveValue("");
  expect(handleChange).not.toHaveBeenCalled();
});

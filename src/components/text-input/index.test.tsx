import { useState } from "react";
import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../test-utils";
import {
  CharCounter,
  CourseFeedbackInput,
  NicknameInput,
  PlaceSearchInput,
  TextInput,
} from "./index";

test("NicknameInput은 닉네임 textbox를 렌더링한다", async () => {
  render(<NicknameInput />);

  await expect
    .element(page.getByRole("textbox", { name: "닉네임" }))
    .toHaveAttribute("placeholder", "닉네임을 입력해주세요");
});

test("CourseFeedbackInput은 코스 의견 textbox를 렌더링한다", async () => {
  render(<CourseFeedbackInput />);

  await expect
    .element(page.getByRole("textbox", { name: "코스 의견" }))
    .toHaveAttribute("placeholder", "코스에 대한 의견을 남겨주세요!");
});

test("aria-label을 넘기면 기본 이름을 덮어쓴다", async () => {
  render(<NicknameInput aria-label="별명" />);

  await expect.element(page.getByRole("textbox", { name: "별명" })).toBeInTheDocument();
});

test("endAdornment로 전달한 내용을 렌더링한다", async () => {
  render(<TextInput aria-label="검색" endAdornment={<span>초기화</span>} />);

  await expect.element(page.getByText("초기화")).toBeInTheDocument();
});

test("endAdornment가 없으면 adornment 슬롯을 렌더링하지 않는다", async () => {
  render(<TextInput aria-label="검색" />);

  await expect.element(page.getByText("초기화")).not.toBeInTheDocument();
});

function NicknameFieldWithCounter() {
  const [value, setValue] = useState("");

  return (
    <NicknameInput
      endAdornment={<CharCounter maxLength={10} value={value} />}
      maxLength={10}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

test("입력하면 CharCounter의 현재 길이가 갱신된다", async () => {
  render(<NicknameFieldWithCounter />);

  await expect.element(page.getByText("0/10")).toBeInTheDocument();

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "당근마켓");

  await expect.element(page.getByText("4/10")).toBeInTheDocument();
});

test("타이핑하면 입력값이 반영되고 onChange가 호출된다", async () => {
  const handleChange = vi.fn();
  render(<NicknameInput onChange={handleChange} />);

  const input = page.getByRole("textbox", { name: "닉네임" });
  await userEvent.type(input, "당근");

  await expect.element(input).toHaveValue("당근");
  expect(handleChange).toHaveBeenCalledTimes(2);
});

test("disabled이면 입력할 수 없다", async () => {
  const handleChange = vi.fn();
  render(<CourseFeedbackInput disabled onChange={handleChange} />);

  const input = page.getByRole("textbox", { name: "코스 의견" });
  await expect.element(input).toBeDisabled();

  await userEvent.keyboard("좋아요");

  await expect.element(input).toHaveValue("");
  expect(handleChange).not.toHaveBeenCalled();
});

test("PlaceSearchInput은 검색 아이콘과 함께 렌더링된다", async () => {
  render(<PlaceSearchInput />);

  await expect
    .element(page.getByRole("textbox", { name: "장소 검색" }))
    .toHaveAttribute("placeholder", "장소를 검색하세요");
});

test("filled면 배경색이 진해진다", async () => {
  render(<NicknameInput filled />);

  const input = page.getByRole("textbox", { name: "닉네임" });
  await expect.element(input).toBeInTheDocument();
  const box = input.element().closest("span");

  expect(box && getComputedStyle(box).backgroundColor).toBe("rgb(218, 225, 236)");
});

import { expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { CourseFeedbackInput, NicknameInput, PlaceSearchInput, TextInput } from "./index";

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

test("endIcon으로 전달한 내용을 렌더링한다", async () => {
  render(<TextInput aria-label="검색" endIcon={<span>초기화</span>} />);

  await expect.element(page.getByText("초기화")).toBeInTheDocument();
});

test("endIcon이 없으면 아이콘 슬롯을 렌더링하지 않는다", async () => {
  render(<TextInput aria-label="검색" />);

  await expect.element(page.getByText("초기화")).not.toBeInTheDocument();
});

test("showCount를 주면 입력에 따라 글자 수가 갱신된다", async () => {
  render(<NicknameInput maxLength={10} showCount />);

  await expect.element(page.getByText("0/10")).toBeInTheDocument();

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "강남역");

  await expect.element(page.getByText("3/10")).toBeInTheDocument();
});

test("showCount가 없으면 글자 수를 보여주지 않는다", async () => {
  render(<NicknameInput maxLength={10} />);

  await expect.element(page.getByRole("textbox", { name: "닉네임" })).toBeInTheDocument();
  await expect.element(page.getByText("0/10")).not.toBeInTheDocument();
});

test("maxLength가 없으면 현재 글자 수만 보여준다", async () => {
  render(<NicknameInput showCount />);

  await userEvent.fill(page.getByRole("textbox", { name: "닉네임" }), "강남역");

  await expect.element(page.getByText("3")).toBeInTheDocument();
});

test("타이핑하면 입력값이 반영되고 onChange가 호출된다", async () => {
  const handleChange = vi.fn();
  render(<NicknameInput onChange={handleChange} />);

  const input = page.getByRole("textbox", { name: "닉네임" });
  await userEvent.type(input, "강남역");

  await expect.element(input).toHaveValue("강남역");
  expect(handleChange).toHaveBeenCalledTimes(3);
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

test("onSend를 전달하면 보내기 버튼이 렌더링되고 클릭 시 호출된다", async () => {
  const onSend = vi.fn();
  render(<CourseFeedbackInput onSend={onSend} />);

  const button = page.getByRole("button", { name: "의견 보내기" });
  await expect.element(button).toBeInTheDocument();
  await userEvent.click(button);

  expect(onSend).toHaveBeenCalledOnce();
});

test("onSend가 없으면 보내기 버튼을 렌더링하지 않는다", async () => {
  render(<CourseFeedbackInput />);

  await expect.element(page.getByRole("textbox", { name: "코스 의견" })).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "의견 보내기" })).not.toBeInTheDocument();
});

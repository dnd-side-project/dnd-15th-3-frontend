import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { CharCounter, CourseFeedbackInput, NicknameInput, TextInput } from "./index";

test("기본 shape은 rounded이며 placeholder를 렌더링한다", () => {
  const html = renderToStaticMarkup(<TextInput placeholder="닉네임을 입력해주세요" />);
  expect(html).toContain("닉네임을 입력해주세요");
});

test("endAdornment로 전달한 내용을 렌더링한다", () => {
  const html = renderToStaticMarkup(
    <TextInput placeholder="검색" endAdornment={<span data-testid="adornment">🔍</span>} />,
  );
  expect(html).toContain("adornment");
  expect(html).toContain("🔍");
});

test("CharCounter는 value/maxLength를 x/y 형태로 렌더링한다", () => {
  const html = renderToStaticMarkup(<CharCounter value="hi" maxLength={10} />);
  expect(html).toContain("2/10");
});

test("NicknameInput 프리셋은 rounded shape과 닉네임 placeholder를 사용한다", () => {
  const html = renderToStaticMarkup(<NicknameInput />);
  expect(html).toContain("닉네임을 입력해주세요");
});

test("CourseFeedbackInput 프리셋은 pill shape과 의견 placeholder를 사용한다", () => {
  const html = renderToStaticMarkup(<CourseFeedbackInput />);
  expect(html).toContain("코스에 대한 의견을 남겨주세요");
});

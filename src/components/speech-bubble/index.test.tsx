import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { SpeechBubble } from "./index";

test("children 텍스트를 렌더링한다", async () => {
  render(<SpeechBubble>코스 불러오는 중</SpeechBubble>);

  await expect.element(page.getByText("코스 불러오는 중")).toBeInTheDocument();
});

test("icon prop을 전달하면 함께 렌더링한다", async () => {
  render(
    <SpeechBubble icon={<span aria-label="로딩" role="img" />}>코스 불러오는 중</SpeechBubble>,
  );

  await expect.element(page.getByRole("img", { name: "로딩" })).toBeInTheDocument();
  await expect.element(page.getByText("코스 불러오는 중")).toBeInTheDocument();
});

test("icon prop이 없으면 아이콘을 렌더링하지 않는다", async () => {
  render(<SpeechBubble>코스 불러오는 중</SpeechBubble>);

  await expect.element(page.getByText("코스 불러오는 중")).toBeInTheDocument();
  await expect.element(page.getByRole("img")).not.toBeInTheDocument();
});

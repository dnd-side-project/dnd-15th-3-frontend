import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vite-plus/test";

import type { ShareLinkParams } from "../../hooks/use-kakao-share";
import { ShareButtonGroup } from "./index";

const shareLink = vi.fn<(params: ShareLinkParams) => void>();
const kakaoShare: { loading: boolean; error: Error | null } = { loading: false, error: null };

vi.mock("../../hooks/use-kakao-share", () => ({
  useKakaoShare: () => ({ loading: kakaoShare.loading, error: kakaoShare.error, shareLink }),
}));

const PARAMS = {
  title: "모임 코스 완성!",
  description: "친구들과 함께 만든 코스를 확인해보세요",
  imageUrl: "/vite.svg",
  link: "https://example.com/course/1",
} satisfies ShareLinkParams;

beforeEach(() => {
  shareLink.mockClear();
  kakaoShare.loading = false;
  kakaoShare.error = null;
});

test("링크 복사 버튼과 카카오톡 공유 버튼을 접근 가능한 이름으로 렌더링한다", () => {
  render(<ShareButtonGroup {...PARAMS} />);

  expect(screen.getByRole("button", { name: "링크 복사" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "카카오톡으로 공유" })).toBeInTheDocument();
});

test("두 공유 버튼 모두 button 엘리먼트로 렌더링된다", () => {
  render(<ShareButtonGroup {...PARAMS} />);

  expect(screen.getByRole("button", { name: "링크 복사" }).tagName).toBe("BUTTON");
  expect(screen.getByRole("button", { name: "카카오톡으로 공유" }).tagName).toBe("BUTTON");
});

test("링크 복사 버튼을 클릭하면 클립보드에 링크가 복사되고 onCopyLink 콜백이 호출된다", async () => {
  const user = userEvent.setup();
  const onCopyLink = vi.fn();
  render(<ShareButtonGroup {...PARAMS} onCopyLink={onCopyLink} />);

  await user.click(screen.getByRole("button", { name: "링크 복사" }));

  await expect(navigator.clipboard.readText()).resolves.toBe(PARAMS.link);
  expect(onCopyLink).toHaveBeenCalledTimes(1);
});

test("카카오톡 공유 버튼을 클릭하면 전달된 params로 shareLink를 호출한다", async () => {
  const user = userEvent.setup();
  render(<ShareButtonGroup {...PARAMS} />);

  await user.click(screen.getByRole("button", { name: "카카오톡으로 공유" }));

  expect(shareLink).toHaveBeenCalledTimes(1);
  expect(shareLink).toHaveBeenCalledWith(PARAMS);
});

test("SDK 로딩 중에는 카카오톡 공유 버튼이 비활성화된다", () => {
  kakaoShare.loading = true;
  render(<ShareButtonGroup {...PARAMS} />);

  expect(screen.getByRole("button", { name: "카카오톡으로 공유" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "링크 복사" })).toBeEnabled();
});

test("SDK 로딩이 끝나면 카카오톡 공유 버튼이 활성화되고 에러 메시지는 보이지 않는다", () => {
  render(<ShareButtonGroup {...PARAMS} />);

  expect(screen.getByRole("button", { name: "카카오톡으로 공유" })).toBeEnabled();
  expect(screen.queryByText(/실패|환경변수/)).not.toBeInTheDocument();
});

test("SDK 로드에 실패하면 에러 메시지를 화면에 보여준다", () => {
  kakaoShare.error = new Error("Kakao SDK 스크립트 로드에 실패했습니다.");
  render(<ShareButtonGroup {...PARAMS} />);

  expect(screen.getByText("Kakao SDK 스크립트 로드에 실패했습니다.")).toBeInTheDocument();
});

import { beforeEach, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import type { ShareLinkParams } from "../../hooks/use-kakao-share";
import { render } from "../../test-utils";
import { ShareButtonGroup } from "./index";

const shareLink = vi.fn<(params: ShareLinkParams) => void>();
const kakaoShare: { loading: boolean; error: Error | null } = { loading: false, error: null };

vi.mock("../../hooks/use-kakao-share", () => ({
  useKakaoShare: () => ({ loading: kakaoShare.loading, error: kakaoShare.error, shareLink }),
}));

const writeText = vi.fn<(text: string) => Promise<void>>(() => Promise.resolve());

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: { writeText },
});

const PARAMS = {
  title: "모임 코스 완성!",
  description: "친구들과 함께 만든 코스를 확인해보세요",
  imageUrl: "/vite.svg",
  link: "https://example.com/course/1",
} satisfies ShareLinkParams;

const copyButton = () => page.getByRole("button", { name: "링크 복사" });
const kakaoButton = () => page.getByRole("button", { name: "카카오톡으로 공유" });

beforeEach(() => {
  shareLink.mockClear();
  writeText.mockClear();
  kakaoShare.loading = false;
  kakaoShare.error = null;
});

test("링크 복사 버튼과 카카오톡 공유 버튼을 렌더링한다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(copyButton()).toBeEnabled();
  await expect.element(kakaoButton()).toBeEnabled();
});

test("링크 복사 버튼을 클릭하면 클립보드에 링크가 복사되고 onCopyLink가 호출된다", async () => {
  const onCopyLink = vi.fn();
  render(<ShareButtonGroup {...PARAMS} onCopyLink={onCopyLink} />);

  await expect.element(copyButton()).toBeInTheDocument();
  await userEvent.click(copyButton());

  await vi.waitFor(() => {
    expect(writeText).toHaveBeenCalledWith(PARAMS.link);
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });
});

test("카카오톡 공유 버튼을 클릭하면 전달된 params로 shareLink를 호출한다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeInTheDocument();
  await userEvent.click(kakaoButton());

  await vi.waitFor(() => {
    expect(shareLink).toHaveBeenCalledWith(PARAMS);
  });
});

test("SDK 로딩 중에는 카카오톡 공유 버튼이 비활성화된다", async () => {
  kakaoShare.loading = true;
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeDisabled();
  await expect.element(copyButton()).toBeEnabled();
});

test("SDK 로드에 실패하면 카카오톡 공유 버튼이 비활성화된다", async () => {
  kakaoShare.error = new Error("Kakao SDK 스크립트 로드에 실패했습니다.");
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeDisabled();
  await expect.element(copyButton()).toBeEnabled();
});

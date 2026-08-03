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

// 헤드리스 브라우저에서는 권한 문제로 실제 navigator.clipboard 가 실패할 수 있어
// 결정적인 스텁으로 교체한다.
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

test("링크 복사 버튼과 카카오톡 공유 버튼을 접근 가능한 이름으로 렌더링한다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(copyButton()).toBeInTheDocument();
  await expect.element(kakaoButton()).toBeInTheDocument();
});

test("두 공유 버튼 모두 button 엘리먼트로 렌더링된다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(copyButton()).toBeInTheDocument();
  await expect.element(kakaoButton()).toBeInTheDocument();

  expect(copyButton().element().tagName).toBe("BUTTON");
  expect(kakaoButton().element().tagName).toBe("BUTTON");
});

test("링크 복사 버튼을 클릭하면 클립보드에 링크가 복사되고 onCopyLink 콜백이 호출된다", async () => {
  const onCopyLink = vi.fn();
  render(<ShareButtonGroup {...PARAMS} onCopyLink={onCopyLink} />);

  await expect.element(copyButton()).toBeInTheDocument();
  await userEvent.click(copyButton());

  await vi.waitFor(() => {
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith(PARAMS.link);
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });
});

test("카카오톡 공유 버튼을 클릭하면 전달된 params로 shareLink를 호출한다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeInTheDocument();
  await userEvent.click(kakaoButton());

  await vi.waitFor(() => {
    expect(shareLink).toHaveBeenCalledTimes(1);
    expect(shareLink).toHaveBeenCalledWith(PARAMS);
  });
});

test("SDK 로딩 중에는 카카오톡 공유 버튼이 비활성화된다", async () => {
  kakaoShare.loading = true;
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeDisabled();
  await expect.element(copyButton()).toBeEnabled();
});

test("SDK 로딩이 끝나면 카카오톡 공유 버튼이 활성화되고 에러 메시지는 보이지 않는다", async () => {
  render(<ShareButtonGroup {...PARAMS} />);

  await expect.element(kakaoButton()).toBeEnabled();
  await expect.element(page.getByText(/실패|환경변수/)).not.toBeInTheDocument();
});

test("SDK 로드에 실패하면 에러 메시지를 화면에 보여준다", async () => {
  kakaoShare.error = new Error("Kakao SDK 스크립트 로드에 실패했습니다.");
  render(<ShareButtonGroup {...PARAMS} />);

  await expect
    .element(page.getByText("Kakao SDK 스크립트 로드에 실패했습니다."))
    .toBeInTheDocument();
});

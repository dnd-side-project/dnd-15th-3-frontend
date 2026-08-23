import { FormProvider, useForm } from "react-hook-form";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { ToastProvider } from "@/components/toast";
import type { JoinDraft } from "@/domains/join/types/draft";
import { render } from "@/test-utils";

import { JoinCodePage } from "./index";

function mockClipboard(text: string) {
  Object.defineProperty(navigator, "clipboard", {
    value: { readText: () => Promise.resolve(text) },
    configurable: true,
    writable: true,
  });
}

function renderCodePage(initialEntry = "/join/code") {
  const router = createMemoryRouter(
    [
      { path: "/", element: <div data-testid="home" /> },
      { path: "/join/code", Component: JoinCodePageWrapper },
      { path: "/join/complete", element: <div data-testid="complete" /> },
    ],
    { initialEntries: ["/", initialEntry], initialIndex: 1 },
  );
  render(
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>,
  );
  return router;
}

function JoinCodePageWrapper() {
  const methods = useForm<JoinDraft>({
    defaultValues: {
      nickname: "",
      profileAvatarId: "momo-blue",
      invitationCode: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <JoinCodePage />
    </FormProvider>
  );
}

function firstOtpSlot() {
  return page.getByRole("textbox").first();
}

test("간편 붙여넣기 클릭 시 6자리 영숫자 코드가 입력되고 다음 버튼이 활성화된다", async () => {
  mockClipboard("ABC123");
  renderCodePage();

  await userEvent.click(page.getByRole("button", { name: "간편 붙여넣기" }));

  await expect.element(firstOtpSlot()).toHaveValue("A");
  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("간편 붙여넣기 클릭 시 클립보드가 비어 있으면 안내 토스트를 띄운다", async () => {
  mockClipboard("");
  renderCodePage();

  await userEvent.click(page.getByRole("button", { name: "간편 붙여넣기" }));

  await expect.element(page.getByText("붙여놓을 초대코드가 없습니다.")).toBeInTheDocument();
});

test("비 영숫자를 붙여넣은 뒤 다음 버튼을 누르면 유효하지 않다는 토스트를 띄운다", async () => {
  mockClipboard("!@#$%^");
  renderCodePage();

  await userEvent.click(page.getByRole("button", { name: "간편 붙여넣기" }));

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
  await userEvent.click(page.getByRole("button", { name: "다음" }));

  await expect.element(page.getByText("유효하지 않은 초대코드입니다.")).toBeInTheDocument();
});

test("6자리 영숫자를 타이핑하면 다음 버튼이 활성화된다", async () => {
  renderCodePage();

  await userEvent.type(firstOtpSlot(), "ABC123");

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

test("비 영숫자를 타이핑하면 입력이 거부되어 다음 버튼이 비활성화 상태다", async () => {
  renderCodePage();

  await userEvent.type(firstOtpSlot(), "!@#$%^&*");

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("초대 링크로 들어오면 코드를 채우고 참여 확인 화면으로 넘어간다", async () => {
  renderCodePage("/join/code?code=ABC123");

  await expect.element(firstOtpSlot()).toHaveValue("A");
  await expect.element(page.getByTestId("complete")).toBeInTheDocument();
});

test("초대 링크로 넘어간 뒤 뒤로 오면 코드 입력 화면을 다시 거치지 않는다", async () => {
  const router = renderCodePage("/join/code?code=ABC123");

  await expect.element(page.getByTestId("complete")).toBeInTheDocument();
  await router.navigate(-1);

  await expect.element(page.getByTestId("home")).toBeInTheDocument();
});

test("초대 링크의 코드가 6자리 영숫자가 아니면 직접 입력받는다", async () => {
  renderCodePage("/join/code?code=ABC");

  await expect.element(firstOtpSlot()).toHaveValue("");
  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

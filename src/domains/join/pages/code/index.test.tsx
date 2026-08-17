import { FormProvider, useForm } from "react-hook-form";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import type { JoinDraft } from "../../types/draft";
import { JoinCodePage } from "./index";

function mockClipboard(text: string) {
  Object.defineProperty(navigator, "clipboard", {
    value: { readText: () => Promise.resolve(text) },
    configurable: true,
    writable: true,
  });
}

function renderCodePage() {
  const router = createMemoryRouter([
    { path: "/", Component: JoinCodePageWrapper },
    { path: "/join/complete", element: <div data-testid="complete" /> },
  ]);
  render(<RouterProvider router={router} />);
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

  await expect.element(page.getByRole("status")).toHaveTextContent("붙여놓을 초대코드가 없습니다.");
});

test("비 영숫자를 붙여넣은 뒤 다음 버튼을 누르면 유효하지 않다는 토스트를 띄운다", async () => {
  mockClipboard("!@#$%^");
  renderCodePage();

  await userEvent.click(page.getByRole("button", { name: "간편 붙여넣기" }));

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
  await userEvent.click(page.getByRole("button", { name: "다음" }));

  await expect.element(page.getByRole("status")).toHaveTextContent("유효하지 않은 초대코드입니다.");
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

import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { useToast } from "../../hooks/use-toast";
import { render } from "../../test-utils";
import { Toast } from "./index";

function Playground() {
  const { toast, show } = useToast();

  return (
    <>
      <Toast toast={toast} />
      <button type="button" onClick={() => show("초대 코드가 복사되었습니다.")}>
        띄우기
      </button>
    </>
  );
}

test("문구가 없으면 아무것도 그리지 않는다", async () => {
  render(<Toast toast={null} />);

  await expect.element(page.getByRole("status")).not.toBeInTheDocument();
});

test("문구를 상태 알림으로 보여준다", async () => {
  render(<Toast toast={{ message: "링크가 복사되었습니다.", visible: true }} />);

  await expect.element(page.getByRole("status")).toHaveTextContent("링크가 복사되었습니다.");
});

test("띄우면 나타났다가 스스로 사라진다", async () => {
  render(<Playground />);

  await userEvent.click(page.getByRole("button", { name: "띄우기" }));

  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).toBeInTheDocument();
  await expect.element(page.getByText("초대 코드가 복사되었습니다.")).not.toBeInTheDocument();
});

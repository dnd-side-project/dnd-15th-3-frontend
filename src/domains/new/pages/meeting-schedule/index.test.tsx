import { useFormContext, useWatch } from "react-hook-form";
import { createMemoryRouter, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import type { MeetingDraft } from "../../draft";
import { formLayout } from "../../test-utils";
import { MeetingSchedulePage } from "./index";

// 폼에 담긴 값을 화면으로 꺼내 확인한다.
function DateProbe() {
  const { control } = useFormContext<MeetingDraft>();
  const date = useWatch({ control, name: "date" });
  return <p>저장된 날짜 {date}</p>;
}

function renderMeetingSchedule() {
  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: formLayout({}),
        children: [
          {
            path: "meeting-schedule",
            Component: () => (
              <>
                <MeetingSchedulePage />
                <DateProbe />
              </>
            ),
          },
          { path: "complete", Component: () => <p>모임 방이 만들어졌어요</p> },
        ],
      },
    ],
    { initialEntries: ["/new/meeting-schedule"] },
  );

  render(<RouterProvider router={router} />);
}

test("날짜와 시간을 모두 정해야 다음으로 넘어갈 수 있다", async () => {
  renderMeetingSchedule();

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.click(page.getByRole("button", { name: /YY.MM.DD/ }));
  await userEvent.click(page.getByRole("button", { name: "15" }));
  await userEvent.click(page.getByRole("button", { name: "확인" }));

  await expect.element(page.getByText(/^저장된 날짜 \d{4}-\d{2}-15$/)).toBeInTheDocument();
  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();

  await userEvent.click(page.getByRole("button", { name: /--/ }));
  await userEvent.click(page.getByRole("button", { name: "확인" }));

  await expect.element(page.getByRole("button", { name: "다음" })).toBeEnabled();
});

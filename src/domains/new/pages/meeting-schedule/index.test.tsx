import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { render } from "../../../../test-utils";
import { EMPTY_DRAFT, type MeetingDraft } from "../../draft";

// 폼에 담긴 값을 화면으로 꺼내 확인한다.
function DateProbe() {
  const { control } = useFormContext<MeetingDraft>();
  const date = useWatch({ control, name: "date" });
  return <p>저장된 날짜 {date}</p>;
}

// 이 화면만 검증하므로 앞 단계를 채운 폼을 바로 깐다.
function FilledFormLayout() {
  const methods = useForm<MeetingDraft>({ defaultValues: EMPTY_DRAFT });
  return (
    <FormProvider {...methods}>
      <Outlet />
      <DateProbe />
    </FormProvider>
  );
}
import { MeetingSchedulePage } from "./index";

function renderMeetingSchedule() {
  const router = createMemoryRouter(
    [
      {
        path: "/new",
        Component: FilledFormLayout,
        children: [
          { path: "meeting-schedule", Component: MeetingSchedulePage },
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

  await expect.element(page.getByRole("button", { name: "다음" })).toBeDisabled();
});

test("고른 날짜를 YYYY-MM-DD 로 저장한다", async () => {
  renderMeetingSchedule();

  await userEvent.click(page.getByRole("button", { name: /YY.MM.DD/ }));
  await userEvent.click(page.getByRole("button", { name: "15" }));
  await userEvent.click(page.getByRole("button", { name: "확인" }));

  await expect.element(page.getByText(/^저장된 날짜 \d{4}-\d{2}-15$/)).toBeInTheDocument();
});

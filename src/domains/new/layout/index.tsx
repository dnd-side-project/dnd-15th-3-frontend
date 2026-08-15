import { FormProvider, useForm } from "react-hook-form";
import { Navigate, Outlet, useLocation } from "react-router";

import { EMPTY_DRAFT, FIRST_STEP, STEP_REQUIRES, type MeetingDraft } from "../constants";

export function NewMeetingLayout() {
  const methods = useForm<MeetingDraft>({ defaultValues: EMPTY_DRAFT });
  const { pathname, search } = useLocation();

  // 모임을 만든 뒤에는 초대 코드가 붙어 있어 폼 없이도 완료 화면을 볼 수 있다.
  const created = new URLSearchParams(search).has("code");
  const requires = STEP_REQUIRES[pathname];

  if (requires !== undefined && !created && !requires(methods.getValues())) {
    return <Navigate replace to={FIRST_STEP} />;
  }

  return (
    <FormProvider {...methods}>
      <Outlet />
    </FormProvider>
  );
}

import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router";

import { EMPTY_DRAFT, type MeetingDraft } from "./constants";

/** 한 화면만 검증할 수 있도록 앞 단계가 채워진 폼을 깔아 주는 레이아웃. */
export function formLayout(values: Partial<MeetingDraft>) {
  return function FormLayout() {
    const methods = useForm<MeetingDraft>({ defaultValues: { ...EMPTY_DRAFT, ...values } });
    return (
      <FormProvider {...methods}>
        <Outlet />
      </FormProvider>
    );
  };
}

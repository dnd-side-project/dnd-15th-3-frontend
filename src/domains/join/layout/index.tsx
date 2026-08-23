import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router";

import { Layout } from "@/components/layout";
import { type JoinDraft } from "@/domains/join/types/draft";

export function JoinLayout() {
  const methods = useForm<JoinDraft>({
    defaultValues: {
      nickname: "",
      profileAvatarId: "momo-blue",
      invitationCode: "",
    },
  });
  return (
    <Layout>
      <FormProvider {...methods}>
        <Outlet />
      </FormProvider>
    </Layout>
  );
}

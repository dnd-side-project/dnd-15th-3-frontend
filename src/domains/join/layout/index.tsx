import { Outlet } from "react-router";

import { Layout } from "../../../components/layout";

export function JoinLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

import type { Decorator } from "@storybook/react-vite";

import { Layout } from "./index";

// 스토리를 앱 프레임(Layout) 안에서 렌더링하는 데코레이터
export const withLayout: Decorator = (Story) => (
  <Layout>
    <Story />
  </Layout>
);

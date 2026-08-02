import type { Decorator } from "@storybook/react-vite";

import { Layout } from "./index";

/**
 * 스토리를 앱 프레임(모바일 393px 폭 + 레터박스 배경) 안에서 렌더링하는 데코레이터.
 *
 * 사용법:
 *   import { withLayout } from "../layout/index.decorators";
 *
 *   const meta = {
 *     component: Foo,
 *     decorators: [withLayout],
 *     parameters: { layout: "fullscreen" }, // 레터박스가 캔버스를 꽉 채우도록
 *   } satisfies Meta<typeof Foo>;
 */
export const withLayout: Decorator = (Story) => (
  <Layout>
    <Story />
  </Layout>
);

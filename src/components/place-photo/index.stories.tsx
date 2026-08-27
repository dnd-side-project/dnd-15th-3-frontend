import type { Meta, StoryObj } from "@storybook/react-vite";

import { withLayout } from "@/components/layout/index.decorators";
import { CATEGORY_SLUGS } from "@/domains/catalog/api/types";

import { PlacePhotoImage } from "./index";

import { thumbnail } from "@/domains/meeting/pages/[id]/place/index.css";

const meta = {
  component: PlacePhotoImage,
  title: "components/PlacePhotoImage",
  decorators: [withLayout],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    category: "cafe",
    className: thumbnail,
    photo: null,
  },
} satisfies Meta<typeof PlacePhotoImage>;

type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <PlacePhotoImage {...args} />
    </div>
  ),
};

// 카테고리 8종 대체 이미지를 검색 결과 썸네일 크기로 한 번에 보여주는 쇼케이스라 컨트롤을 끈다
export const CategoryFallback: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", padding: "20px" }}>
      {CATEGORY_SLUGS.map((category) => (
        <PlacePhotoImage category={category} className={thumbnail} key={category} photo={null} />
      ))}
    </div>
  ),
};

export default meta;

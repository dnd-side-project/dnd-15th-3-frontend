import { type Meta, type StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Dropdown, Item, createHandle, Trigger } from ".";
import { withLayout } from "../layout/index.decorators";

const meta = {
  component: Dropdown,
  title: "components/Dropdown",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withLayout],
} satisfies Meta<typeof Dropdown>;

function SmallComponent() {
  const menu = createHandle();
  const [selectedId, setSelectedId] = useState(1);
  const items = [
    {
      id: 1,
      value: "추천순",
    },
    {
      id: 2,
      value: "등록순",
    },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 100 }}>
      <Trigger handle={menu}>{items.find(({ id }) => id === selectedId)?.value}</Trigger>
      <Dropdown handle={menu} size="sm">
        {items.map(({ id, value }) => (
          <Item selected={selectedId === id} key={id} onClick={() => setSelectedId(id)}>
            {value}
          </Item>
        ))}
      </Dropdown>
    </div>
  );
}
function MediumComponent() {
  const menu = createHandle();
  const [selectedId, setSelectedId] = useState(1);
  const items = [
    {
      id: 1,
      value: "친목",
    },
    {
      id: 2,
      value: "데이트",
    },
    {
      id: 3,
      value: "회식",
    },
    {
      id: 4,
      value: "가족",
    },
    {
      id: 5,
      value: "여행",
    },
    {
      id: 6,
      value: "스터디",
    },
    {
      id: 7,
      value: "비즈니스",
    },
    {
      id: 8,
      value: "취미",
    },
    {
      id: 9,
      value: "기타",
    },
  ];
  const sorted = [
    ...items.filter(({ id }) => id === selectedId),
    ...items.filter(({ id }) => id !== selectedId),
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 100 }}>
      <Trigger handle={menu}>{items.find(({ id }) => id === selectedId)?.value}</Trigger>
      <Dropdown handle={menu} size="md">
        {sorted.map(({ id, value }) => (
          <Item selected={selectedId === id} key={id} onClick={() => setSelectedId(id)}>
            {value}
          </Item>
        ))}
      </Dropdown>
    </div>
  );
}
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    children: null,
  },
  render: () => <SmallComponent />,
};
export const Medium: Story = {
  args: {
    children: null,
  },
  render: () => <MediumComponent />,
};
export default meta;

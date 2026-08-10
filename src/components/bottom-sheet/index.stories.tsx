import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { BottomSheet, WithBottomSheetContext } from "./index";

const meta = {
  component: BottomSheet,
  title: "components/BottomSheet",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    onClose: () => {},
    children: "바텀시트 콘텐츠",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "gray",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomSheet>;

type Story = StoryObj<typeof meta>;

export default meta;

function DefaultStory() {
  return (
    <BottomSheet isOpen onClose={() => {}} initialSnap={1} snapPoints={[0, 227, 1]} disableDismiss>
      <WithBottomSheetContext>
        {(context) => {
          return (
            <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 773 }}>
              <strong>모임 바텀시트</strong> <br /> 현재 snapPoint: {context.currentSnap}
            </div>
          );
        }}
      </WithBottomSheetContext>
    </BottomSheet>
  );
}

export const Default: Story = {
  render: () => <DefaultStory />,
};

function NoHeaderStory() {
  return (
    <BottomSheet
      isOpen
      onClose={() => {}}
      initialSnap={1}
      snapPoints={[0, 227, 1]}
      hasHeader={false}
      disableDismiss
    >
      <WithBottomSheetContext>
        {(context) => {
          return (
            <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 773 }}>
              <strong>모임 바텀시트</strong> <br /> 현재 snapPoint: {context.currentSnap}
            </div>
          );
        }}
      </WithBottomSheetContext>
    </BottomSheet>
  );
}

export const NoHeader: Story = {
  render: () => <NoHeaderStory />,
};
function ToggleStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>바텀시트 열기</button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onTapBackdrop={() => setIsOpen(false)}
        topBorderRadius="md"
      >
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 227 }}>
          <strong>모임생성 바텀시트</strong> <br />
          외부를 클릭하면 닫힙니다.
        </div>
      </BottomSheet>
    </div>
  );
}

export const Toggle: Story = {
  render: () => <ToggleStory />,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { withLayout } from "../layout/index.decorators";
import { BottomSheet, MultiViewBottomSheet, View, WithBottomSheetContext } from "./index";

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

function MultiViewStory() {
  const [snapIndex, setSnapIndex] = useState(1);

  return (
    <MultiViewBottomSheet
      isOpen
      onClose={() => {}}
      snapIndex={snapIndex}
      onSnapIndexChange={setSnapIndex}
      disableScrollLocking
      disableDismiss
      avoidKeyboard={false}
    >
      <View snapIndex={1} height={227}>
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif" }}>
          <strong>Snap Index {snapIndex}</strong>
          <br />
          height: 227
          <br />
          위로 스와이프하면 SnapIndex 2로 전환됩니다
          <input type="text" />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => setSnapIndex(2)}>View 2</button>
          </div>
        </div>
      </View>
      <View snapIndex={2} fullScreen hasHeader={false}>
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif" }}>
          <strong>Snap Index {snapIndex}</strong>
          <br />
          fullScreen
          <br />
          아래로 스와이프하면 SnapIndex 1로 돌아갑니다.
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button onClick={() => setSnapIndex(1)}>View 1</button>
          </div>
        </div>
      </View>
    </MultiViewBottomSheet>
  );
}

export const MultiView: Story = {
  render: () => <MultiViewStory />,
};

function NestedStory() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsFirstOpen(true)}>첫 번째 바텀시트 열기</button>

      <BottomSheet
        isOpen={isFirstOpen}
        onClose={() => setIsFirstOpen(false)}
        hasBackdrop
        onTapBackdrop={() => setIsFirstOpen(false)}
        topBorderRadius="md"
      >
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 227 }}>
          <strong>첫 번째 바텀시트</strong>
          <br />
          아래 버튼을 클릭하면 두 번째 바텀시트가 열립니다.
          <div style={{ marginTop: "16px" }}>
            <button onClick={() => setIsSecondOpen(true)}>두 번째 바텀시트 열기</button>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isSecondOpen}
        onClose={() => setIsSecondOpen(false)}
        hasBackdrop
        onTapBackdrop={() => setIsSecondOpen(false)}
        topBorderRadius="md"
      >
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 300 }}>
          <strong>두 번째 바텀시트 (중첩)</strong>
          <br />
          첫 번째 바텀시트 위에 겹쳐 표시됩니다.
          <br />
          backdrop을 클릭하면 닫힙니다.
        </div>
      </BottomSheet>
    </div>
  );
}

export const Nested: Story = {
  render: () => <NestedStory />,
  decorators: [withLayout],
};

function ShadowStory() {
  return (
    <BottomSheet
      isOpen
      onClose={() => {}}
      initialSnap={1}
      snapPoints={[0, 227, 1]}
      hasShadow
      disableDismiss
    >
      <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 227 }}>
        <strong>Shadow 바텀시트</strong>
        <br />
        dropshadow가 적용된 바텀시트입니다.
      </div>
    </BottomSheet>
  );
}

export const Shadow: Story = {
  render: () => <ShadowStory />,
  decorators: [withLayout],
};

function BackdropStory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>바텀시트 열기</button>
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialSnap={1}
        snapPoints={[0, 227, 1]}
        hasBackdrop
      >
        <div style={{ paddingInline: "20px", fontFamily: "sans-serif", height: 227 }}>
          <strong>Backdrop 바텀시트</strong>
          <br />
          backdrop이 있는 바텀시트입니다.
        </div>
      </BottomSheet>
    </div>
  );
}

export const Backdrop: Story = {
  render: () => <BackdropStory />,
  decorators: [withLayout],
};

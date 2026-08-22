import { MultiViewBottomSheet } from "../../../../components/bottom-sheet";
import { CtaButton } from "../../../../components/cta-button";
import { CourseFeedbackInput } from "../../../../components/text-input";

import { buttonRow, inputRow, sheetBody } from "./index.css";

export interface CourseRouteSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: () => void;
  selectDisabled?: boolean;
  onOpenComments: () => void;
}

export function CourseRouteSheet({
  isOpen,
  onClose,
  onSelectCourse,
  selectDisabled = false,
  onOpenComments,
}: CourseRouteSheetProps) {
  return (
    <MultiViewBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      hasBackdrop
      onTapBackdrop={onClose}
      topBorderRadius="md"
      views={[
        {
          snapIndex: 1,
          height: 123,
          children: (
            <div className={sheetBody}>
              <div className={inputRow}>
                <CourseFeedbackInput
                  readOnly
                  tabIndex={-1}
                  onClick={onOpenComments}
                  onSend={onOpenComments}
                />
              </div>
              <div className={buttonRow}>
                <CtaButton disabled={selectDisabled} onClick={onSelectCourse}>
                  해당 코스로 선택하기
                </CtaButton>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

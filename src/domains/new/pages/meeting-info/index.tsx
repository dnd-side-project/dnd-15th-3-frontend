import { useNavigate } from "react-router";

import { SectionIntro } from "../../../../components/section-intro";
import { TextInput } from "../../../../components/text-input";
import { useMeetingTypes } from "../../../catalog/hooks";
import { MEETING_TYPE_ICONS } from "../../../catalog/meeting-type-icons";
import { StepPage } from "../../components/step-page";
import { useMeetingDraft } from "../../draft";

import {
  intro,
  name,
  nameLabel,
  typeCard,
  typeIcon,
  typeLabel,
  types,
} from "./index.css";

const NAME_MAX_LENGTH = 10;

export function MeetingInfoPage() {
  const navigate = useNavigate();
  const { draft, patch } = useMeetingDraft();
  const meetingTypes = useMeetingTypes();

  return (
    <StepPage
      primaryDisabled={draft.name.length === 0 || draft.meetingTypeCode === null}
      title="모임생성"
      onPrimary={() => void navigate("/new/meeting-course")}
    >
      <div className={name}>
        <span className={nameLabel}>모임 이름을 작성해주세요</span>
        <TextInput
          showCount
          aria-label="모임 이름"
          maxLength={NAME_MAX_LENGTH}
          placeholder="모임이름을 입력해주세요"
          value={draft.name}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </div>

      <SectionIntro
        className={intro}
        description="모임을 가장 잘 나타내는 카테고리를 선택해주세요."
        title="어떤 모임인가요?"
      />

      <div className={types}>
        {meetingTypes.map((meetingType) => {
          const icon = MEETING_TYPE_ICONS[meetingType.code];
          const selected = draft.meetingTypeCode === meetingType.code;

          return (
            <button
              aria-pressed={selected}
              className={typeCard({ selected })}
              key={meetingType.code}
              type="button"
              onClick={() => patch({ meetingTypeCode: meetingType.code })}
            >
              <img
                alt=""
                className={typeIcon}
                height={icon.height}
                src={icon.src}
                width={icon.width}
              />
              <span className={typeLabel}>{meetingType.name}</span>
            </button>
          );
        })}
      </div>
    </StepPage>
  );
}

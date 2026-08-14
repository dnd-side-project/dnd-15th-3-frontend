import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";

import { SectionIntro } from "../../../../components/section-intro";
import { TextInput } from "../../../../components/text-input";
import type { MeetingTypeCode } from "../../../catalog/api/types";
import { useMeetingTypes } from "../../../catalog/hooks";
import { MEETING_TYPE_ICONS } from "../../../catalog/meeting-type-icons";
import { StepPage } from "../../components/step-page";
import type { MeetingDraft } from "../../constants";

import { intro, name, nameLabel, typeCard, typeIcon, typeLabel, types } from "./index.css";

const NAME_MAX_LENGTH = 10;

function MeetingTypeCard({
  code,
  label,
  selected,
  onSelect,
}: {
  code: MeetingTypeCode;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const icon = MEETING_TYPE_ICONS[code];

  return (
    <button
      aria-pressed={selected}
      className={typeCard({ selected })}
      type="button"
      onClick={onSelect}
    >
      <img alt="" className={typeIcon} height={icon.height} src={icon.src} width={icon.width} />
      <span className={typeLabel}>{label}</span>
    </button>
  );
}

export function MeetingInfoPage() {
  const navigate = useNavigate();
  const { control, register } = useFormContext<MeetingDraft>();
  const meetingTypes = useMeetingTypes();
  const [meetingName, meetingTypeCode] = useWatch({ control, name: ["name", "meetingTypeCode"] });

  return (
    <StepPage
      primaryDisabled={meetingName.length === 0 || meetingTypeCode === null}
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
          {...register("name", { required: true, maxLength: NAME_MAX_LENGTH })}
        />
      </div>

      <SectionIntro
        className={intro}
        description="모임을 가장 잘 나타내는 카테고리를 선택해주세요."
        title="어떤 모임인가요?"
      />

      <Controller
        control={control}
        name="meetingTypeCode"
        render={({ field }) => (
          <div className={types}>
            {meetingTypes.map((meetingType) => (
              <MeetingTypeCard
                code={meetingType.code}
                key={meetingType.code}
                label={meetingType.name}
                selected={field.value === meetingType.code}
                onSelect={() => field.onChange(meetingType.code)}
              />
            ))}
          </div>
        )}
        rules={{ required: true }}
      />
    </StepPage>
  );
}

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import ArrowUpRightIcon from "../../../../assets/icon-arrow-up-right.svg?react";
import CalendarIcon from "../../../../assets/icon-calendar.svg?react";
import CaretDownIcon from "../../../../assets/icon-caret-down.svg?react";
import CaretLeftIcon from "../../../../assets/icon-caret-left.svg?react";
import ClockIcon from "../../../../assets/icon-clock.svg?react";
import CrownIcon from "../../../../assets/icon-crown.svg?react";
import ExportIcon from "../../../../assets/icon-export.svg?react";
import MapPinIcon from "../../../../assets/icon-map-pin-simple.svg?react";
import PenSmallIcon from "../../../../assets/icon-pen-small.svg?react";
import PenIcon from "../../../../assets/icon-pen.svg?react";
import CourseLines from "../../../../assets/meeting-course-lines.svg?react";
import CourseNavigation from "../../../../assets/meeting-course-navigation.svg?react";
import HeaderConfetti from "../../../../assets/meeting-header-confetti.svg?react";
import { CtaButton, CtaButtonRow } from "../../../../components/cta-button";
import { DayPickerSheet } from "../../../../components/day-picker";
import { Dropdown, Item, Trigger, createMenuHandle } from "../../../../components/dropdown-menu";
import { Layout } from "../../../../components/layout";
import { MomoAvatar } from "../../../../components/momo-avatar";
import { TimePickerSheet } from "../../../../components/time-picker";
import { parseDateString, parseTimeString } from "../../../../utils/time";
import { PlaceSearchSheet } from "../../../catalog/components/place-search-sheet";
import { useMeetingTypes } from "../../../catalog/hooks";
import { MeetingMap } from "../../components/meeting-map";
import { useMeeting, useMeetingPermissions } from "../../hooks";

import {
  backButton,
  cardArrow,
  cardDescription,
  cardTexts,
  cardTitle,
  confetti,
  card,
  courseCards,
  courseLines,
  courseNavigation,
  courseSection,
  crown,
  courseEditButton,
  editButton,
  footer,
  header,
  infoCard,
  infoCell,
  infoValue,
  mapScrim,
  nav,
  participant,
  participantAvatar,
  participantName,
  participants,
  participantsSection,
  root,
  sectionTitle,
  status,
  title,
  titleRow,
  typeBadge,
  typeRow,
  typeSuffix,
} from "./index.css";

/** 2026-08-05 → 26. 08. 05 */
function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${year?.slice(2)}. ${month}. ${day}`;
}

// 고칠 수 없는 참여자에게는 펼침 표시를 두지 않는다.
function InfoCell({
  Icon,
  value,
  onOpen,
}: {
  Icon: typeof CalendarIcon;
  value: string;
  onOpen?: () => void;
}) {
  if (onOpen === undefined) {
    return (
      <span className={infoCell}>
        <Icon aria-hidden height={24} width={24} />
        <span className={infoValue}>{value}</span>
      </span>
    );
  }

  return (
    <button className={infoCell} type="button" onClick={onOpen}>
      <Icon aria-hidden height={24} width={24} />
      <span className={infoValue}>
        {value}
        <CaretDownIcon aria-hidden height={14} width={14} />
      </span>
    </button>
  );
}

type Sheet = "date" | "time" | "location";

export function MeetingPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting, isPending } = useMeeting();
  const { canManageMeeting } = useMeetingPermissions();
  const meetingTypes = useMeetingTypes();
  const typeMenu = createMenuHandle();

  const [sheet, setSheet] = useState<Sheet | null>(null);
  const closeSheet = () => setSheet(null);
  // TODO: backend meeting 수정 api 구현 필요
  const save = () => {
    alert("TODO: backend meeting 수정 api 구현 필요");
    closeSheet();
  };

  if (isPending || meeting === undefined) {
    return (
      <Layout>
        <p className={status}>모임 정보 불러오는 중</p>
      </Layout>
    );
  }

  const shareUrl = `/new/complete?code=${meeting.invitationCode}`;

  // 코스를 고르기 전에는 모임 위치만 찍는다.
  const coursePlaces = (meeting.selectedCourse?.recommendationIds ?? []).flatMap(
    (recommendationId) =>
      meeting.recommendations
        .filter((recommendation) => recommendation.id === recommendationId)
        .map((recommendation) => recommendation.place),
  );

  return (
    <Layout>
      <div className={root}>
        <div className={header}>
          <HeaderConfetti aria-hidden className={confetti} />

          <div className={nav}>
            <button
              aria-label="뒤로 가기"
              className={backButton}
              type="button"
              onClick={() => void navigate(-1)}
            >
              <CaretLeftIcon aria-hidden height={24} width={24} />
            </button>
          </div>

          <div className={typeRow}>
            {canManageMeeting ? (
              <>
                <Trigger className={typeBadge} handle={typeMenu}>
                  {meeting.meetingType.name}
                  <CaretDownIcon aria-hidden height={16} width={16} />
                </Trigger>
                <Dropdown handle={typeMenu} size="md">
                  {meetingTypes.map((type) => (
                    <Item
                      key={type.code}
                      selected={type.code === meeting.meetingTypeCode}
                      onClick={save}
                    >
                      {type.name}
                    </Item>
                  ))}
                </Dropdown>
              </>
            ) : (
              <span className={typeBadge}>{meeting.meetingType.name}</span>
            )}
            <span className={typeSuffix}>모임이에요!</span>
          </div>

          <div className={titleRow}>
            <h1 className={title}>{meeting.name}</h1>
            {canManageMeeting ? (
              <button
                aria-label="모임 이름 수정"
                className={editButton}
                type="button"
                onClick={save}
              >
                <PenIcon aria-hidden height={30} width={29} />
              </button>
            ) : null}
          </div>

          <div className={infoCard}>
            <InfoCell
              Icon={CalendarIcon}
              value={formatDate(meeting.date)}
              onOpen={canManageMeeting ? () => setSheet("date") : undefined}
            />
            <InfoCell
              Icon={ClockIcon}
              value={meeting.time}
              onOpen={canManageMeeting ? () => setSheet("time") : undefined}
            />
            <InfoCell
              Icon={MapPinIcon}
              value={meeting.firstLocation.displayName}
              onOpen={canManageMeeting ? () => setSheet("location") : undefined}
            />
          </div>
        </div>

        <section className={participantsSection}>
          <h2 className={sectionTitle}>참여자 현황</h2>
          <div className={participants}>
            {meeting.participants.map((person) => (
              <div className={participant} key={person.id}>
                <span className={participantAvatar}>
                  <MomoAvatar avatarId={person.profileAvatarId} size={60} />
                  {person.role === "HOST" ? (
                    <span aria-label="방장" className={crown} role="img">
                      <CrownIcon aria-hidden height={14} width={14} />
                    </span>
                  ) : null}
                </span>
                <span className={participantName}>{person.nickname}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={courseSection}>
          <h2 className={sectionTitle}>코스 정보</h2>
          <div className={courseCards}>
            <Link className={card({ card: "course" })} to={`/meeting/${id}/course-plan`}>
              <CourseLines aria-hidden className={courseLines} />
              <CourseNavigation aria-hidden className={courseNavigation} />
              <span aria-hidden className={cardArrow({ card: "course" })}>
                <ArrowUpRightIcon height={12} width={12} />
              </span>
              <span className={cardTexts({ card: "course" })}>
                <span className={cardTitle}>코스 순서</span>
                <span className={cardDescription}>카테고리 설정</span>
              </span>
            </Link>

            <Link className={card({ card: "map" })} to={`/meeting/${id}/place`}>
              <MeetingMap
                interactive={false}
                level={6}
                origin={meeting.firstLocation}
                places={coursePlaces}
              />
              <span aria-hidden className={mapScrim} />
              <span aria-hidden className={cardArrow({ card: "map" })}>
                <ArrowUpRightIcon height={12} width={12} />
              </span>
              <span className={cardTexts({ card: "map" })}>
                <span className={cardTitle}>모임 코스 자세히 보기</span>
                <span className={cardDescription}>정해진 코스 장소 확인</span>
              </span>
            </Link>

            {canManageMeeting && meeting.selectedCourse !== null ? (
              <button
                aria-label="코스 수정"
                className={courseEditButton}
                type="button"
                onClick={save}
              >
                <PenSmallIcon aria-hidden height={32} width={32} />
              </button>
            ) : null}
          </div>
        </section>

        <div className={footer}>
          {meeting.selectedCourse === null ? (
            <CtaButton onClick={() => void navigate(shareUrl)}>공유하기</CtaButton>
          ) : (
            <CtaButtonRow
              primaryLabel="모임 카드 생성"
              secondaryAriaLabel="공유하기"
              secondaryLabel={<ExportIcon aria-hidden height={24} width={24} />}
              onPrimary={() => void navigate(`/meeting/${id}/card`)}
              onSecondary={() => void navigate(shareUrl)}
            />
          )}
        </div>
      </div>

      <DayPickerSheet
        date={parseDateString(meeting.date)}
        isOpen={sheet === "date"}
        onClose={closeSheet}
        onConfirm={save}
      />
      <TimePickerSheet
        isOpen={sheet === "time"}
        time={parseTimeString(meeting.time)}
        onClose={closeSheet}
        onConfirm={save}
      />
      <PlaceSearchSheet isOpen={sheet === "location"} onClose={closeSheet} onSelect={save} />
    </Layout>
  );
}

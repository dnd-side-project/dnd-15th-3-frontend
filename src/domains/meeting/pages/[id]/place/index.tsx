import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretRightIcon from "../../../../../assets/icon-caret-right.svg?react";
import PlusIcon from "../../../../../assets/icon-plus.svg?react";
import SearchIcon from "../../../../../assets/icon-search.svg?react";
import { Layout } from "../../../../../components/layout";
import { LocationButton } from "../../../../../components/location-button";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PlaceSearchInput } from "../../../../../components/text-input";
import { Toggle } from "../../../../../components/toggle";
import { useCurrentPosition } from "../../../../../hooks/use-current-position";
import { catalogQueries } from "../../../../catalog/api/queries";
import { CourseCategoryChips } from "../../../../catalog/components/course-category-chips";
import { getAccessToken } from "../../../access-token";
import { MeetingMap } from "../../../components/meeting-map";
import { useMeeting } from "../../../hooks";

import {
  addButton,
  bottomActions,
  bottomStack,
  chips,
  grabber,
  grabberBar,
  meetingPill,
  notice,
  noticeDescription,
  noticeIcon,
  noticeTitle,
  pillIcon,
  result,
  resultAddress,
  resultName,
  resultTexts,
  results,
  root,
  search,
  sheet,
  sheetBottom,
  thumbnail,
  toggle,
} from "./index.css";

interface SearchState {
  failed: boolean;
  collecting: boolean;
  keyword: string;
  matchCount: number;
}

/** 시트에 목록 대신 띄울 안내. null 이면 목록을 그린다. */
function searchNotice({ failed, collecting, keyword, matchCount }: SearchState) {
  if (failed) {
    return { title: "장소 정보를 불러오지 못했습니다.", description: "잠시 후 다시 시도해주세요." };
  }
  if (collecting) {
    return { title: "주변 장소를 모으는 중이에요", description: "잠시만 기다려주세요!" };
  }
  if (matchCount === 0) {
    return {
      title: `‘${keyword}'에 대한 검색 결과가 없어요`,
      description: "검색어를 다시 확인해주세요.",
    };
  }
  return null;
}

export function PlaceSearchPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting } = useMeeting();

  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());
  // 검색은 받아 둔 목록에서 걸러내므로 한 번에 최대치(50)까지 받는다.
  const { data: places, isError } = useQuery(
    catalogQueries.places({ meetingId: id, accessToken: getAccessToken(id), size: 50 }),
  );

  const matched = (places?.items ?? []).filter(
    (place) => place.name.includes(deferredKeyword) || place.address.includes(deferredKeyword),
  );
  const sheetNotice = searchNotice({
    failed: isError,
    collecting: places?.collectionStatus === "PENDING" || places?.collectionStatus === "RUNNING",
    keyword: deferredKeyword,
    matchCount: matched.length,
  });
  const { position, locate, loading } = useCurrentPosition();

  return (
    <Layout>
      <div className={root}>
        <MeetingMap currentPosition={position} origin={meeting?.firstLocation} />

        <div className={toggle}>
          <Toggle value="map" onChange={() => void navigate(`/meeting/${id}/choice`)} />
        </div>

        <div className={chips}>
          <CourseCategoryChips value={meeting?.categorySlugs ?? []} variant="overlay" />
        </div>

        <div className={bottomStack}>
          <div className={bottomActions}>
            <LocationButton disabled={loading} onClick={locate} />
            <button
              className={meetingPill}
              type="button"
              onClick={() => void navigate(`/meeting/${id}`)}
            >
              <img alt="" className={pillIcon} src="/static/icon-meeting-calendar.webp" />
              모임 상세
              <CaretRightIcon aria-hidden height={16} width={16} />
            </button>
          </div>

          <div className={sheet}>
            <div className={grabber}>
              <span className={grabberBar} />
            </div>

            <div className={search}>
              <PlaceSearchInput
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>

            {deferredKeyword.length === 0 ? null : sheetNotice !== null ? (
              <div className={notice}>
                <SearchIcon aria-hidden className={noticeIcon} height={40} width={40} />
                <p className={noticeTitle}>{sheetNotice.title}</p>
                <p className={noticeDescription}>{sheetNotice.description}</p>
              </div>
            ) : (
              <div className={results}>
                {matched.map((place) => (
                  <button
                    className={result}
                    key={place.id}
                    type="button"
                    onClick={() => void navigate(`/meeting/${id}/place/${place.id}`)}
                  >
                    {place.previewUrl === null ? (
                      <span className={thumbnail} />
                    ) : (
                      <img alt="" className={thumbnail} src={place.previewUrl} />
                    )}
                    <span className={resultTexts}>
                      <span className={resultName}>
                        <PlaceIcon category={place.category.slug} size={20} />
                        {place.name}
                      </span>
                      <span className={resultAddress}>{place.address}</span>
                    </span>
                    <span aria-hidden className={addButton}>
                      <PlusIcon height={16} width={16} />
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className={sheetBottom} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

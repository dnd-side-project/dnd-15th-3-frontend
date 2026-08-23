import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useDeferredValue, useState } from "react";
import { useNavigate, useParams } from "react-router";

import PlusIcon from "../../../../../assets/icon-plus.svg?react";
import RetryLargeIcon from "../../../../../assets/icon-retry-large.svg?react";
import SearchLargeIcon from "../../../../../assets/icon-search-large.svg?react";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PlaceSearchInput } from "../../../../../components/text-input";
import { getAccessToken } from "../../../../../utils/access-token";
import { catalogQueries } from "../../../../catalog/api/queries";
import { useCategorySlug } from "../../../../catalog/hooks";
import { MapScreen, MapSheet } from "../../../components/map-screen";
import { useCoursePlaces } from "../../../hooks";

import {
  addButton,
  notice,
  noticeDescription,
  noticeIcon,
  noticeTitle,
  result,
  resultAddress,
  resultName,
  resultTexts,
  results,
  search,
  sheetBottom,
  thumbnail,
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
    return {
      Icon: RetryLargeIcon,
      iconSize: { width: 40, height: 37 },
      title: "장소 정보를 불러오지 못했습니다.",
      description: "잠시 후 다시 시도해주세요.",
    };
  }
  if (collecting) {
    return {
      Icon: SearchLargeIcon,
      iconSize: { width: 40, height: 40 },
      title: "주변 장소를 모으는 중이에요",
      description: "잠시만 기다려주세요!",
    };
  }
  if (matchCount === 0) {
    return {
      Icon: SearchLargeIcon,
      iconSize: { width: 40, height: 40 },
      title: `‘${keyword}'에 대한 검색 결과가 없어요`,
      description: "검색어를 다시 확인해주세요.",
    };
  }
  return null;
}

export interface PlaceSearchProps {
  header?: ReactNode;
  onSelect: (placeId: string) => void;
  gradient?: boolean;
}

/** 지도 위에서 모임 주변 장소를 찾는 화면. 코스 수정에서도 같은 화면을 쓴다. */
export function PlaceSearch({ header, onSelect, gradient }: PlaceSearchProps) {
  const { id = "" } = useParams();
  const categoryOf = useCategorySlug();
  const coursePlaces = useCoursePlaces();

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

  return (
    <MapScreen gradient={gradient} header={header} places={coursePlaces} onSelectPlace={onSelect}>
      <MapSheet>
        <div className={search}>
          <PlaceSearchInput value={keyword} onChange={(event) => setKeyword(event.target.value)} />
        </div>

        {deferredKeyword.length === 0 ? null : sheetNotice !== null ? (
          <div className={notice}>
            <sheetNotice.Icon aria-hidden className={noticeIcon} {...sheetNotice.iconSize} />
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
                onClick={() => onSelect(place.id)}
              >
                {place.previewUrl === null ? (
                  <span className={thumbnail} />
                ) : (
                  <img alt="" className={thumbnail} src={place.previewUrl} />
                )}
                <span className={resultTexts}>
                  <span className={resultName}>
                    <PlaceIcon category={categoryOf(place.category.id)} size={20} />
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
      </MapSheet>
    </MapScreen>
  );
}

export function PlaceSearchPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  return (
    <PlaceSearch
      gradient
      onSelect={(placeId) => void navigate(`/meeting/${id}/place/${placeId}`)}
    />
  );
}

import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";

import SearchIcon from "../../../../assets/icon-search.svg?react";
import { BottomSheet } from "../../../../components/bottom-sheet";
import { Highlight } from "../../../../components/highlight";
import { TextInput } from "../../../../components/text-input";
import { catalogQueries } from "../../api/queries";
import type { FirstMeetingPlaceResponse } from "../../api/types";

import { body, empty, result, results, search, searchIcon } from "./index.css";

interface PlaceSearchSheetProps {
  isOpen: boolean;
  onSelect: (place: FirstMeetingPlaceResponse) => void;
  onClose: () => void;
}

/** 첫 만남 위치를 검색해 고르는 시트. 모임 생성과 모임 상세가 함께 쓴다. */
export function PlaceSearchSheet({ isOpen, onSelect, onClose }: PlaceSearchSheetProps) {
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());
  const { data: places } = useQuery(catalogQueries.firstMeetingPlaces(deferredKeyword));

  return (
    <BottomSheet hasBackdrop isOpen={isOpen} onClose={onClose} onTapBackdrop={onClose}>
      <div className={body}>
        <div className={search}>
          <TextInput
            autoFocus
            aria-label="위치 검색"
            endIcon={<SearchIcon aria-hidden className={searchIcon} height={24} width={24} />}
            placeholder="위치를 검색해주세요"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        {deferredKeyword.length > 0 ? (
          <div className={results}>
            {places === undefined || places.length === 0 ? (
              <p className={empty}>검색 결과가 없어요</p>
            ) : (
              places.map((place) => (
                <button
                  className={result}
                  key={place.id}
                  type="button"
                  onClick={() => onSelect(place)}
                >
                  <Highlight keyword={deferredKeyword} text={place.name} />
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>
    </BottomSheet>
  );
}

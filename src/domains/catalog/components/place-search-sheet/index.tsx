import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import SearchIcon from "@/assets/icon-search.svg?react";
import { BottomSheet } from "@/components/bottom-sheet";
import { Highlight } from "@/components/highlight";
import { TextInput } from "@/components/text-input";
import { catalogQueries } from "@/domains/catalog/api/queries";
import type { FirstMeetingPlaceResponse } from "@/domains/catalog/api/types";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

import { body, empty, result, results, search, searchIcon } from "./index.css";

interface PlaceSearchSheetProps {
  isOpen: boolean;
  onSelect: (place: FirstMeetingPlaceResponse) => void;
  onClose: () => void;
}

/** 첫 만남 위치를 검색해 고르는 시트. 모임 생성과 모임 상세가 함께 쓴다. */
export function PlaceSearchSheet({ isOpen, onSelect, onClose }: PlaceSearchSheetProps) {
  const [keyword, setKeyword] = useState("");
  const query = useDebouncedValue(keyword.trim());
  const { data: places, isError, isPending } = useQuery(catalogQueries.firstMeetingPlaces(query));

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

        {query.length > 0 ? (
          <div className={results}>
            {isError ? (
              <p className={empty}>장소 정보를 불러오지 못했습니다.</p>
            ) : isPending ? (
              <p className={empty}>검색 중</p>
            ) : places.length === 0 ? (
              <p className={empty}>검색 결과가 없어요</p>
            ) : (
              places.map((place) => (
                <button
                  className={result}
                  key={place.id}
                  type="button"
                  onClick={() => onSelect(place)}
                >
                  <Highlight keyword={query} text={place.name} />
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>
    </BottomSheet>
  );
}

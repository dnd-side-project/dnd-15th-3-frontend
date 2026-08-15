import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";

import SearchIcon from "../../assets/icon-search.svg?react";
import type { FirstMeetingPlaceResponse } from "../../domains/catalog/api/types";
import { BottomSheet } from "../bottom-sheet";
import { TextInput } from "../text-input";

import * as styles from "./index.css";

export interface MeetingPlaceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlace: (place: FirstMeetingPlaceResponse) => void;
  searchPlaces: (keyword: string, signal?: AbortSignal) => Promise<FirstMeetingPlaceResponse[]>;
  placeholder?: string;
  emptyMessage?: string;
}

function Highlight({ text, keyword }: { text: string; keyword: string }) {
  const at = keyword.length === 0 ? -1 : text.indexOf(keyword);
  if (at === -1) {
    return <>{text}</>;
  }
  return (
    <>
      {text.slice(0, at)}
      <span className={styles.match}>{keyword}</span>
      {text.slice(at + keyword.length)}
    </>
  );
}

export function MeetingPlaceSearch({
  isOpen,
  onClose,
  onSelectPlace,
  searchPlaces,
  placeholder = "위치를 검색해주세요",
  emptyMessage = "검색 결과가 없어요",
}: MeetingPlaceSearchProps) {
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());

  const {
    data: places,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["meeting-place-search", deferredKeyword],
    queryFn: ({ signal }) => searchPlaces(deferredKeyword, signal),
    enabled: deferredKeyword.length > 0,
  });

  const select = (place: FirstMeetingPlaceResponse) => {
    onSelectPlace(place);
    onClose();
  };

  const hasKeyword = keyword.length > 0;

  return (
    <BottomSheet
      hasBackdrop
      onTapBackdrop={onClose}
      isOpen={isOpen}
      onClose={onClose}
      topBorderRadius="md"
    >
      <div className={styles.container}>
        <div className={styles.search}>
          <TextInput
            autoFocus
            aria-label="위치 검색"
            endIcon={
              <SearchIcon aria-hidden className={styles.searchIcon} height={24} width={24} />
            }
            placeholder={placeholder}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>

        {hasKeyword ? (
          <div className={styles.results}>
            {isPending ? (
              <p className={styles.empty}>검색 중...</p>
            ) : isError ? (
              <p className={styles.empty}>{error.message}</p>
            ) : places === undefined || places.length === 0 ? (
              <p className={styles.empty}>{emptyMessage}</p>
            ) : (
              places.map((place) => (
                <button
                  className={styles.result}
                  key={place.id}
                  type="button"
                  onClick={() => select(place)}
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

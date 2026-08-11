import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CaretRightIcon from "../../../../../assets/icon-caret-right.svg?react";
import PlusIcon from "../../../../../assets/icon-plus.svg?react";
import { Layout } from "../../../../../components/layout";
import { LocationButton } from "../../../../../components/location-button";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PlaceSearchInput } from "../../../../../components/text-input";
import { Toggle } from "../../../../../components/toggle";
import { useCurrentPosition } from "../../../../../hooks/use-current-position";
import { catalogQueries } from "../../../../catalog/api/queries";
import { CourseCategoryChips } from "../../../../catalog/components/course-category-chips";
import { useCategorySlug } from "../../../../catalog/hooks";
import { getAccessToken } from "../../../access-token";
import { meetingQueries } from "../../../api/queries";
import { MeetingMap } from "../../../components/meeting-map";

import {
  addButton,
  bottomActions,
  bottomStack,
  chips,
  empty,
  grabber,
  grabberBar,
  meetingPill,
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

export function PlaceSearchPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data: meeting } = useQuery(meetingQueries.detail(id, getAccessToken(id)));
  const categoryOf = useCategorySlug();

  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());
  const { data: places } = useQuery(catalogQueries.places(deferredKeyword));
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

            {deferredKeyword.length === 0 ? (
              <div className={sheetBottom} />
            ) : places === undefined || places.length === 0 ? (
              <p className={empty}>검색 결과가 없어요</p>
            ) : (
              <>
                <div className={results}>
                  {places.map((place) => (
                    <button
                      className={result}
                      key={place.id}
                      type="button"
                      onClick={() => void navigate(`/meeting/${id}/place/${place.id}`)}
                    >
                      <img alt="" className={thumbnail} src={place.previewUrl} />
                      <span className={resultTexts}>
                        <span className={resultName}>
                          <PlaceIcon category={categoryOf(place.categoryId)} size={20} />
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
                <div className={sheetBottom} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

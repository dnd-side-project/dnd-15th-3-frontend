import { useQuery } from "@tanstack/react-query";
import { useDeferredValue, useState } from "react";
import { useNavigate, useParams } from "react-router";

import CalendarIcon from "../../../../../assets/icon-calendar.svg?react";
import CaretRightIcon from "../../../../../assets/icon-caret-right.svg?react";
import PlusIcon from "../../../../../assets/icon-plus.svg?react";
import { Layout } from "../../../../../components/layout";
import { LocationButton } from "../../../../../components/location-button";
import { PlaceIcon } from "../../../../../components/place-icon";
import { PlaceSearchInput } from "../../../../../components/text-input";
import { Toggle, type ToggleValue } from "../../../../../components/toggle";
import { useCurrentPosition } from "../../../../../hooks/use-current-position";
import { catalogQueries } from "../../../../catalog/api/queries";
import { CourseCategoryChips } from "../../../../catalog/components/course-category-chips";
import { getAccessToken } from "../../../access-token";
import { meetingQueries } from "../../../api/queries";
import { MeetingMap } from "../../../components/meeting-map";

import {
  addButton,
  bottomActions,
  chips,
  empty,
  grabber,
  grabberBar,
  meetingPill,
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
  const { data: categories = [] } = useQuery(catalogQueries.categories());

  const [view, setView] = useState<ToggleValue>("map");
  const [keyword, setKeyword] = useState("");
  const deferredKeyword = useDeferredValue(keyword.trim());
  const { data: places } = useQuery(catalogQueries.places(deferredKeyword));
  const { position, locate, loading } = useCurrentPosition();

  const center =
    meeting === undefined
      ? { lat: 37.5665, lng: 126.978 }
      : { lat: meeting.firstLocation.latitude, lng: meeting.firstLocation.longitude };

  const categoryOf = (categoryId: string) =>
    categories.find((category) => category.id === categoryId)?.slug ?? "other";

  return (
    <Layout>
      <div className={root}>
        <MeetingMap
          center={center}
          currentPosition={position}
          places={
            meeting === undefined
              ? []
              : [
                  {
                    id: meeting.firstLocation.id,
                    name: meeting.firstLocation.name,
                    latitude: meeting.firstLocation.latitude,
                    longitude: meeting.firstLocation.longitude,
                  },
                ]
          }
        />

        <div className={toggle}>
          <Toggle
            value={view}
            onChange={(next) => {
              setView(next);
              if (next === "list") {
                void navigate(`/meeting/${id}/choice`);
              }
            }}
          />
        </div>

        <div className={chips}>
          <CourseCategoryChips value={meeting?.categorySlugs ?? []} variant="overlay" />
        </div>

        <div className={bottomActions}>
          <LocationButton disabled={loading} onClick={locate} />
          <button className={meetingPill} type="button" onClick={() => void navigate(`/meeting/${id}`)}>
            <CalendarIcon aria-hidden height={20} width={20} />
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
                      <PlusIcon height={24} width={24} />
                    </span>
                  </button>
                ))}
              </div>
              <div className={sheetBottom} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

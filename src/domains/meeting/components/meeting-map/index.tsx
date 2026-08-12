import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";

import { RouteMarker, type RouteMarkerTone } from "../../../../components/route-marker";
import type { Coordinates } from "../../../../hooks/use-current-position";
import type { MeetingLocationResponse } from "../../api/types";

import { currentDot, map, notice, originMarker, root } from "./index.css";

export interface MeetingMapPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  previewUrl?: string | null;
}

export interface MeetingMapProps {
  /** 모임 위치. 코스 마커와 다른 핀으로 그린다. */
  origin?: MeetingLocationResponse;
  places?: MeetingMapPlace[];
  currentPosition?: Coordinates | null;
  level?: number;
  /** 카드 안에 넣을 때는 조작을 막아 링크가 클릭을 받게 한다. */
  interactive?: boolean;
  onSelectPlace?: (placeId: string) => void;
}

// 코스 순서마다 마커 색을 돌려 쓴다.
const TONES: RouteMarkerTone[] = ["blue", "pink", "purple"];

const SEOUL_CITY_HALL: Coordinates = { lat: 37.5665, lng: 126.978 };

const toCoordinates = (place: { latitude: number; longitude: number }): Coordinates => ({
  lat: place.latitude,
  lng: place.longitude,
});

export function MeetingMap({
  origin,
  places = [],
  currentPosition = null,
  level = 4,
  interactive = true,
  onSelectPlace,
}: MeetingMapProps) {
  const [loading, error] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_MAP_KEY });
  const focus = origin ?? places[0];
  const center = currentPosition ?? (focus === undefined ? SEOUL_CITY_HALL : toCoordinates(focus));

  return (
    <div className={root({ interactive })}>
      <Map
        center={center}
        className={map}
        draggable={interactive}
        level={level}
        zoomable={interactive}
      >
        {origin === undefined ? null : (
          <CustomOverlayMap position={toCoordinates(origin)} yAnchor={1}>
            <img
              alt={origin.displayName}
              className={originMarker}
              src="/static/map-origin-marker.webp"
            />
          </CustomOverlayMap>
        )}

        {places.map((place, index) => (
          <CustomOverlayMap key={place.id} position={toCoordinates(place)} yAnchor={1}>
            <RouteMarker
              imageAlt={place.name}
              imageUrl={place.previewUrl}
              index={index + 1}
              tone={TONES[index % TONES.length]}
              onClick={onSelectPlace && (() => onSelectPlace(place.id))}
            />
          </CustomOverlayMap>
        ))}

        {currentPosition === null ? null : (
          <CustomOverlayMap position={currentPosition}>
            <span aria-label="현재 위치" className={currentDot} role="img" />
          </CustomOverlayMap>
        )}
      </Map>

      {loading ? <p className={notice}>지도를 불러오는 중이에요</p> : null}
      {error === undefined ? null : <p className={notice}>지도를 불러오지 못했어요</p>}
    </div>
  );
}

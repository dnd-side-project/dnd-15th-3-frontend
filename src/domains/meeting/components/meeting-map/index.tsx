import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";

import { RouteMarker, type RouteMarkerTone } from "../../../../components/route-marker";
import type { Coordinates } from "../../../../hooks/use-current-position";

import { currentDot, map, notice, root } from "./index.css";

export interface MeetingMapPlace {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  previewUrl?: string;
}

export interface MeetingMapProps {
  places?: MeetingMapPlace[];
  currentPosition?: Coordinates | null;
  level?: number;
  onSelectPlace?: (placeId: string) => void;
}

// 코스 순서마다 마커 색을 돌려 쓴다.
const TONES: RouteMarkerTone[] = ["blue", "pink", "purple"];

const SEOUL_CITY_HALL: Coordinates = { lat: 37.5665, lng: 126.978 };

const toCoordinates = (place: MeetingMapPlace): Coordinates => ({
  lat: place.latitude,
  lng: place.longitude,
});

export function MeetingMap({
  places = [],
  currentPosition = null,
  level = 4,
  onSelectPlace,
}: MeetingMapProps) {
  const [loading, error] = useKakaoLoader({ appkey: import.meta.env.VITE_KAKAO_MAP_KEY });
  const first = places[0];
  const center = currentPosition ?? (first === undefined ? SEOUL_CITY_HALL : toCoordinates(first));

  return (
    <div className={root}>
      <Map center={center} className={map} level={level}>
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

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";

import { RouteMarker, type RouteMarkerTone } from "@/components/route-marker";
import type { MeetingMapPlace } from "@/domains/meeting/components/meeting-map";

import { attribution, map, root } from "./index.css";

export type { MeetingMapPlace };

export interface MeetingMapOsmProps {
  places?: MeetingMapPlace[];
  level?: number;
  /** 마커 색. 한 코스 안에서는 같은 색을 쓴다. */
  tone?: RouteMarkerTone;
  /** 주어지면 마커 사이를 잇는 실선을 그린다. */
  routeLineColor?: string;
  /** 카드 사이즈. large 면 마커/선/패딩을 비례 확대한다. */
  size?: "medium" | "large";
}

// medium mapArea(156×210) 와 large mapArea(229×309) 의 비율.
const SIZE_SCALE: Record<NonNullable<MeetingMapOsmProps["size"]>, number> = {
  medium: 1,
  large: 229 / 156,
};

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 } as const;

const toLatLng = (point: { latitude: number; longitude: number }): L.LatLngExpression => [
  point.latitude,
  point.longitude,
];

interface FitBoundsProps {
  points: L.LatLngExpression[];
  padX: number;
  padTop: number;
  padBottom: number;
}

function FitBounds({ points, padX, padTop, padBottom }: FitBoundsProps) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) {
      return;
    }
    if (points.length === 1) {
      map.setView(points[0], Math.max(map.getZoom(), 14));
      return;
    }
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, {
      paddingTopLeft: [padX, padTop],
      paddingBottomRight: [padX, padBottom],
      maxZoom: 16,
    });
  }, [map, points, padX, padTop, padBottom]);
  return null;
}

export function MeetingMapOsm({
  places = [],
  level = 4,
  tone = "blue",
  routeLineColor,
  size = "medium",
}: MeetingMapOsmProps) {
  const scale = SIZE_SCALE[size];
  const focus = places[0];
  const center = focus === undefined ? DEFAULT_CENTER : toLatLng(focus);

  // Leaflet zoom은 카카오 level과 역순. level 6 → zoom 13 정도로 매핑.
  const zoom = Math.max(2, 19 - level);

  const placePoints = places.map(toLatLng);

  const placeIcons = places.map((place, idx) => {
    const w = 72 * scale;
    const h = 81 * scale;
    const html = renderToStaticMarkup(
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <RouteMarker
          imageAlt={place.name}
          imageUrl={place.previewUrl}
          index={idx + 1}
          tone={tone}
        />
      </div>,
    );
    return L.divIcon({
      className: "",
      html,
      iconSize: [w, h],
      iconAnchor: [w / 2, h],
    });
  });

  // 마커가 좌표 기준 위쪽으로 뻗으므로(꼬리 끝이 anchor), top padding을 마커 높이만큼 줘야
  // edge 마커 상단이 viewport 안에 들어온다. 좌우로도 마커 너비 절반만큼 여유가 필요하다.
  // mapStage 는 2× 영역이라 scale(0.5) 후에도 비율 유지.
  const markerHeight = 81 * scale;
  const markerHalfWidth = 36 * scale;
  const margin = 8 * scale;
  const padX = Math.round(markerHalfWidth + margin);
  const padTop = Math.round(markerHeight + margin);
  const padBottom = Math.round(margin);
  const lineWeight = Math.round(3 * scale);

  return (
    <div className={root}>
      <MapContainer
        center={center}
        className={map}
        key={size}
        zoom={zoom}
        zoomSnap={0}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className={attribution}
        />

        {routeLineColor !== undefined && places.length > 1 ? (
          <Polyline
            pathOptions={{ color: routeLineColor, opacity: 1, weight: lineWeight }}
            positions={placePoints}
          />
        ) : null}

        {places.map((place, index) => (
          <Marker icon={placeIcons[index]} key={place.id} position={toLatLng(place)} />
        ))}

        <FitBounds points={placePoints} padBottom={padBottom} padTop={padTop} padX={padX} />
      </MapContainer>
    </div>
  );
}

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import * as styles from "./index.css";

interface LatLng {
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  center?: LatLng;
  level?: number;
}

const DEFAULT_CENTER: LatLng = { lat: 37.5665, lng: 126.978 };

export function KakaoMap({ center = DEFAULT_CENTER, level = 3 }: KakaoMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
  });

  return (
    <div className={styles.wrapper}>
      <Map center={center} level={level} className={styles.map}>
        <MapMarker position={center} />
      </Map>
      {loading && <div className={styles.overlay}>지도를 불러오는 중…</div>}
      {error && <div className={styles.overlay}>지도를 불러오지 못했습니다.</div>}
    </div>
  );
}

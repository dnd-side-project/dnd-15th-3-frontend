import { useCallback, useState } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

interface UseCurrentPositionReturn {
  position: Coordinates | null;
  loading: boolean;
  error: string | null;
  locate: () => void;
}

/** 기기 GPS 로 현재 위치를 한 번 읽어온다. */
export function useCurrentPosition(): UseCurrentPositionReturn {
  const [position, setPosition] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setError("이 기기에서는 현재 위치를 쓸 수 없어요");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setError(null);
        setLoading(false);
      },
      () => {
        setError("현재 위치를 가져오지 못했어요");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }, []);

  return { position, loading, error, locate };
}

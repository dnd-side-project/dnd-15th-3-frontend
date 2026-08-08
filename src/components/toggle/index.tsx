import GridIcon from "../../assets/icon-grid.svg?react";
import MapIcon from "../../assets/icon-map.svg?react";

import { item, root } from "./index.css";

export type ToggleValue = "map" | "list";

export interface ToggleProps {
  value: ToggleValue;
  onChange: (value: ToggleValue) => void;
}

export function Toggle({ value, onChange }: ToggleProps) {
  const handleClick = (next: ToggleValue) => {
    if (next === value) {
      return;
    }
    onChange(next);
  };

  return (
    <div className={root} role="group" aria-label="보기 방식">
      <button
        type="button"
        aria-label="지도로 보기"
        aria-pressed={value === "map"}
        className={item({ selected: value === "map" })}
        onClick={() => handleClick("map")}
      >
        <MapIcon aria-hidden width={18.5} height={18.32} />
      </button>
      <button
        type="button"
        aria-label="목록으로 보기"
        aria-pressed={value === "list"}
        className={item({ selected: value === "list" })}
        onClick={() => handleClick("list")}
      >
        <GridIcon aria-hidden width={16.19} height={16.19} />
      </button>
    </div>
  );
}

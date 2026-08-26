import { Fragment } from "react";

import PlusIcon from "@/assets/icon-plus.svg?react";
import { PlaceIcon } from "@/components/place-icon";
import { PlacePhotoImage } from "@/components/place-photo";
import type { CourseRouteStep } from "@/domains/course/api/types";

import { addButton, arrow, name, place, root, thumbnail } from "./index.css";

export interface CoursePlaceStripProps {
  route: CourseRouteStep[];
  onAdd: () => void;
}

export function CoursePlaceStrip({ route, onAdd }: CoursePlaceStripProps) {
  return (
    <div className={root}>
      {route.map((step, index) => (
        <Fragment key={step.recommendationId}>
          {index === 0 ? null : <span aria-hidden className={arrow} />}
          <div className={place}>
            <PlacePhotoImage className={thumbnail} photo={step.previewPhoto} />
            <span className={name}>
              <PlaceIcon category={step.categorySlug} size={16} />
              {step.name}
            </span>
          </div>
        </Fragment>
      ))}

      <span aria-hidden className={arrow} />
      <button aria-label="장소 추가" className={addButton} type="button" onClick={onAdd}>
        <PlusIcon aria-hidden height={20} width={20} />
      </button>
    </div>
  );
}

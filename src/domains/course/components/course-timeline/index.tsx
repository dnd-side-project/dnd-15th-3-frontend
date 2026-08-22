import ArrowSquareOutIcon from "../../../../assets/icon-arrow-square-out.svg?react";
import CaretRightIcon from "../../../../assets/icon-caret-right.svg?react";
import FootprintsIcon from "../../../../assets/icon-footprints.svg?react";
import { PlaceIcon } from "../../../../components/place-icon";
import type { CourseRouteStep } from "../../api/types";

import {
  address,
  badge,
  body,
  item,
  list,
  name,
  place,
  routeLink,
  texts,
  thumbnail,
  walk,
  walkTime,
} from "./index.css";

function routeUrl(step: CourseRouteStep) {
  return `https://map.kakao.com/link/to/${encodeURIComponent(step.name)},${step.latitude},${step.longitude}`;
}

export interface CourseTimelineProps {
  route: CourseRouteStep[];
  onSelectPlace?: (placeId: string) => void;
}

export function CourseTimeline({ route, onSelectPlace }: CourseTimelineProps) {
  return (
    <ol className={list}>
      {route.map((step, index) => {
        const next = route[index + 1];

        return (
          <li className={item} key={step.recommendationId}>
            <span aria-hidden className={badge}>
              {step.order}
            </span>

            <div className={body}>
              <button
                className={place}
                type="button"
                onClick={onSelectPlace && (() => onSelectPlace(step.placeId))}
              >
                {step.primaryImageUrl === null ? (
                  <span className={thumbnail} />
                ) : (
                  <img alt="" className={thumbnail} src={step.primaryImageUrl} />
                )}
                <span className={texts}>
                  <span className={name}>
                    <PlaceIcon category={step.categorySlug} size={20} />
                    {step.name}
                  </span>
                  <span className={address}>{step.address}</span>
                </span>
                <CaretRightIcon aria-hidden height={20} width={20} />
              </button>

              {step.walkDurationToNextMin === null || next === undefined ? null : (
                <div className={walk}>
                  <span className={walkTime}>
                    <FootprintsIcon aria-hidden height={14} width={14} />
                    도보 {step.walkDurationToNextMin}분
                  </span>
                  <a className={routeLink} href={routeUrl(next)} rel="noreferrer" target="_blank">
                    경로 안내
                    <ArrowSquareOutIcon aria-hidden height={14} width={14} />
                  </a>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

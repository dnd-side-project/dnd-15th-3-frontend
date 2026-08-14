import { Link } from "react-router";

import HomeConfetti from "../../../assets/home-confetti.svg?react";
import ArrowUpRightIcon from "../../../assets/icon-arrow-up-right.svg?react";
import MomoLogo from "../../../assets/logo-momo.svg?react";
import { Layout } from "../../../components/layout";

import {
  arrow,
  card,
  cardContent,
  cardDescription,
  cardTexts,
  cardTitle,
  cards,
  confetti,
  description,
  illustration,
  intro,
  logo,
  root,
  title,
} from "./index.css";

export function HomePage() {
  return (
    <Layout>
      <main className={root}>
        <MomoLogo aria-label="momo" className={logo} height={20} role="img" width={103} />

        <div className={intro}>
          <h1 className={title}>모두가 함께하는 모임 설계</h1>
          <p className={description}>친구들과 함께 모임 코스를 계획해보세요</p>
        </div>

        <nav className={cards}>
          <Link className={card({ size: "large" })} to="/new/profile">
            <HomeConfetti aria-hidden className={confetti} />
            <img
              alt=""
              className={illustration({ size: "large" })}
              src="/static/home-card-create.webp"
            />
            <div className={cardContent({ size: "large" })}>
              <div className={cardTexts}>
                <span className={cardTitle}>모임 생성</span>
                <span className={cardDescription}>모임방을 생성해요!</span>
              </div>
              <span aria-hidden className={arrow}>
                <ArrowUpRightIcon height={12} width={12} />
              </span>
            </div>
          </Link>

          <Link className={card({ size: "small" })} to="/join">
            <img
              alt=""
              className={illustration({ size: "small" })}
              src="/static/home-card-join.webp"
            />
            <div className={cardContent({ size: "small" })}>
              <div className={cardTexts}>
                <span className={cardTitle}>모임 참여</span>
                <span className={cardDescription}>모임방에 참여해요!</span>
              </div>
              <span aria-hidden className={arrow}>
                <ArrowUpRightIcon height={12} width={12} />
              </span>
            </div>
          </Link>
        </nav>
      </main>
    </Layout>
  );
}

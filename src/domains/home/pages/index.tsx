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

const ENTRIES = [
  {
    to: "/new/profile",
    size: "large",
    title: "모임 생성",
    description: "모임방을 생성해요!",
    illustration: "/static/home-card-create.webp",
  },
  {
    to: "/join",
    size: "small",
    title: "모임 참여",
    description: "모임방에 참여해요!",
    illustration: "/static/home-card-join.webp",
  },
] as const;

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
          {ENTRIES.map((entry) => (
            <Link className={card({ size: entry.size })} key={entry.to} to={entry.to}>
              {entry.size === "large" ? <HomeConfetti aria-hidden className={confetti} /> : null}
              <img alt="" className={illustration({ size: entry.size })} src={entry.illustration} />
              <div className={cardContent({ size: entry.size })}>
                <div className={cardTexts}>
                  <span className={cardTitle}>{entry.title}</span>
                  <span className={cardDescription}>{entry.description}</span>
                </div>
                <span aria-hidden className={arrow}>
                  <ArrowUpRightIcon height={12} width={12} />
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </main>
    </Layout>
  );
}

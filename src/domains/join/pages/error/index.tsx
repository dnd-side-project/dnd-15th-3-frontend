import { useNavigate } from "react-router";

import MomoShadow from "../../../../assets/momo-shadow.svg?react";
import { CtaButton } from "../../../../components/cta-button";
import { Layout } from "../../../../components/layout";
import { SpeechBubble } from "../../../../components/speech-bubble";

import {
  description,
  footer,
  head,
  momo,
  momoImage,
  momoInner,
  momoShadow,
  root,
  title,
} from "./index.css";

export function JoinErrorPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className={root}>
        <div className={head}>
          <h1 className={title}>앗, 길을 잃은 것 같아요!</h1>
          <p className={description}>초대 링크나 코드를 다시 확인해주세요.</p>
        </div>
        <div className={momo}>
          <SpeechBubble>찾을 수 없어요...</SpeechBubble>
          <div className={momoInner}>
            <img
              alt=""
              className={momoImage}
              height={241}
              src="/static/momo-question-mark.webp"
              width={301}
            />
            <MomoShadow className={momoShadow} />
          </div>
        </div>
        <div className={footer}>
          <CtaButton onClick={() => void navigate("/join")}>다시 입력하기</CtaButton>
        </div>
      </main>
    </Layout>
  );
}

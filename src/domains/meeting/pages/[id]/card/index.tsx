import { useNavigate } from "react-router";

import { Layout } from "@/components/layout";
import { TopAppBar } from "@/components/top-app-bar";

import {
  cloud1,
  cloud2,
  clouds,
  mailButton,
  mailImage,
  mailWrapper,
  pill,
  postbox,
  root,
  stage,
} from "./index.css";

export function CardPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className={root}>
        <div className={clouds}>
          <img alt="" aria-hidden className={cloud1} src="/static/cloud.svg" />
          <img alt="" aria-hidden className={cloud2} src="/static/cloud.svg" />
        </div>
        <TopAppBar title="" background="transparent" onBack={() => void navigate(-1)} />
        <div className={stage}>
          <img alt="" aria-hidden className={postbox} src="/static/postbox.svg" />
          <span className={pill}>편지를 클릭해 확인하세요!</span>
          <div className={mailWrapper}>
            <button
              aria-label="편지 확인하기"
              className={mailButton}
              type="button"
              onClick={() => {}}
            >
              <img alt="" aria-hidden className={mailImage} src="/static/mail.svg" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

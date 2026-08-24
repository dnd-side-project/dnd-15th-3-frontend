import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { Layout } from "@/components/layout";
import { courseQueries } from "@/domains/course/api/queries";
import { getAccessToken } from "@/utils/access-token";

import { status } from "./index.css";

/** 코스 오버뷰. 첫 번째 코스 후보로 보낸다. */
export function CoursePage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const {
    data: candidates,
    isPending,
    isError,
  } = useQuery(courseQueries.candidates(id, getAccessToken(id)));

  useEffect(() => {
    if (candidates === undefined) {
      return;
    }
    const first = candidates.courseCandidates[0];
    if (first === undefined) {
      return;
    }
    void navigate(`/meeting/${id}/course/${first.courseCandidateId}`, { replace: true });
  }, [candidates, id, navigate]);

  if (isError) {
    return (
      <Layout>
        <p className={status}>코스를 불러오지 못했습니다.</p>
      </Layout>
    );
  }

  if (isPending || candidates === undefined) {
    return (
      <Layout>
        <p className={status}>코스 불러오는 중</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <p className={status}>코스 불러오는 중</p>
    </Layout>
  );
}

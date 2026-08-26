import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { CtaButton } from "@/components/cta-button";
import { Layout } from "@/components/layout";
import { TopAppBar } from "@/components/top-app-bar";
import { createQuestionnaire } from "@/domains/meeting/api";
import { meetingQueries } from "@/domains/meeting/api/queries";
import type { Questionnaire } from "@/domains/meeting/api/types";
import { getAccessToken } from "@/utils/access-token";

import {
  body,
  footer,
  option,
  optionEmoji,
  optionList,
  placeholder,
  progress,
  question as questionStyle,
  retry,
  root,
} from "./index.css";
import { surfaceColor } from "@/components/layout/index.css";

function byOrder(questions: Questionnaire["questions"]) {
  return [...questions].sort((a, b) => a.order - b.order);
}

export function QuestionnairePage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const accessToken = getAccessToken(id);
  const questionnaireOptions = meetingQueries.questionnaire(id, accessToken);
  const startedRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [seed, setSeed] = useState<Questionnaire | null>(null);

  const {
    mutate: start,
    isPending: isStarting,
    isError: isStartError,
  } = useMutation({
    mutationFn: () => createQuestionnaire(id, accessToken),
    onSuccess: (data) => setSeed(data),
  });

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;
    start();
  }, [start]);

  const { data: polled } = useQuery({
    ...questionnaireOptions,
    enabled: seed !== null && seed.status === "GENERATING",
    refetchInterval: (query) => (query.state.data?.status === "GENERATING" ? 1500 : false),
  });

  const questionnaire = polled ?? seed;
  const questions = questionnaire ? byOrder(questionnaire.questions) : [];
  const currentQuestion = questions[currentIndex] ?? null;
  const totalCount = questionnaire?.totalCount ?? 3;
  const isLastQuestion = currentIndex >= totalCount - 1;
  const nextQuestionReady = isLastQuestion || questions.length > currentIndex + 1;
  const selectedOptionId = currentQuestion ? answers[currentQuestion.questionId] : undefined;

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
      return;
    }
    void navigate(-1);
  };

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) {
      return;
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.questionId]: optionId }));
  };

  const handleNext = () => {
    if (!currentQuestion || !selectedOptionId || questionnaire === null) {
      return;
    }
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    void navigate(`/meeting/${id}/generating`, {
      state: {
        customization: {
          type: "QUESTIONNAIRE",
          questionnaireId: questionnaire.questionnaireId,
          questionnaireVersion: questionnaire.version,
          answers: questions.map((q) => ({
            questionId: q.questionId,
            optionId: answers[q.questionId],
          })),
        },
      },
    });
  };

  return (
    <Layout>
      <TopAppBar background={surfaceColor} title="모임 질문" onBack={handleBack} />
      <div className={root}>
        <div className={body}>
          {currentQuestion ? (
            <>
              <span className={progress}>
                {currentIndex + 1}/{totalCount}
              </span>
              <h1 className={questionStyle}>{currentQuestion.text}</h1>
              <div className={optionList}>
                {currentQuestion.options.map((item) => (
                  <button
                    className={option({ selected: item.optionId === selectedOptionId })}
                    key={item.optionId}
                    type="button"
                    onClick={() => handleSelect(item.optionId)}
                  >
                    <span aria-hidden className={optionEmoji}>
                      {item.emoji}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </>
          ) : isStartError ? (
            <p className={placeholder}>
              질문을 불러오지 못했어요.
              <br />
              <button className={retry} type="button" onClick={() => start()}>
                다시 시도
              </button>
            </p>
          ) : (
            <p className={placeholder}>{isStarting ? "질문을 준비하고 있어요" : "잠시만요"}</p>
          )}
        </div>
        <div className={footer}>
          <CtaButton disabled={!selectedOptionId || !nextQuestionReady} onClick={handleNext}>
            {isLastQuestion ? "제출" : "다음"}
          </CtaButton>
        </div>
      </div>
    </Layout>
  );
}

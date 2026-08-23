import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

import type { JoinDraft } from "@/domains/join/types/draft";

export const INVITATION_CODE = /^[A-Za-z0-9]{6}$/;

/** 한 글자씩 채우는 간격과, 다 채운 뒤 다음 화면으로 넘어가기까지 머무는 시간. */
const FILL_INTERVAL_MS = 90;
const SETTLE_DELAY_MS = 450;

/**
 * 초대 링크로 들어왔으면 코드를 한 글자씩 채우고, 다 채운 뒤 스스로 참여 확인 화면으로 넘어간다.
 * 코드는 첫 렌더에 한 번만 읽고, 6자리 영숫자가 아니면 평소처럼 직접 입력받는다.
 */
export function useSharedCodeAutoFill() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setValue } = useFormContext<JoinDraft>();
  const [code] = useState(() => {
    const shared = searchParams.get("code") ?? "";
    return INVITATION_CODE.test(shared) ? shared : "";
  });

  useEffect(() => {
    if (code === "") {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = (ms: number) => (reduced ? 0 : ms);
    const timers = Array.from(code, (_, index) =>
      window.setTimeout(
        () => setValue("invitationCode", code.slice(0, index + 1), { shouldValidate: true }),
        delay(FILL_INTERVAL_MS * (index + 1)),
      ),
    );
    // 뒤로 왔을 때 같은 연출이 되풀이되지 않도록, 링크로 도착한 이 화면은 남기지 않는다.
    timers.push(
      window.setTimeout(
        () => void navigate(`/join/complete?code=${code}`, { replace: true }),
        delay(FILL_INTERVAL_MS * code.length + SETTLE_DELAY_MS),
      ),
    );
    return () => {
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, [code, navigate, setValue]);

  return code !== "";
}

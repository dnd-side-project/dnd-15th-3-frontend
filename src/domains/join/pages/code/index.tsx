import { OTPField } from "@base-ui/react/otp-field";
import { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import { useNavigate } from "react-router";

import LoaderCircleIcon from "../../../../assets/icon-loader-circle.svg?react";
import { CtaButtonRow } from "../../../../components/cta-button";
import { toast } from "../../../../components/toast/manager";
import { TopAppBar } from "../../../../components/top-app-bar";
import type { JoinDraft } from "../../types/draft";

import { surfaceColor } from "../../../../components/layout/index.css";
import {
  ctaArea,
  content,
  otpInput,
  otpRoot,
  page,
  pasteButton,
  title,
  codeInputArea,
} from "./index.css";

export function JoinCodePage() {
  const navigate = useNavigate();
  const { control, trigger } = useFormContext<JoinDraft>();
  const { field } = useController({
    control,
    name: "invitationCode",
    rules: {
      required: true,
      pattern: {
        value: /^[A-Za-z0-9]{6}$/,
        message: "유효하지 않은 초대코드입니다.",
      },
    },
  });
  const { ref, value, onChange, onBlur } = field;
  const [loading, setLoading] = useState(false);

  const showToast = (message: string) => {
    toast.add({ title: message });
  };
  const handlePaste = async () => {
    setLoading(true);
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text.length === 0) {
        showToast("붙여놓을 초대코드가 없습니다.");
        return;
      }
      onChange(text.slice(0, 6));
    } catch {
      showToast("붙여놓을 초대코드가 없습니다.");
    } finally {
      setLoading(false);
    }
  };
  const handleClickCtaPrimary = async () => {
    const valid = await trigger("invitationCode");
    if (!valid) {
      showToast("유효하지 않은 초대코드입니다.");
      return;
    }
    await navigate(`/join/complete?code=${value}`);
  };
  return (
    <div className={page}>
      <TopAppBar title="초대 코드 입력" background={surfaceColor} />
      <main className={content}>
        <h1 className={title}>초대 코드를 입력해주세요</h1>
        <div className={codeInputArea}>
          <OTPField.Root
            ref={ref}
            length={6}
            validationType="alphanumeric"
            className={otpRoot}
            value={value}
            onValueChange={onChange}
            onBlur={onBlur}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <OTPField.Input
                key={i}
                className={otpInput}
                aria-label={i === 0 ? "초대 코드 6자리" : `Character ${i + 1} of 6`}
              />
            ))}
          </OTPField.Root>
          <button type="button" className={pasteButton} disabled={loading} onClick={handlePaste}>
            {loading ? <LoaderCircleIcon aria-hidden height={20} width={20} /> : null}
            간편 붙여넣기
          </button>
        </div>
      </main>
      <div className={ctaArea}>
        <CtaButtonRow
          onSecondary={() => navigate(-1)}
          primaryLabel="다음"
          onPrimary={handleClickCtaPrimary}
          primaryDisabled={value.length !== 6}
        />
      </div>
    </div>
  );
}

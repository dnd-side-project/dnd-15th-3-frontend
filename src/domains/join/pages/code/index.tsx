import { OTPField } from "@base-ui/react/otp-field";
import { useState } from "react";
import { useNavigate } from "react-router";

import LoaderCircleIcon from "../../../../assets/icon-loader-circle.svg?react";
import { CtaButtonRow } from "../../../../components/cta-button";
import { TopAppBar } from "../../../../components/top-app-bar";

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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaste = async () => {
    setLoading(true);
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text.length === 0) {
        return;
      }
      setCode(text.slice(0, 6));
    } catch {
      // clipboard read failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={page}>
      <TopAppBar title="초대 코드 입력" background={surfaceColor} />
      <main className={content}>
        <h1 className={title}>초대 코드를 입력해주세요</h1>
        <div className={codeInputArea}>
          <OTPField.Root
            length={6}
            validationType="alphanumeric"
            value={code}
            onValueChange={setCode}
            className={otpRoot}
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
          onPrimary={() => navigate("/join/profile")}
          primaryDisabled={code.length !== 6}
        />
      </div>
    </div>
  );
}

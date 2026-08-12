/** 조건부 className 을 하나로 합친다. */
export const cx = (...classNames: (string | false | null | undefined)[]) =>
  classNames.filter(Boolean).join(" ");

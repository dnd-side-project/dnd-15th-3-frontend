import { match } from "./index.css";

export interface HighlightProps {
  text: string;
  keyword: string;
}

/** 검색어와 일치하는 부분만 색을 달리해 보여준다. */
export function Highlight({ text, keyword }: HighlightProps) {
  const at = keyword.length === 0 ? -1 : text.indexOf(keyword);
  if (at === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, at)}
      <span className={match}>{keyword}</span>
      {text.slice(at + keyword.length)}
    </>
  );
}

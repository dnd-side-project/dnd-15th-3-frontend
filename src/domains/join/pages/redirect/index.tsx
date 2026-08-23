import { Navigate, useLocation } from "react-router";

/** `/join` 으로 들어온 초대 링크를 code 쿼리째 코드 입력 화면으로 넘긴다. */
export function JoinRedirect() {
  const { search } = useLocation();
  return <Navigate replace to={{ pathname: "/join/code", search }} />;
}

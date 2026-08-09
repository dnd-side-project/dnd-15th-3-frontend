const storageKey = (meetingId: string) => `momo.access-token.${meetingId}`;

/**
 * 모임 생성·참여 응답으로 받은 재접속 토큰. 상세 조회에 초대 코드 대신 사용한다.
 */
export function getAccessToken(meetingId: string) {
  return localStorage.getItem(storageKey(meetingId)) ?? "";
}

export function setAccessToken(meetingId: string, accessToken: string) {
  localStorage.setItem(storageKey(meetingId), accessToken);
}

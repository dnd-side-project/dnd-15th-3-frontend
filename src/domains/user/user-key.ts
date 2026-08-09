const STORAGE_KEY = "momo.user-key";

/**
 * 서버가 참여자를 식별하는 익명 키. 기기에 한 번 만들어 두고 계속 사용한다.
 */
export function getUserKey() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    return stored;
  }

  const created = `device-${crypto.randomUUID()}`;
  localStorage.setItem(STORAGE_KEY, created);
  return created;
}

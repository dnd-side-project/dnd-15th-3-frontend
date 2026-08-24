interface PollOptions {
  interval?: number;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * `isDone`이 true를 반환할 때까지 `fn`을 주기적으로 호출한다.
 * 최종 데이터를 반환하며, 타임아웃·취소 시 에러를 던진다.
 */
export async function pollUntil<T>(
  fn: (signal?: AbortSignal) => Promise<T>,
  isDone: (data: T) => boolean,
  { interval = 2000, timeout = 60_000, signal }: PollOptions = {},
): Promise<T> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    await sleep(interval, signal);
    const data = await fn(signal);
    if (isDone(data)) {
      return data;
    }
  }
  throw new Error("폴링 시간이 초과되었어요");
}

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

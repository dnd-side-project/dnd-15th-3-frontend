const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://momo-dev.jinmu.me";

// 서버가 4xx·5xx 응답에서 함께 내려주는 본문
interface ErrorBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: ErrorBody | null;

  constructor(status: number, body: ErrorBody | null) {
    const message = Array.isArray(body?.message) ? body.message.join(", ") : body?.message;
    super(message ?? `요청에 실패했어요 (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type QueryValue = string | number | boolean | undefined;

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
}

function buildUrl(path: string, query: RequestOptions["query"]) {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", query, body, signal } = options;

  const response = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: body === undefined ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => null));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

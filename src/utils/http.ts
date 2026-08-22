const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://momo-dev.jinmu.me";

interface FieldError {
  field: string;
  reason: string;
}

interface ErrorBody {
  code?: string;
  message?: string;
  fieldErrors?: FieldError[];
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: ErrorBody | null;

  constructor(status: number, body: ErrorBody | null) {
    super(body?.message ?? `요청에 실패했어요 (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type QueryValue = string | number | boolean | undefined | string[];

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: Record<string, QueryValue>;
  body?: unknown;
  signal?: AbortSignal;
}

function buildUrl(path: string, query: RequestOptions["query"]) {
  const url = new URL(path, BASE_URL);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        url.searchParams.set(key, value.join(","));
      }
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", query, body, signal } = options;

  const isFormData = body instanceof FormData;

  const response = await fetch(buildUrl(path, query), {
    method,
    signal,
    headers: body === undefined || isFormData ? undefined : { "content-type": "application/json" },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => null));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function requestBlob(path: string, options: RequestOptions = {}): Promise<Blob> {
  const { method = "GET", query, signal } = options;

  const response = await fetch(buildUrl(path, query), { method, signal });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json().catch(() => null));
  }

  return response.blob();
}

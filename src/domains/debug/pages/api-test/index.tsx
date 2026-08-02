import { useQuery } from "@tanstack/react-query";

interface HealthResponse {
  [key: string]: unknown;
}

async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch("https://momo.jinmu.me/health");
  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<HealthResponse>;
}

export function ApiTestPage() {
  const { data, error, isPending, isError, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <h1>API 테스트 — /health</h1>
      <p>엔드포인트: https://momo.jinmu.me/health</p>

      <button
        type="button"
        onClick={() => refetch()}
        disabled={isFetching}
        style={{ alignSelf: "flex-start", padding: "8px 16px" }}
      >
        {isFetching ? "요청 중..." : "재요청"}
      </button>

      <section>
        <h2>상태</h2>
        {isPending && <p>로딩 중...</p>}
        {isSuccess && <p>성공</p>}
        {isError && <p>에러</p>}
      </section>

      {isError && error && (
        <section>
          <h2>에러</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </section>
      )}

      {data && (
        <section>
          <h2>응답 데이터</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}

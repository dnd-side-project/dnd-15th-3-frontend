import { afterEach, expect, test, vi } from "vite-plus/test";

import { request } from "./http";

const fetchMock = vi.spyOn(globalThis, "fetch");

afterEach(() => {
  fetchMock.mockReset();
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("쿼리 파라미터를 URL 에 붙인다", async () => {
  fetchMock.mockResolvedValue(jsonResponse([]));

  await request("/api/v1/places/search", { query: { keyword: "강남역" } });

  const [url] = fetchMock.mock.calls[0]!;
  expect(String(url)).toContain("/api/v1/places/search?keyword=%EA%B0%95%EB%82%A8%EC%97%AD");
});

test("undefined 인 쿼리 파라미터는 보내지 않는다", async () => {
  fetchMock.mockResolvedValue(jsonResponse([]));

  await request("/api/v1/places/search", { query: { keyword: "강남역", page: undefined } });

  expect(String(fetchMock.mock.calls[0]![0])).not.toContain("page");
});

test("본문이 있으면 JSON 으로 직렬화해 보낸다", async () => {
  fetchMock.mockResolvedValue(jsonResponse({}));

  await request("/api/v1/meetings/invitation/preview", {
    method: "POST",
    body: { invitationCode: "DNDFOR" },
  });

  const [, init] = fetchMock.mock.calls[0]!;
  expect(init?.method).toBe("POST");
  expect(init?.body).toBe('{"invitationCode":"DNDFOR"}');
});

test("실패 응답은 서버 메시지를 담은 ApiError 로 던진다", async () => {
  fetchMock.mockResolvedValue(
    jsonResponse({ message: "유효하지 않은 초대 코드입니다.", statusCode: 404 }, 404),
  );

  await expect(request("/api/v1/meetings/invitation/preview")).rejects.toMatchObject({
    name: "ApiError",
    status: 404,
    message: "유효하지 않은 초대 코드입니다.",
  });
});

test("본문을 읽을 수 없는 실패 응답도 상태 코드로 알린다", async () => {
  fetchMock.mockResolvedValue(new Response("", { status: 502 }));

  await expect(request("/api/v1")).rejects.toThrowError("요청에 실패했어요 (502)");
});

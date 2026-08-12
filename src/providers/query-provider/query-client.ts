import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60_000,
    },
  },
});

// 모임 유형·카테고리·아바타는 거의 변하지 않아 세션 동안 다시 받지 않는다.
for (const name of ["meeting-types", "categories", "profile-avatars"]) {
  queryClient.setQueryDefaults(["catalog", name], { staleTime: Number.POSITIVE_INFINITY });
}

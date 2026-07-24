import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, type PropsWithChildren, Suspense } from "react";

import { queryClient } from "./query-client";

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(async () => {
      const module = await import("@tanstack/react-query-devtools");
      return { default: module.ReactQueryDevtools };
    })
  : null;

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <QueryDevtools />
    </QueryClientProvider>
  );
}

function QueryDevtools() {
  if (!import.meta.env.DEV || ReactQueryDevtools === null) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <ReactQueryDevtools initialIsOpen={false} />
    </Suspense>
  );
}

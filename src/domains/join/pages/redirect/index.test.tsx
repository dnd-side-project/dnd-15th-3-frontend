import { createMemoryRouter, RouterProvider, useLocation } from "react-router";
import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import { render } from "@/test-utils";

import { JoinRedirect } from "./index";

function renderRedirect(initialEntry: string) {
  const router = createMemoryRouter(
    [
      { path: "/join", Component: JoinRedirect },
      { path: "/join/code", Component: CodeLocation },
    ],
    { initialEntries: [initialEntry] },
  );

  render(<RouterProvider router={router} />);
}

function CodeLocation() {
  const { pathname, search } = useLocation();
  return <p>{pathname + search}</p>;
}

test("/join 으로 들어오면 /join/code 로 보낸다", async () => {
  renderRedirect("/join");

  await expect.element(page.getByText("/join/code")).toBeInTheDocument();
});

test("초대 링크의 code 쿼리를 그대로 넘긴다", async () => {
  renderRedirect("/join?code=DNDF0R");

  await expect.element(page.getByText("/join/code?code=DNDF0R")).toBeInTheDocument();
});

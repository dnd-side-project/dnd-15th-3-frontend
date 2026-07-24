// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";

import babel from "@rolldown/plugin-babel";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  fmt: {
    ignorePatterns: ["dist/**"],
    semi: true,
    sortImports: true,
  },
  lint: {
    ignorePatterns: [".direnv/**", "dist/**"],
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ["oxc", "react", "typescript"],
    rules: {
      "react/exhaustive-deps": "warn",
      "react/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      "react/react-compiler": "error",
      "react/rules-of-hooks": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
  plugins: lazyPlugins(() => [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    vanillaExtractPlugin({}),
  ]),
  staged: {
    "*": "vp check --fix",
  },
  test: {
    coverage: {
      reporter: ["html", "text"],
    },
    projects: [
      {
        extends: true,
        test: {
          include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
          name: "unit",
        },
      },
      {
        extends: true,
        optimizeDeps: {
          include: ["@vanilla-extract/recipes/createRuntimeFn"],
        },
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [
              {
                browser: "chromium",
              },
            ],
            provider: playwright({}),
          },
          name: "storybook",
        },
      },
    ],
  },
});

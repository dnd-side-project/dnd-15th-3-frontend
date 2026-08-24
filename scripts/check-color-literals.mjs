#!/usr/bin/env node
// oxlint 에는 no-restricted-syntax 류의 커스텀 패턴 규칙이 없어 별도 스크립트로 검사한다.
// .css.ts 안에서는 색상을 항상 src/styles/palette.ts(원시값) 또는
// src/styles/theme.css.ts 의 vars.color.*(시맨틱 토큰)로만 참조해야 한다.
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { relative } from "node:path";

const COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;
const ALLOWED_FILES = new Set(["src/styles/palette.ts"]);

const files = globSync("src/**/*.css.ts").filter(
  (file) => !ALLOWED_FILES.has(relative(process.cwd(), file).split("\\").join("/")),
);

const violations = [];

for (const file of files) {
  const relPath = relative(process.cwd(), file).split("\\").join("/");
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const matches = line.match(COLOR_LITERAL);
    if (matches) {
      violations.push({ file: relPath, line: index + 1, matches, content: line.trim() });
    }
  });
}

if (violations.length > 0) {
  console.error("색상 리터럴을 palette.ts / vars.color.* 토큰으로 바꿔주세요:\n");
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.matches.join(", ")}`);
    console.error(`    ${v.content}`);
  }
  console.error(`\n총 ${violations.length}건`);
  process.exit(1);
}

console.log(`색상 토큰 검사 통과 (${files.length}개 .css.ts 파일)`);

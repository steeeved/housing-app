// Chapter 11 secret scan.
// It reads the files Git tracks, plus new files Git does not ignore.
// It prints the file, the line and the rule. It never prints the matched value.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";

const SKIP_PATHS = [
  /^bun\.lock$/,
  /^drizzle\/meta\//,
  /^src\/scripts\/scan-secrets\.ts$/,
  /\.(png|jpg|jpeg|gif|ico|webp|woff2?)$/i,
];

const PLACEHOLDER = /^(teacher|choose|your|example|placeholder|changeme|process\.|env\.)/i;

type Finding = { file: string; line: number; rule: string };

const listed = spawnSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
  encoding: "utf8",
});
if (listed.status !== 0) {
  console.error("Secret scan needs a Git repository. Run it inside your project folder.");
  process.exit(2);
}

const files = listed.stdout
  .split("\n")
  .filter(Boolean)
  .filter((file) => !SKIP_PATHS.some((skip) => skip.test(file)));

const findings: Finding[] = [];

for (const file of files) {
  if (/(^|\/)\.env(\..+)?$/.test(file) && !file.endsWith(".env.example")) {
    findings.push({ file, line: 0, rule: "an environment file must stay out of Git" });
    continue;
  }

  if (!existsSync(file) || statSync(file).size > 200_000) continue;

  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((text, index) => {
    const line = index + 1;

    if (/postgres(?:ql)?:\/\/[^\s:@/]+:[^\s@/]+@/i.test(text)) {
      findings.push({ file, line, rule: "database address with a username and password" });
    }

    const named = text.match(
      /\b[A-Z][A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|API_KEY|PRIVATE_KEY)[A-Z0-9_]*\s*[:=]\s*["']?([^\s"'#;,]{12,})/,
    );
    if (named && !PLACEHOLDER.test(named[1])) {
      findings.push({ file, line, rule: "a secret-style name with a real-looking value" });
    }

    if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text)) {
      findings.push({ file, line, rule: "a private key block" });
    }

    if (/\bgh[pousr]_[A-Za-z0-9]{30,}\b/.test(text)) {
      findings.push({ file, line, rule: "a GitHub token" });
    }
  });
}

if (findings.length > 0) {
  console.error("Secret scan failed. Values are hidden on purpose.");
  for (const finding of findings) {
    const where = finding.line > 0 ? `${finding.file}:${finding.line}` : finding.file;
    console.error(`  ${where}  ${finding.rule}`);
  }
  console.error("Remove the value and use an environment variable. Tell your teacher if it was real.");
  process.exit(1);
}

console.log(`Secret scan passed: ${files.length} files checked, nothing suspicious found.`);

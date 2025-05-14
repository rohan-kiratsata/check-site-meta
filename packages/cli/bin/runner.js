import { spawn } from "child_process";
import path from "path";
import open from "open";
import fs from "fs";

export async function runDevServer({ metaPort, targetUrl, shouldOpen }) {
  const webPath = path.resolve(process.cwd(), "apps/web");

  // Inject env variable dynamically (NEXT_PUBLIC_DEFAULT_TEST_URL)
  const envFilePath = path.join(webPath, ".env.local");
  const envContent = `NEXT_PUBLIC_DEFAULT_TEST_URL=${targetUrl}\n`;
  fs.writeFileSync(envFilePath, envContent);

  console.log(`🧪 Injected .env.local with target: ${targetUrl}`);

  // Spawn yarn dev inside apps/web
  const child = spawn("yarn", ["dev", "--port", metaPort], {
    cwd: webPath,
    stdio: "inherit",
    shell: true,
  });

  // Wait a bit then open browser
  setTimeout(() => {
    const url = `http://localhost:${metaPort}`;
    if (shouldOpen) {
      open(url);
    } else {
      console.log(`\n🌐 Open this in your browser: ${url}`);
    }
  }, 1500);

  // Exit handling
  process.on("SIGINT", () => {
    child.kill("SIGINT");
    process.exit();
  });
}

#!/usr/bin/env node

import { Command } from "commander";
import { runDevServer } from "../runner.js";

const program = new Command();

program
  .name("check-meta-cli")
  .argument("<targetPort>", "Port of the site you want to test (e.g. 3000)")
  .option("--port <port>", "Port to run the metadata checker on", "5432")
  .option("--open", "Automatically open browser", true)
  .action(async (targetPort, options) => {
    const metaPort = options.port || "5432";
    const targetUrl = `http://localhost:${targetPort}`;

    console.log(`\n🧪 Starting Check Site Meta on port ${metaPort}`);
    console.log(`🔗 Will test: ${targetUrl}\n`);

    await runDevServer({
      metaPort,
      targetUrl,
      shouldOpen: options.open,
    });
  });

program.parse();

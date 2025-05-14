#!/usr/bin/env node

import { Command } from "commander";
import open from "open";
import readline from "readline";

const program = new Command();

program
  .name("check-site-meta")
  .argument("<port>", "Local port number (e.g. 3000)")
  .option("--protocol <protocol>", "http or https", "http")
  .option("--open", "Force open browser without prompt", false)
  .action(async (port, options) => {
    const url = `${options.protocol}://localhost:${port}`;

    console.log(`\n▲ Check Site Meta 0.1.0`);
    console.log(`▲ Using local dev server`);
    console.log(`- Local: ${url}`);
    console.log(`- Starting... 🚀\n`);

    setTimeout(() => {
      console.log("✓ Ready\n");
      if (options.open) {
        open(url);
        process.exit(0);
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("❓ Do you want to open the browser? (Y/n) ", (answer) => {
        if (answer.toLowerCase() === "n") {
          rl.close();
          process.exit(0);
        }

        open(url);
        rl.close();
      });
    }, 300);
  });

program.parse();

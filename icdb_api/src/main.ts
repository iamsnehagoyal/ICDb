import { Command } from "commander";
import { runserver } from "./cli";

const program = new Command();

program
    .name("icdb-api")
    .description("CLI for ICDb API")
    .version("1.0.0");

program
    .command("runserver")
    .description("Run the ICDb API server")
    .action(async () => {
        await runserver();
    });

program.parse(process.argv);
import { Command } from 'commander';
import { generateService } from '../logic/generate-service';

function setupGenerateServiceCommand(program: Command, commandNameFather: string, commandName: string): void {
  program
    .command(`${commandNameFather}`)
    .description('Generate a new service')
    .command(`${commandName} <name>`)
    .action((name: string) => {
      generateService(name);
      console.log(`Generated ${name}.service.ts in /src/services`);
    });
}

export { setupGenerateServiceCommand };

import { Command } from 'commander';
import { generateController } from '../logic/generate-controller';
import { generateService } from '../logic/generate-service';
import { generateRoutes } from '../logic/generate-routes';
import { generateRepository } from '../logic/generate-repository';
import { generateDependencyInjection } from '../logic/generate-dependency-injection';

function setupGenerateCommand(program: Command): void {
  const generate = program.command('generate').alias('g').description('Generate resources');

  generate
    .command('service <name>')
    .alias('s')
    .description('Generate a new service')
    .action((name: string) => {
      generateService(name);
      console.log(`Generated ${name}.service.ts in /src`);
    });

  generate
    .command('resource <name>')
    .alias('r')
    .description('Generate a new controller, service, and repository')
    .action((name: string) => {
      generateRoutes(name);
      generateController(name);
      generateService(name);
      generateRepository(name);
      generateDependencyInjection(name);
      console.log(
        `Generated ${name}.controller.ts, ${name}.service.ts, ${name}.repository.ts, and ${name}.routes.ts in /src`
      );
    });
}

export { setupGenerateCommand };

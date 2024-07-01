import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getAppContent, getGitignoreContent, getLaunchJsonContent, getTypescriptConfig } from '../content';
import { Command } from 'commander';

function createFile(dir: string, fileName: string, content: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, fileName), content);
}

function init(program: Command): void {
  program
    .command('init <projectName>')
    .description('Initialize a new Node.js project with Express, Prettier, and Nodemon')
    .action((projectName: string) => {
      const projectPath = path.join(process.cwd(), projectName);

      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
      }

      const envContent = 'PORT=3000\n';
      fs.writeFileSync(path.join(projectPath, '.env'), envContent);
      fs.writeFileSync(path.join(projectPath, '.env.dist'), envContent);
      fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), getTypescriptConfig());

      if (!fs.existsSync(path.join(projectPath, 'src'))) {
        fs.mkdirSync(path.join(projectPath, 'src'));
      }

      const appTsContent = getAppContent();
      fs.writeFileSync(path.join(projectPath, 'src', 'app.ts'), appTsContent.trim());

      createFile(path.join(projectPath, '.vscode'), `launch.json`, getLaunchJsonContent(projectName));

      execSync('npm init -y', { cwd: projectPath, stdio: 'inherit' });
      execSync('npm install express dotenv awilix class-transformer class-validator', {
        cwd: projectPath,
        stdio: 'inherit',
      });
      execSync('npm install --save-dev typescript @types/node @types/express prettier nodemon ts-node', {
        cwd: projectPath,
        stdio: 'inherit',
      });

      fs.writeFileSync(
        path.join(projectPath, '.prettierrc'),
        JSON.stringify(
          {
            semi: true,
            trailingComma: 'es5',
            singleQuote: true,
            printWidth: 120,
            tabWidth: 2,
            useTabs: false,
            endOfLine: 'auto',
          },
          null,
          2
        )
      );

      const gitignoreContent = getGitignoreContent();
      fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignoreContent.trim());

      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      packageJson.scripts = {
        build: 'tsc',
        start: 'node dist/app.js',
        dev: "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log(`Project '${projectName}' initialized successfully!`);
    });
}

export { init };

import path from 'path';
import fs from 'fs';
import { createFile } from '../utils';

function generateDependencyInjection(name: string) {
  const baseDir = path.join(process.cwd(), 'src');
  const containerPath = path.join(baseDir, 'container.ts');
  const className = `${name.charAt(0).toUpperCase() + name.slice(1)}`;

  const importContent = `
import { ${className}Service } from './services/${name}.service';
import { ${className}Repository } from './repositories/${name}.repository';
import { ${className}Controller } from './controllers/${name}.controller';
  `.trim();

  const registerContent = `
container.register({
  ${className}Repository: asClass(${className}Repository).singleton(),
  ${className}Service: asClass(${className}Service)
    .inject(() => ({
      repository: container.cradle.${className}Repository
    }))
    .singleton(),
  ${className}Controller: asClass(${className}Controller)
    .inject(() => ({
      service: container.cradle.${className}Service
    }))
    .singleton(),
});`.trim();

  if (!fs.existsSync(containerPath)) {
    const initialContent = `
import { InjectionMode } from 'awilix';
import { createContainer, asClass, asFunction } from 'awilix';

${importContent}

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
})

${registerContent}

export default container;`.trim();

    createFile(baseDir, 'container.ts', initialContent);
  } else {
    let existingContent = fs.readFileSync(containerPath, { encoding: 'utf8' });

    const importIndex = existingContent.lastIndexOf('import { createContainer');
    const nextLineIndex = existingContent.indexOf('\n', importIndex) + 1;
    existingContent =
      existingContent.substring(0, nextLineIndex) + importContent + '\n' + existingContent.substring(nextLineIndex);

    const exportIndex = existingContent.lastIndexOf('export default container;');
    existingContent =
      existingContent.substring(0, exportIndex) + registerContent + '\n\n' + existingContent.substring(exportIndex);

    fs.writeFileSync(containerPath, existingContent, { encoding: 'utf8' });
  }
}

export { generateDependencyInjection };

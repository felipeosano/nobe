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
  ${className}Service: asClass(${className}Service).singleton(),
  ${className}Repository: asClass(${className}Repository).singleton(),
  ${className}Controller: asClass(${className}Controller).singleton(),
});
  `.trim();

  if (!fs.existsSync(containerPath)) {
    const initialContent = `
import awilix from 'awilix';
import { createContainer, asClass, asValue, asFunction } from 'awilix';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  strict: true,
})

${importContent}
${registerContent}

export default container;
    `.trim();

    createFile(baseDir, 'container.ts', initialContent);
  } else {
    let existingContent = fs.readFileSync(containerPath, { encoding: 'utf8' });
    const importIndex = existingContent.lastIndexOf('import');

    if (importIndex !== -1) {
      const nextLineIndex = existingContent.indexOf('\n', importIndex);
      existingContent =
        existingContent.substring(0, nextLineIndex + 1) + importContent + existingContent.substring(nextLineIndex);
    } else {
      existingContent = importContent + '\n' + existingContent;
    }

    const lastIndex = existingContent.lastIndexOf('export default container;');
    if (lastIndex !== -1) {
      existingContent =
        existingContent.substring(0, lastIndex) + registerContent + '\n\n' + existingContent.substring(lastIndex);
    } else {
      existingContent += '\n' + registerContent;
    }

    fs.writeFileSync(containerPath, existingContent, { encoding: 'utf8' });
  }
}

export { generateDependencyInjection };

import path from 'path';
import { createFile } from '../utils';

export function generateRepository(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const repositoryContent = `
import { I${name.charAt(0).toUpperCase() + name.slice(1)}Repository } from '../repositories.interfaces/${name}.repository.interface';

export class ${name.charAt(0).toUpperCase() + name.slice(1)}Repository implements I${name.charAt(0).toUpperCase() + name.slice(1)}Repository {
// Repository logic here
}
  `.trim();

  const repositoryInterfaceContent = `
export interface I${name.charAt(0).toUpperCase() + name.slice(1)}Repository {
// Repository interface here
}
  `.trim();

  createFile(path.join(baseDir, 'repositories'), `${name}.repository.ts`, repositoryContent);
  createFile(
    path.join(baseDir, 'repositories.interfaces'),
    `${name}.repository.interface.ts`,
    repositoryInterfaceContent
  );
}

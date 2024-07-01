import path from 'path';
import { capitalize, createFile } from '../utils';

export function generateRepository(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const repositoryContent = `
import { I${capitalize(name)}Repository } from '../repositories.interfaces/${name}.repository.interface';

export class ${capitalize(name)}Repository implements I${capitalize(name)}Repository {
// Repository logic here
}`.trim();

  const repositoryInterfaceContent = `
export interface I${capitalize(name)}Repository {
// Repository interface here
}`.trim();

  createFile(path.join(baseDir, 'repositories'), `${name}.repository.ts`, repositoryContent);
  createFile(
    path.join(baseDir, 'repositories.interfaces'),
    `${name}.repository.interface.ts`,
    repositoryInterfaceContent
  );
}

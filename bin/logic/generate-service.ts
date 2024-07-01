import path from 'path';
import { capitalize, createFile } from '../utils';

export function generateService(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const serviceContent = `
import { I${capitalize(name)}Service } from '../services.interfaces/${name}.service.interface';
import { I${capitalize(name)}Repository } from '../repositories.interfaces/${name}.repository.interface';

export class ${capitalize(name)}Service implements I${capitalize(name)}Service {
  private ${name}Repository: I${capitalize(name)}Repository;

  constructor(${name}Repository: I${capitalize(name)}Repository) {
    this.${name}Repository = ${name}Repository;
  }
}`.trim();

  const serviceInterfaceContent = `
export interface I${capitalize(name)}Service {
// Service interface here
}`.trim();

  createFile(path.join(baseDir, 'services'), `${name}.service.ts`, serviceContent);
  createFile(path.join(baseDir, 'services.interfaces'), `${name}.service.interface.ts`, serviceInterfaceContent);
}

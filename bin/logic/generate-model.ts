import path from 'path';
import { capitalize, createFile } from '../utils';

export function generateModel(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const modelContent = `
import { I${capitalize(name)}Model } from '../interfaces/${name}.model.interface';

export class ${capitalize(name)}Model implements I${capitalize(name)}Model {
//
}`.trim();

  const modelInterfaceContent = `
export interface I${capitalize(name)}Model {
//
}`.trim();

  createFile(path.join(baseDir, 'models'), `${name}.model.ts`, modelContent);
  createFile(path.join(baseDir, 'interfaces'), `${name}.model.interface.ts`, modelInterfaceContent);
}

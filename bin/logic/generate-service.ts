import path from 'path';
import { createFile } from '../utils';

export function generateService(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const serviceContent = `
import { I${name.charAt(0).toUpperCase() + name.slice(1)}Service } from '../services.interface/${name}.service.interface';

export class ${name.charAt(0).toUpperCase() + name.slice(1)}Service implements I${name.charAt(0).toUpperCase() + name.slice(1)}Service{
// Service logic here
}
`.trim();

  const serviceInterfaceContent = `
export interface I${name.charAt(0).toUpperCase() + name.slice(1)}Service {
// Service interface here
}
    `.trim();

  createFile(path.join(baseDir, 'services'), `${name}.service.ts`, serviceContent);
  createFile(path.join(baseDir, 'services.interface'), `${name}.service.interface.ts`, serviceInterfaceContent);
}

import path from 'path';
import { capitalize, createFile } from '../utils';

export function generateController(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const controllerContent = `
import { I${capitalize(name)}Controller } from '../controllers.interfaces/${name}.controller.interface';
import { I${capitalize(name)}Service } from '../services.interfaces/${name}.service.interface';

export class ${name.charAt(0).toUpperCase() + name.slice(1)}Controller implements I${name.charAt(0).toUpperCase() + name.slice(1)}Controller {
  private ${name}Service: I${capitalize(name)}Service;

  constructor(${name}Service: I${capitalize(name)}Service) {
    this.${name}Service = ${name}Service;
  }
}`.trim();

  const controllerInterfaceContent = `
export interface I${capitalize(name)}Controller {
// Controller interface here
}`.trim();

  createFile(path.join(baseDir, 'controllers'), `${name}.controller.ts`, controllerContent);
  createFile(
    path.join(baseDir, 'controllers.interfaces'),
    `${name}.controller.interface.ts`,
    controllerInterfaceContent
  );
}

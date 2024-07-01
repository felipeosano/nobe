import path from 'path';
import { createFile } from '../utils';

export function generateController(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const controllerContent = `
import { I${name.charAt(0).toUpperCase() + name.slice(1)}Controller } from '../controllers.interfaces/${name}.controller.interface';

export class ${name.charAt(0).toUpperCase() + name.slice(1)}Controller implements I${name.charAt(0).toUpperCase() + name.slice(1)}Controller{
// Controller logic here
}
  `.trim();

  const controllerInterfaceContent = `
export interface I${name.charAt(0).toUpperCase() + name.slice(1)}Controller {
// Controller interface here
}
  `.trim();

  createFile(path.join(baseDir, 'controllers'), `${name}.controller.ts`, controllerContent);
  createFile(
    path.join(baseDir, 'controllers.interfaces'),
    `${name}.controller.interface.ts`,
    controllerInterfaceContent
  );
}

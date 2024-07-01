import path from 'path';
import { createFile } from '../utils';

export function generateRoutes(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const routeContent = `
export class ${name.charAt(0).toUpperCase() + name.slice(1)}Routes {
// Routes here
}
  `.trim();

  createFile(path.join(baseDir, 'routes'), `${name}.routes.ts`, routeContent);
}

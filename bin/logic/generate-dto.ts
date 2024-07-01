import path from 'path';
import { capitalize, createFile } from '../utils';

export function generateDto(name: string) {
  const baseDir = path.join(process.cwd(), 'src');

  const dtoContent = `
export class ${capitalize(name)}DTO {
//
}`.trim();

  createFile(path.join(baseDir, 'dto'), `${name}.dto.ts`, dtoContent);
}

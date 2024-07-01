import fs from 'fs';
import path from 'path';

function createFile(dir: string, fileName: string, content: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, fileName), content);
}

const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

function copyNobeFile(sourcePath: string, targetPath: string, name: string): void {
  const sourceFilePath = path.join(sourcePath, name);
  const targetFilePath = path.join(targetPath, name);

  if (!fs.existsSync(path.dirname(targetFilePath))) {
    fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
  }

  fs.copyFileSync(sourceFilePath, targetFilePath);
}

export { createFile, capitalize, copyNobeFile };

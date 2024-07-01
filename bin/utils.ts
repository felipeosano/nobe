import fs from 'fs';
import path from 'path';

function createFile(dir: string, fileName: string, content: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, fileName), content);
}

export { createFile };

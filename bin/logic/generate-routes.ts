import path from 'path';
import fs from 'fs';
import { capitalize, createFile } from '../utils';

export function generateRoutes(name: string) {
  const baseDir = path.join(process.cwd(), 'src');
  const routeFileName = `${name}.route.ts`;
  const routeVariableName = `${name}Router`;
  const routePath = `./routes/${routeFileName}`;

  const routeContent = `
import { Router } from 'express';
import container from '../container';
import { I${capitalize(name)}Controller } from '../controllers.interfaces/${name}.controller.interface';

const ${routeVariableName} = Router();
const ${name}Controller: I${capitalize(name)}Controller = container.cradle.${capitalize(name)}Controller;

export default ${routeVariableName};`.trim();

  createFile(path.join(baseDir, 'routes'), routeFileName, routeContent);

  const appPath = path.join(baseDir, 'app.ts');
  let appContent = fs.readFileSync(appPath, { encoding: 'utf8' });

  const lastImportIndex = appContent.lastIndexOf('import ');
  const nextLineIndex = appContent.indexOf('\n', lastImportIndex) + 1;
  const importStatement = `import ${routeVariableName} from '${routePath.replace('.ts', '')}';\n`;

  if (lastImportIndex !== -1 && nextLineIndex !== -1) {
    appContent = appContent.substring(0, nextLineIndex) + importStatement + appContent.substring(nextLineIndex);
  }

  const insertPoint = appContent.lastIndexOf('app.listen');
  if (insertPoint !== -1) {
    appContent =
      appContent.substring(0, insertPoint) +
      `app.use('/api/${name}', ${routeVariableName});\n\n` +
      appContent.substring(insertPoint);

    fs.writeFileSync(appPath, appContent, { encoding: 'utf8' });
  }
}

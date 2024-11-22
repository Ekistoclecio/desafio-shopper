import { addAlias } from 'module-alias';
import { resolve } from 'path';

let folder = 'src';
if (
  process.env.TS_NODE_DEV === undefined && // npm run dev
  process.env.TYPEORM_CLI === undefined
) {
  // using typeorm cli
  folder = 'dist'; // running in production
}

addAlias('@', resolve(folder));

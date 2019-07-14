const fs = require('fs-extra');
const path = require('path');
const packages = ['base', 'food', 'foods'];

const distFolder = path.resolve(__dirname, '../dist');
fs.ensureDirSync(distFolder);

for (const pkg of packages) {
  const pkgDistFolder = path.join(__dirname, '../packages/', pkg, './dist');
  const targetFolder = path.join(distFolder, pkg);
  fs.copySync(pkgDistFolder, targetFolder);
}

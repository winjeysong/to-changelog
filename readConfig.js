const fs = require('fs');
const path = require('path');

const cfgPath = path.join(process.cwd(), '.tochangelogrc');
const isCfgExisted = fs.existsSync(cfgPath);
const pkgJsonPath = path.join(process.cwd(), 'package.json');
const isPkgJsonExisted = fs.existsSync(pkgJsonPath);
let cfg = {};
let pkgJson = {};
let version = '';
try {
  if (isCfgExisted) {
    cfg = JSON.parse(fs.readFileSync(cfgPath));
    if (cfg.version) {
      version = cfg.version;
    } else {
      if (isPkgJsonExisted && pkgJson.version) {
        pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));
        version = pkgJson.version;
      } else {
        throw new Error(`Version is required in '.tochangelogrc', when 'package.json' is not existed.`);
      }
    }
  }
} catch(e) {
  throw new Error(e.message);
}

module.exports = { ...cfg, version };

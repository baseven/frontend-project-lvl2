import yml from 'js-yaml';
import ini from 'ini';

const parsingMethods = {
  '.json': JSON.parse,
  '.yml': yml.safeLoad,
  '.ini': ini.parse,
};

export default extension => parsingMethods[extension];

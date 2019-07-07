import yml from 'js-yaml';
import ini from 'ini';

const parsingMethods = [
  {
    format: '.json',
    parse: JSON.parse,
  },
  {
    format: '.yml',
    parse: yml.safeLoad,
  },
  {
    format: '.ini',
    parse: ini.parse,
  },
];
export default extension => parsingMethods.find(({ format }) => format === extension).parse;

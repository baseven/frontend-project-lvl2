import path from 'path';
import fs from 'fs';
import yml from 'js-yaml';
import ini from 'ini';

const getAbsPathToFile = (pathToFile) => {
  const absPathToFile = path.isAbsolute(pathToFile)
    ? pathToFile
    : `${process.cwd()}/${pathToFile}`;

  return absPathToFile;
};

const getContent = absPathToFile => fs.readFileSync(absPathToFile, 'utf-8');

const formats = [
  {
    type: '.json',
    parse: JSON.parse,
  },
  {
    type: '.yml',
    parse: yml.safeLoad,
  },
  {
    type: '.ini',
    parse: ini.parse,
  },
];

const parseFile = (pathToFile) => {
  const absPathToFile = getAbsPathToFile(pathToFile);
  const content = getContent(absPathToFile);
  const extension = path.extname(absPathToFile);

  const selectTypeOfFormat = ({ type }) => type === extension;
  const objFromFile = formats.find(selectTypeOfFormat).parse(content);

  return objFromFile;
};

export default parseFile;

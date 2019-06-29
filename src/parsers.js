import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

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
    parse: yaml.safeLoad,
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

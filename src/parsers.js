import path from 'path';
import fs from 'fs';

const getAbsPathToFile = (pathToFile) => {
  const absPathToFile = path.isAbsolute(pathToFile)
    ? pathToFile
    : `${process.cwd()}/${pathToFile}`;
  return absPathToFile;
};
// `${__dirname}/${pathToFile}` выдает dist
// __dirname не является глобальным; он локален для текущего модуля,
// поэтому каждый файл имеет свое локальное, другое значение.
// Если вам нужен корневой каталог запущенного процесса,
// вы, вероятно, захотите использовать process.cwd()

const getContent = absPathToFile => fs.readFileSync(absPathToFile, 'utf-8');

const parseFile = (pathToFile) => {
  const absPathToFile = getAbsPathToFile(pathToFile);
  const objFromFile = JSON.parse(getContent(absPathToFile));
  return objFromFile;
};

export default parseFile;

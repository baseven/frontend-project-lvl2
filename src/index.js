import _ from 'lodash';
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

const makeСomparison = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);
  const keys = _.union(firstObjKeys, secondObjKeys);

  const genElement = (key) => {
    const element = firstObj[key] !== secondObj[key]
      ? `\t+ ${key}: ${secondObj[key]}\n\t- ${key}: ${firstObj[key]}`
      : `\t  ${key}: ${secondObj[key]}`;
    return element;
  };

  const operations = [
    {
      firstArg: true,
      secondArg: true,
      operation: key => genElement(key),
    },
    {
      firstArg: true,
      secondArg: false,
      operation: key => `\t- ${key}: ${firstObj[key]}`,
    },
    {
      firstArg: false,
      secondArg: true,
      operation: key => `\t+ ${key}: ${secondObj[key]}`,
    },
  ];

  const getOperation = (key) => {
    const selectOperation = ({ firstArg, secondArg }) => firstArg === _.has(firstObj, key)
    && secondArg === _.has(secondObj, key);
    return operations.find(selectOperation);
  };

  const func = (acc, value) => {
    const newElement = getOperation(value).operation(value);
    return [...acc, newElement];
  };

  const comparisonResults = keys.reduce(func, []);
  return `{\n${comparisonResults.join('\n')}\n}`;
};

const makeDiff = (pathToFile1, pathToFile2) => {
  const absPathToFile1 = getAbsPathToFile(pathToFile1);
  const absPathToFile2 = getAbsPathToFile(pathToFile2);

  const objFromFile1 = JSON.parse(getContent(absPathToFile1));
  const objFromFile2 = JSON.parse(getContent(absPathToFile2));

  const diff = makeСomparison(objFromFile1, objFromFile2);
  return diff;
};

export default makeDiff;

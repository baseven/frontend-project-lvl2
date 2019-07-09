import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import getRender from './formatters';

const getAbsPathToFile = (pathToFile) => {
  const absPathToFile = path.isAbsolute(pathToFile)
    ? pathToFile
    : `${process.cwd()}/${pathToFile}`;

  return absPathToFile;
};

const getContent = absPathToFile => fs.readFileSync(absPathToFile, 'utf-8');

const getObject = (pathToFile) => {
  const absPathToFile = getAbsPathToFile(pathToFile);
  const content = getContent(absPathToFile);
  const extension = path.extname(absPathToFile);

  const parse = getParser(extension);

  return parse(content);
};

const getOperation = (oldObj, newObj, key) => {
  const operations = [
    {
      check: arg => !(_.has(oldObj, arg)),
      operation: 'added',
    },
    {
      check: arg => !(_.has(newObj, arg)),
      operation: 'removed',
    },
    {
      check: arg => _.isObject(oldObj[arg]) && _.isObject(newObj[arg]),
      operation: 'complex value',
    },
    {
      check: arg => oldObj[arg] === newObj[arg],
      operation: 'unchanged',
    },
    {
      check: arg => oldObj[arg] !== newObj[arg],
      operation: 'updated',
    },
  ];

  return operations.find(({ check }) => check(key)).operation;
};

const makeAST = (oldObj, newObj) => {
  const keys = _.union(Object.keys(oldObj), Object.keys(newObj));

  const buildNode = (key) => {
    const node = {
      property: `${key}`,
      operation: getOperation(oldObj, newObj, key),
    };

    if (node.operation === 'complex value') {
      node.children = makeAST(oldObj[key], newObj[key]);
      return node;
    }

    node.data = {
      oldObjValue: oldObj[key],
      newObjValue: newObj[key],
    };

    return node;
  };

  const ast = keys.map(buildNode);

  return ast;
};

const makeDiff = (pathToOldFile, pathToNewFile, format = 'complex') => {
  const objFromOldFile = getObject(pathToOldFile);
  const objFromNewFile = getObject(pathToNewFile);

  const render = getRender(format);

  const ast = makeAST(objFromOldFile, objFromNewFile);

  const diff = render(ast);

  return diff;
};

export default makeDiff;

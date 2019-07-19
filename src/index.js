import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import getParser from './parsers';
import getRender from './formatters';

const getContent = absPathToFile => fs.readFileSync(absPathToFile, 'utf-8');

const getObject = (pathToFile) => {
  const absPathToFile = path.resolve(pathToFile);
  const content = getContent(absPathToFile);
  const extension = path.extname(absPathToFile);

  const parse = getParser(extension);

  return parse(content);
};

const getNode = (arg, oldObj, newObj, makeAST) => {
  const nodeTypes = [
    {
      check: () => !(_.has(oldObj, arg)),
      buildNode: () => ({ property: arg, type: 'added', newData: newObj[arg] }),
    },
    {
      check: () => !(_.has(newObj, arg)),
      buildNode: () => ({ property: arg, type: 'removed', oldData: oldObj[arg] }),
    },
    {
      check: () => _.isObject(oldObj[arg]) && _.isObject(newObj[arg]),
      buildNode: () => ({ property: arg, type: 'nested', children: makeAST(oldObj[arg], newObj[arg]) }),
    },
    {
      check: () => oldObj[arg] === newObj[arg],
      buildNode: () => ({ property: arg, type: 'unchanged', oldData: oldObj[arg] }),
    },
    {
      check: () => oldObj[arg] !== newObj[arg],
      buildNode: () => ({
        property: arg,
        type: 'updated',
        oldData: oldObj[arg],
        newData: newObj[arg],
      }),
    },
  ];

  return nodeTypes.find(({ check }) => check()).buildNode();
};

const makeAST = (oldObj, newObj) => {
  const keys = _.union(Object.keys(oldObj), Object.keys(newObj));

  const ast = keys.map(key => getNode(key, oldObj, newObj, makeAST));

  return ast;
};

const makeDiff = (pathToOldFile, pathToNewFile, format = 'pretty') => {
  const objFromOldFile = getObject(pathToOldFile);
  const objFromNewFile = getObject(pathToNewFile);

  const render = getRender(format);

  const ast = makeAST(objFromOldFile, objFromNewFile);

  const diff = render(ast);

  return diff;
};

export default makeDiff;

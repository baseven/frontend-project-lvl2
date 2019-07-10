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

const makeAST = (oldObj, newObj) => {
  const keys = _.union(Object.keys(oldObj), Object.keys(newObj));

  const getNode = (arg) => {
    const nodeTypes = [
      {
        check: () => !(_.has(oldObj, arg)),
        buildNode: () => ({ property: `${arg}`, type: 'added', data: newObj[arg] }),
      },
      {
        check: () => !(_.has(newObj, arg)),
        buildNode: () => ({ property: `${arg}`, type: 'removed', data: oldObj[arg] }),
      },
      {
        check: () => _.isObject(oldObj[arg]) && _.isObject(newObj[arg]),
        buildNode: () => ({ property: `${arg}`, type: 'nested', children: makeAST(oldObj[arg], newObj[arg]) }),
      },
      {
        check: () => oldObj[arg] === newObj[arg],
        buildNode: () => ({ property: `${arg}`, type: 'unchanged', data: oldObj[arg] }),
      },
      {
        check: () => oldObj[arg] !== newObj[arg],
        buildNode: () => ({
          property: `${arg}`,
          type: 'updated',
          data: {
            oldValue: oldObj[arg],
            newValue: newObj[arg],
          },
        }),
      },
    ];

    return nodeTypes.find(({ check }) => check()).buildNode();
  };

  const ast = keys.map(getNode);

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

import _ from 'lodash';
import parse from './parsers';
import getRender from './formatters/index';

const getOperation = (oldObj, newObj, key) => {
  const operations = [
    {
      selectCondition: arg => !(_.has(oldObj, arg)),
      operation: 'added',
    },
    {
      selectCondition: arg => !(_.has(newObj, arg)),
      operation: 'removed',
    },
    {
      selectCondition: arg => oldObj[arg] instanceof Object && newObj[arg] instanceof Object,
      operation: 'complex value',
    },
    {
      selectCondition: arg => oldObj[arg] === newObj[arg],
      operation: 'unchanged',
    },
    {
      selectCondition: arg => oldObj[arg] !== newObj[arg],
      operation: 'updated',
    },
  ];

  return operations.find(({ selectCondition }) => selectCondition(key)).operation;
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

const makeDiff = (pathToOldFile, pathToNewFile, format = 'default') => {
  const objFromOldFile = parse(pathToOldFile);
  const objFromNewFile = parse(pathToNewFile);

  const render = getRender(format);

  const ast = makeAST(objFromOldFile, objFromNewFile);

  const diff = render(ast);

  return diff;
};

export default makeDiff;

import _ from 'lodash';
import parse from './parsers';
import getRender from './formatters/index';

const makeAST = (oldObj, newObj) => {
  const keys = _.union(Object.keys(oldObj), Object.keys(newObj));

  const operations = [
    {
      condition: arg => !(_.has(oldObj, arg)),
      operation: 'add',
    },
    {
      condition: arg => !(_.has(newObj, arg)),
      operation: 'delete',
    },
    {
      condition: arg => oldObj[arg] instanceof Object && newObj[arg] instanceof Object,
      operation: 'compare',
    },
    {
      condition: arg => oldObj[arg] === newObj[arg],
      operation: 'unmodify',
    },
    {
      condition: arg => oldObj[arg] !== newObj[arg],
      operation: 'modify',
    },
  ];

  const getOperation = arg => operations.find(({ condition }) => condition(arg)).operation;

  const buildNode = (key) => {
    const node = {
      keyName: `${key}`,
      operation: getOperation(key),
    };

    if (node.operation === 'compare') {
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

const makeDiff = (pathToOldFile, pathToNewFile, format = 'standard') => {
  const objFromOldFile = parse(pathToOldFile);
  const objFromNewFile = parse(pathToNewFile);

  const render = getRender(format);

  const ast = makeAST(objFromOldFile, objFromNewFile);

  const diff = render(ast);

  return diff;
};

export default makeDiff;

import _ from 'lodash';
import parseFile from './parsers';
import genElement from './renders';

const operations = [
  {
    firstArg: true,
    secondArg: true,
    operation: 'modifyOrNot',
  },
  {
    firstArg: true,
    secondArg: false,
    operation: 'delete',
  },
  {
    firstArg: false,
    secondArg: true,
    operation: 'add',
  },
];

const makeСomparison = (firstObj, secondObj) => {
  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);
  const keys = _.union(firstObjKeys, secondObjKeys);

  const getOperation = (key) => {
    const selectOperation = ({ firstArg, secondArg }) => firstArg === _.has(firstObj, key)
    && secondArg === _.has(secondObj, key);
    return operations.find(selectOperation).operation;
  };

  const func = (acc, value) => {
    const newElement = genElement(value, firstObj, secondObj, getOperation(value));
    return [...acc, newElement];
  };

  const comparisonResults = keys.reduce(func, []);
  return `{\n${comparisonResults.join('\n')}\n}`;
};

const makeDiff = (pathToFile1, pathToFile2) => {
  const objFromFile1 = parseFile(pathToFile1);
  const objFromFile2 = parseFile(pathToFile2);

  const diff = makeСomparison(objFromFile1, objFromFile2);
  return diff;
};

export default makeDiff;

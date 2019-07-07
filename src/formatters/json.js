import stringify from './utils';

const getObject = (operation, data) => {
  const renderMethodsForOperations = {
    added: { status: operation, currentValue: stringify(data.newObjValue) },
    removed: { status: operation, previousValue: stringify(data.oldObjValue) },
    updated: {
      status: operation,
      currentValue: stringify(data.newObjValue),
      previousValue: stringify(data.oldObjValue),
    },
    unchanged: { status: operation, currentValue: stringify(data.oldObjValue) },
  };
  return renderMethodsForOperations[operation];
};

const makeComplexObject = (ast) => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      operation,
      data,
      children,
    } = value;

    if (!children) {
      acc[property] = getObject(operation, data);
      return acc;
    }
    acc[property] = makeComplexObject(children);
    return acc;
  };
  return ast.reduce(makeNodeProcessing, {});
};

export default ast => JSON.stringify(makeComplexObject(ast), null, 4);

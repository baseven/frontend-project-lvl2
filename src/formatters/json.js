const customStringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (parseInt(value, 10)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const getInfo = (operation, data) => {
  const operations = {
    added: { status: operation, currentValue: customStringify(data.newObjValue) },
    removed: { status: operation, previousValue: customStringify(data.oldObjValue) },
    updated: {
      status: operation,
      currentValue: customStringify(data.newObjValue),
      previousValue: customStringify(data.oldObjValue),
    },
    unchanged: { status: operation, currentValue: customStringify(data.oldObjValue) },
  };
  return operations[operation];
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
      acc[property] = getInfo(operation, data);
      return acc;
    }
    acc[property] = makeComplexObject(children);
    return acc;
  };
  return ast.reduce(makeNodeProcessing, {});
};

export default ast => JSON.stringify(makeComplexObject(ast), null, 4);

const customStringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (parseInt(value, 10)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const methods = {
  add: data => `was added with value: ${customStringify(data.newObjValue)}`,
  delete: () => 'was removed',
  modify: data => `was updated. From ${customStringify(data.oldObjValue)} to ${customStringify(data.newObjValue)}`,
};

const getString = (property, operation, data) => `Property '${property}' ${methods[operation](data)}\n`;


const render = (ast, path = '') => {
  const func = (acc, value) => {
    const {
      keyName,
      operation,
      data,
      children,
    } = value;

    if (operation === 'unmodify') {
      return acc;
    }

    if (!children) {
      const string = getString(path.concat(`${keyName}`), operation, data);
      return acc.concat(string);
    }
    const substring = render(children, path.concat(`${keyName}.`));
    return acc.concat(substring);
  };

  return ast.reduce(func, '');
};

export default render;

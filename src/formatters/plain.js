import _ from 'lodash';

const customStringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
};

const renderMethodsForOperations = {
  added: data => `was added with value: ${customStringify(data.newObjValue)}`,
  removed: () => 'was removed',
  updated: data => `was updated. From ${customStringify(data.oldObjValue)} to ${customStringify(data.newObjValue)}`,
};

const getString = (property, operation, data) => `Property '${property}' ${renderMethodsForOperations[operation](data)}\n`;

const render = (ast, path = '') => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      operation,
      data,
      children,
    } = value;

    if (operation === 'unchanged') {
      return acc;
    }

    if (!children) {
      const string = getString(path.concat(`${property}`), operation, data);
      return acc.concat(string);
    }

    const substring = render(children, path.concat(`${property}.`));
    return acc.concat(substring);
  };

  return ast.reduce(makeNodeProcessing, '');
};

export default render;

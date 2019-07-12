import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
};

const renderMethods = {
  added: (oldData, newData) => `was added with value: ${stringify(newData)}`,
  removed: () => 'was removed',
  updated: (oldData, newData) => `was updated. From ${stringify(oldData)} to ${stringify(newData)}`,
};

const getString = (property, type, oldData, newData) => `Property '${property}' ${renderMethods[type](oldData, newData)}\n`;

const render = (ast, path = '') => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      type,
      oldData,
      newData,
      children,
    } = value;

    if (type === 'unchanged') {
      return acc;
    }

    if (type === 'nested') {
      const substring = render(children, path.concat(`${property}.`));
      return acc.concat(substring);
    }

    const string = getString(path.concat(`${property}`), type, oldData, newData);
    return acc.concat(string);
  };

  return ast.reduce(makeNodeProcessing, '');
};

export default render;

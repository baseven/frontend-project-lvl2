import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
}

const renderMethods = {
  added: data => `was added with value: ${stringify(data)}`,
  removed: () => 'was removed',
  updated: data => `was updated. From ${stringify(data.oldValue)} to ${stringify(data.newValue)}`,
};

const getString = (property, type, data) => `Property '${property}' ${renderMethods[type](data)}\n`;

const render = (ast, path = '') => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      type,
      data,
      children,
    } = value;

    if (type === 'unchanged') {
      return acc;
    }

    if (type === 'nested') {
      const substring = render(children, path.concat(`${property}.`));
      return acc.concat(substring);
    }

    const string = getString(path.concat(`${property}`), type, data);
    return acc.concat(string);
  };

  return ast.reduce(makeNodeProcessing, '');
};

export default render;

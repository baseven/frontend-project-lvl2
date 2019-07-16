import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
};

const renderMethods = {
  added: (property, node) => `Property '${property}' was added with value: ${stringify(node.newData)}\n`,
  removed: property => `Property '${property}' was removed\n`,
  updated: (property, node) => `Property '${property}' was updated. From ${stringify(node.oldData)} to ${stringify(node.newData)}\n`,
  unchanged: () => '',
  nested: (property, node, render) => render(node.children, property),
};

const render = (ast, path = '') => {
  const makeNodeProcessing = (acc, node) => {
    const { property, type } = node;

    const updatedProperty = path ? path.concat(`.${property}`) : `${property}`;

    const string = renderMethods[type](updatedProperty, node, render);

    return acc.concat(string);
  };

  return ast.reduce(makeNodeProcessing, '');
};

export default render;

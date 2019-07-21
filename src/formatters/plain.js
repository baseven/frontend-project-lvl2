import _ from 'lodash';

const newLine = '\n';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
};

const renderMethods = {
  added: (property, node) => `Property '${property}' was added with value: ${stringify(node.newData)}`,
  removed: property => `Property '${property}' was removed`,
  updated: (property, node) => `Property '${property}' was updated. From ${stringify(node.oldData)} to ${stringify(node.newData)}`,
  unchanged: () => null,
  nested: (property, node, render) => render(node.children, property),
};

const render = (ast, path = '') => {
  const makeNodeProcessing = (acc, node) => {
    const { property, type } = node;

    const updatedProperty = path ? path.concat(`.${property}`) : `${property}`;

    const string = renderMethods[type](updatedProperty, node, render);

    return _.flatten([...acc, string]);
  };

  const strings = ast.reduce(makeNodeProcessing, [])
    .filter(_.identity)
    .join(`${newLine}`);
  return strings;
};

export default render;

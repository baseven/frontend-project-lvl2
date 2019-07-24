import _ from 'lodash';

const [tab, newLine] = ['  ', '\n'];

const customStringify = (data, depth) => {
  if (!(_.isObject(data))) {
    return `${data}`;
  }
  const element = JSON.stringify(data)
    .replace('{', '')
    .replace('}', '')
    .split('"')
    .join('');

  return `{${newLine}${tab.repeat(depth + 2)}${element}${newLine}${tab.repeat(depth + 1)}}`;
};

const makeString = (mathSymbol, property, data, depth) => `${tab.repeat(depth)}${mathSymbol} ${property}: ${data}`;

const renderMethods = {
  added: (node, depth) => makeString('+', node.property, customStringify(node.newData, depth), depth),
  removed: (node, depth) => makeString('-', node.property, customStringify(node.oldData, depth), depth),
  updated: (node, depth) => [
    makeString('+', node.property, customStringify(node.newData, depth), depth),
    makeString('-', node.property, customStringify(node.oldData, depth), depth),
  ],
  unchanged: (node, depth) => makeString(' ', node.property, customStringify(node.oldData, depth), depth),
  nested: (node, depth, render) => makeString(' ', node.property, render(node.children, depth + 1), depth),
};

const render = (ast, depth = 1) => {
  const makeNodeProcessing = (node) => {
    const { type } = node;
    const string = renderMethods[type](node, depth, render);
    return string;
  };

  const indent = tab.repeat(depth === 1 ? 0 : depth);
  const strings = ast.map(makeNodeProcessing);

  const content = _.flattenDeep(strings).join(newLine);

  return `{${newLine}${content}${newLine}${indent}}`;
};

export default render;

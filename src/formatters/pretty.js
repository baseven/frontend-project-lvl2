import _ from 'lodash';

const [tab, newLine] = ['  ', '\n'];

const stringify = (value, numOfTabs) => {
  if (!(_.isObject(value))) {
    return `${value}`;
  }
  const element = JSON.stringify(value)
    .replace('{', '')
    .replace('}', '')
    .split('"')
    .join('');

  return `{${newLine}${tab.repeat(numOfTabs + 2)}${element}${newLine}${tab.repeat(numOfTabs + 1)}}`;
};

const formString = (mathSymbol, property, data, tabIndex) => `${newLine}${tab.repeat(tabIndex)}${mathSymbol} ${property}: `
  .concat(stringify(data, tabIndex));

const renderMethods = {
  added: (property, oldData, newData, tabIndex) => formString('+', property, newData, tabIndex),
  removed: (property, oldData, newData, tabIndex) => formString('-', property, oldData, tabIndex),
  updated: (property, oldData, newData, tabIndex) => formString('+', property, newData, tabIndex)
    .concat(formString('-', property, oldData, tabIndex)),
  unchanged: (property, oldData, newData, tabIndex) => formString(' ', property, oldData, tabIndex),
};

const render = (ast, tabIndex = 1) => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      type,
      oldData,
      newData,
      children,
    } = value;

    if (type === 'nested') {
      const substring = render(children, tabIndex + 1);
      return acc.concat(`${newLine}${tab.repeat(tabIndex + 1)}  ${property}: ${substring}`);
    }
    const string = renderMethods[type](property, oldData, newData, tabIndex + 1);
    return acc.concat(string);
  };

  const allStrings = ast.reduce(makeNodeProcessing, '');
  return `{${allStrings}${newLine}${tab.repeat(tabIndex === 1 ? 0 : tabIndex + 1)}}`;
};

export default render;

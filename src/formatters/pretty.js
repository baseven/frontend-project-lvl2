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
  added: (property, data, tabIndex) => formString('+', property, data, tabIndex),
  removed: (property, data, tabIndex) => formString('-', property, data, tabIndex),
  updated: (property, data, tabIndex) => formString('+', property, data.newValue, tabIndex)
    .concat(formString('-', property, data.oldValue, tabIndex)),
  unchanged: (property, data, tabIndex) => formString(' ', property, data, tabIndex),
};

const render = (ast, tabIndex = 1) => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      type,
      data,
      children,
    } = value;

    if (type === 'nested') {
      const substring = render(children, tabIndex + 1);
      return acc.concat(`${newLine}${tab.repeat(tabIndex + 1)}  ${property}: ${substring}`);
    }
    const string = renderMethods[type](property, data, tabIndex + 1);
    return acc.concat(string);
  };

  const allStrings = ast.reduce(makeNodeProcessing, '');
  return `{${allStrings}${newLine}${tab.repeat(tabIndex === 1 ? 0 : tabIndex + 1)}}`;
};

export default render;

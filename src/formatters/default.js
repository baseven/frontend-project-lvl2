const [tab, newLine] = ['  ', '\n'];

const customStringify = (value, numOfTabs) => {
  if (value instanceof Object) {
    const element = JSON.stringify(value)
      .replace('{', '')
      .replace('}', '')
      .split('"')
      .join('');
    return `{${newLine}${tab.repeat(numOfTabs + 2)}${element}${newLine}${tab.repeat(numOfTabs + 1)}}`;
  }
  return `${value}`;
};

const formString = (matSymbol, property, data, tabIndex) => `${newLine}${tab.repeat(tabIndex)}${matSymbol} ${property}: `
  .concat(customStringify(data, tabIndex));

const methods = {
  added: (property, data, tabIndex) => formString('+', property, data.newObjValue, tabIndex),
  removed: (property, data, tabIndex) => formString('-', property, data.oldObjValue, tabIndex),
  updated: (property, data, tabIndex) => formString('+', property, data.newObjValue, tabIndex)
    .concat(formString('-', property, data.oldObjValue, tabIndex)),
  unchanged: (property, data, tabIndex) => formString(' ', property, data.oldObjValue, tabIndex),
};

const render = (ast, tabIndex = 1) => {
  const makeNodeProcessing = (acc, value) => {
    const {
      property,
      operation,
      data,
      children,
    } = value;

    if (!children) {
      const string = methods[operation](property, data, tabIndex + 1);
      return acc.concat(string);
    }
    const substring = render(children, tabIndex + 1);
    return acc.concat(`${newLine}${tab.repeat(tabIndex + 1)}  ${property}: ${substring}`);
  };

  const allStrings = ast.reduce(makeNodeProcessing, '');
  return `{${allStrings}${newLine}${tab.repeat(tabIndex === 1 ? 0 : tabIndex + 1)}}`;
};

export default render;

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

const methods = {
  add: (key, data, numOfTabs) => `${newLine}${tab.repeat(numOfTabs)}+ ${key}: `.concat(customStringify(data.newObjValue, numOfTabs)),
  delete: (key, data, numOfTabs) => `${newLine}${tab.repeat(numOfTabs)}- ${key}: `.concat(customStringify(data.oldObjValue, numOfTabs)),
  modify: (key, data, numOfTabs) => `${newLine}${tab.repeat(numOfTabs)}+ ${key}: ${customStringify(data.newObjValue, numOfTabs)}${newLine}${tab.repeat(numOfTabs)}- ${key}: ${customStringify(data.oldObjValue, numOfTabs)}`,
  unmodify: (key, data, numOfTabs) => `${newLine}${tab.repeat(numOfTabs)}  ${key}: `.concat(customStringify(data.oldObjValue, numOfTabs)),
};

const render = (ast, tabIndex = 1) => {
  const func = (acc, value) => {
    const {
      keyName,
      operation,
      data,
      children,
    } = value;

    if (!children) {
      const string = methods[operation](keyName, data, tabIndex + 1);
      return acc.concat(string);
    }
    const substring = render(children, tabIndex + 1);
    return acc.concat(`${newLine}${tab.repeat(tabIndex + 1)}  ${keyName}: ${substring}`);
  };

  const allStrings = ast.reduce(func, '');
  return `{${allStrings}${newLine}${tab.repeat(tabIndex === 1 ? 0 : tabIndex + 1)}}`;
};

export default render;

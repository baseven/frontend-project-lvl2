const genElement = (key, firstObj, secondObj, operation) => {
  const formElement = (arg) => {
    const element = firstObj[arg] !== secondObj[arg]
      ? `\t+ ${arg}: ${secondObj[arg]}\n\t- ${arg}: ${firstObj[arg]}`
      : `\t  ${arg}: ${secondObj[arg]}`;
    return element;
  };

  const methods = {
    modifyOrNot: arg => formElement(arg),
    delete: arg => `\t- ${arg}: ${firstObj[arg]}`,
    add: arg => `\t+ ${arg}: ${secondObj[arg]}`,
  };

  const newElement = methods[operation](key);
  return newElement;
};

export default genElement;

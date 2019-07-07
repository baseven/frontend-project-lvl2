import _ from 'lodash';

export default (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (parseInt(value, 10) || value === 0) ? `${value}` : `'${value}'`;
};

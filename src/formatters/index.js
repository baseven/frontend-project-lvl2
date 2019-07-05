import defaultRender from './default';
import plainRender from './plain';
import jsonRender from './json';

const getRender = (format) => {
  const formatters = {
    default: defaultRender,
    plain: plainRender,
    json: jsonRender,
  };

  return formatters[format];
};

export default getRender;

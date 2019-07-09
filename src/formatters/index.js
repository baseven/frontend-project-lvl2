import complexRender from './complex';
import plainRender from './plain';
import jsonRender from './json';

const getRender = (format) => {
  const formatters = {
    complex: complexRender,
    plain: plainRender,
    json: jsonRender,
  };

  return formatters[format];
};

export default getRender;

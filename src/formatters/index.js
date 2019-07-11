import prettyRender from './pretty';
import plainRender from './plain';
import jsonRender from './json';

const getRender = (format) => {
  const formatters = {
    pretty: prettyRender,
    plain: plainRender,
    json: jsonRender,
  };

  return formatters[format];
};

export default getRender;

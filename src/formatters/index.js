import standardRender from './standard';
import plainRender from './plain';


const getRender = (format) => {
  const formatters = {
    standard: standardRender,
    plain: plainRender,
  };

  return formatters[format];
};

export default getRender;

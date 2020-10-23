import React, {
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import hydroIdenticon from '../../services/flakeGenerator.min';

function Identicon(props) {
  const {
    seed,
    size,
  } = props;

  const iconRef = useRef();

  useEffect(() => {
    const icon = hydroIdenticon.create({
      seed,
      size,
    });

    iconRef.current.innerHTML = '';
    iconRef.current.appendChild(icon);
  }, [iconRef, seed]);

  return (
    <div ref={iconRef} />
  );
}

Identicon.propTypes = {
  seed: PropTypes.string,
  size: PropTypes.number,
};

Identicon.defaultProps = {
  seed: 'test',
  size: '100',
};

export default Identicon;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './style.css';

export function Button({ children, ...rest }) {
  return (
    <button
      className={style.button}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export function ButtonLink({ children, ...rest }) {
  return (
    <Link
      className={style.button}
      {...rest}
    >
      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.element.isRequired,
};

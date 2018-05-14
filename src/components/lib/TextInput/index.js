import React from 'react';
import style from './style.css';

export default function TextInput({ ...rest }) {
  return (
    <input
      className={style.input}
      {...rest}
    />
  );
}

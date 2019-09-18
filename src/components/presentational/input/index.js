import React from 'react';
import './styles.scss';

const Input = ({onChange, ...rest}) => {
  console.log('render Input component');
  return (
    <input className="Input" {...rest} onChange={e => onChange(e.target.value)}/>
  );
};

export default Input;
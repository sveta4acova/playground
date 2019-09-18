import React from 'react';
import './styles.scss';

const Button = ({children, ...rest}) => {
  console.log('render Button component');
  return <button className="Button" {...rest}>{children}</button>;
};

export default Button;
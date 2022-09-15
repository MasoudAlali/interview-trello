import React, { ButtonHTMLAttributes } from 'react';
import "./index.scss";

interface Props extends ButtonHTMLAttributes<any> {
}

const Button = ({ className, children, ...rest }: Props) => {
  return <button className={`button ${className || ""}`} {...rest}>{children}</button>
}

export default Button;

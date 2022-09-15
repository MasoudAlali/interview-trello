import React, { InputHTMLAttributes } from 'react';
import "./index.scss";

interface Props extends InputHTMLAttributes<any> {
  label?: string;
  containerClassName?: string;
}

const Input = ({ className, containerClassName, children, label, ...rest }: Props) => {
  return <div className={`input__wrapper ${containerClassName}`}>
    {label && <span className="input__label">{label}</span>}
    <input className={`input ${className}`} {...rest}>{children}</input>
  </div>
}

export default Input;

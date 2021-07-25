import React from 'react';
import { HTMLAttributes } from 'react-transition-group/node_modules/@types/react';
import { ButtonCustom } from './styles';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  colorTheme: 'primary' | 'danger' | 'secondary' | undefined;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ children, type, ...rest }) => {
  return (
    <>
      <ButtonCustom {...rest}>{children}</ButtonCustom>
    </>
  );
};

export default Button;

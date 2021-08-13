import { Field, useField } from 'formik';
import React, { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';

import { Container } from './style';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  label?: string;
  name: string;
  type?: string;
  errors?: any;
  disabled?: string;
  cursor?: string;
  value?: string;
}

const Checkbox: React.FC<InputProps> = ({
  disabled,
  cursor,
  children,
  label,
  Icon,
  ...rest
}) => {
  const field = useField({
    ...rest,
    children,
  });

  return (
    <>
      <Container>
        <Field type="checkbox" {...rest}>
          {children}
        </Field>
        <label htmlFor={rest.id}>{label}</label>

        <FaExclamationCircle
          size={24}
          color="red"
          visibility={field[1].error ? 'visible' : 'hidden'}
        />
      </Container>
    </>
  );
};

export default Checkbox;

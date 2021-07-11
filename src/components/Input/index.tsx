import { Field, ErrorMessage, useField } from 'formik';
import React, { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';

import { ContentInput, Container, MessageError } from './style';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  label: string;
  name: string;
  type?: string;
  errors?: any;
  disabled?: string;
  cursor?: string;
}

const Input: React.FC<InputProps> = ({
  disabled,
  cursor,
  children,
  label,
  Icon,
  ...rest
}) => {
  const field = useField({
    ...rest,
  });

  return (
    <>
      <Container>
        <label>{label}</label>
        <MessageError>
          <ErrorMessage name={rest.name} />
        </MessageError>

        <ContentInput error={!!field[1].error}>
          <Field cursor="not-allowed" disabled={disabled} {...rest} />

          <FaExclamationCircle
            size={24}
            color="red"
            visibility={field[1].error ? 'visible' : 'hidden'}
          />
        </ContentInput>
      </Container>
    </>
  );
};

export default Input;

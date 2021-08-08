import { Field, ErrorMessage, useField } from 'formik';
import React, { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';

import { ContentInput, Container, MessageError } from './style';

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
    children
  });


  return (
    <>
      <Container>
        <label>{label}</label>
        <MessageError>
          <ErrorMessage name={rest.name} />
        </MessageError>

        <ContentInput error={!!field[1].error}>
     
          <Field as="select" fierl {...rest}>
            {children}
           </Field>

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

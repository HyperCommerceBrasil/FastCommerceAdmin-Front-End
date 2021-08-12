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
  step?: string;
  min?: string;
  mask?: 'currency';
}

const Input: React.FC<InputProps> = ({
  disabled,
  cursor,
  children,
  label,
  Icon,
  mask,
  ...rest
}) => {
  const fieldCustom = useField({
    ...rest,
  });

  return (
    <>
      <Container>
        <label>{label}</label>
        <MessageError>
          <ErrorMessage name={rest.name} />
        </MessageError>

        <Field cursor="not-allowed" disabled={disabled} {...rest}>
          {({ field, form: { touched, errors }, meta }: any) => (
            <ContentInput error={!!fieldCustom[1].error}>
              <input
                {...field}
                type="text"
                onChange={evt => {
                  if (mask !== 'currency') {
                    fieldCustom[2].setValue(evt.target.value);
                  } else {
                    const valNumeric = evt.target.value.replace(/\D+/g, '');

                    const formatVirgula = Number(valNumeric) / 100;
                    const valFormated = Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(formatVirgula));

                    fieldCustom[2].setValue(valFormated);
                  }
                }}
              ></input>
            </ContentInput>
          )}
        </Field>

        <FaExclamationCircle
          size={24}
          color="red"
          visibility={fieldCustom[1].error ? 'visible' : 'hidden'}
        />
      </Container>
    </>
  );
};

export default Input;

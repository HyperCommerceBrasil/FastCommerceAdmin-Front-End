import { Field, useField } from 'formik';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';
import { Switch, FormControlLabel } from '@material-ui/core';

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

const SwitchComponent: React.FC<InputProps> = ({
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

  const [toggle, setToggle] = useState(field[1].value);

  const handleToggle = () => {
    toggle ? setToggle(false) : setToggle(true);
    field[2].setValue(!toggle);
  };

  return (
    <>
      <Container {...rest} id="container">
        <FormControlLabel
          control={
            <Field
              label="Remember Me"
              component={Switch}
              onChange={handleToggle}
              value={field[1].value}
              checked={field[1].value}
              {...rest}
            />
          }
          label={label}
        />

        <FaExclamationCircle
          size={24}
          color="red"
          visibility={field[1].error ? 'visible' : 'hidden'}
        />
      </Container>
    </>
  );
};

export default SwitchComponent;

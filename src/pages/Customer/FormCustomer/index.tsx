import React, { HTMLAttributes, useCallback, useState } from 'react';
import { Form, Formik } from 'formik';
import { error } from '@pnotify/core';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { FormCustom } from './styles';

interface Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  functionAction: any;
  customer?: Customer;
}

const FormCustomer: React.FC<FormProps> = ({ functionAction, ...rest }) => {
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Informe a senha!')
      .min(8, 'A senha deve conter mais de 8 letras!'),
    email: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
    name: Yup.string().required('Informe um nome de usuario!'),
  });

  return (
    <>
      <FormCustom>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={functionAction}
          validationSchema={schema}
        >
          <Form>
            <Input name="name" label="Nome do Cliente" />
            <Input name="email" label="E-mail" />
            <Input name="password" type="password" label="Password" />
            <Input name="cpf" type="text" label="CPF" />
            <Button colorTheme="primary">Salvar</Button>
          </Form>
        </Formik>
      </FormCustom>
    </>
  );
};

export default FormCustomer;

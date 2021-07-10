import React, { useCallback } from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
import { error } from '@pnotify/core';
import { Wrapper } from './styles';
import { useAuth } from '../../../hooks/AuthContext';

interface User {
  email: string;
  password: string;
}

const MyForm = () => {
  const { signIn } = useAuth();
  const handlAuthenticate = useCallback(
    async (user: User) => {
      try {
        await signIn({
          email: user.email,
          password: user.password,
        });
      } catch (err) {
        error(err.response.data.message);
        console.log(err);
      }
    },
    [signIn],
  );

  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Informe a senha!')
      .min(8, 'A senha deve conter mais de 8 letras!'),
    email: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
  });
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handlAuthenticate}
      >
        <Form>
          <div>
            <Field name="email" placeholder="Email" /> <br />
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field name="password" placeholder="Senha" type="password" /> <br />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">ACESSAR</button>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default MyForm;

import React, { useCallback } from 'react'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Wrapper } from './styles'
import api from '../../../service/api';
import { alert } from '@pnotify/core';
import { useHistory } from 'react-router-dom';

interface User {
  email: string;
  name: string;
  password: string;
}






const MyForm = () => {
  const history = useHistory();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Informe o nome!')
      .min(5, 'O nome deve conter mais de 5 letras!')
      .max(100, 'O nome deve conter menos de 100 letras!')
      .notOneOf(['admin', 'administrador'], 'Esse nome não pode camarada!'),
    password: Yup.string()
      .required('Informe a senha!')
      .min(8, 'A senha deve conter mais de 8 letras!'),
    email: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!')
  })


  const handleSaveUser = useCallback(async (user: User) => {
    console.log(user);
    try{
      await api.post<User>('/users', user);
      alert({
        type: 'success',
        text: 'Usuário criado com sucesso!'
      });
      history.push('/login');
    }catch(err){
      alert({
        type: 'error',
        text: err.response.data.message
      });
    }
  
  }, [history])
  

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={schema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={handleSaveUser}>

        <Form>
          <div>
            <Field name="name" placeholder="Nome" /> <br />
            <ErrorMessage name="name" />
          </div>
          <div>
            <Field name="email" placeholder="Email" /> <br />
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field name="password" placeholder="Senha" type="password"/> <br />
            <ErrorMessage name="password" />
          </div>
          <button type="submit">CRIAR CONTA</button>
        </Form>

      </Formik>
   
    </Wrapper>
  )
}

export default MyForm;

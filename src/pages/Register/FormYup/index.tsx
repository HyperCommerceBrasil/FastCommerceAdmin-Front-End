import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Wrapper } from './styles'

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

const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ name: '', email: '', password: '' }),
  handleSubmit: values => {
    console.log(values)
  },
  isInitialValid: false,
  validateOnChange: true,
  validateOnBlur: true,
  displayName: 'MyForm',
  validationSchema: schema
})

const MyForm = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default enhanceWithFormik(MyForm)

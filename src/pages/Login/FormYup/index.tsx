import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Wrapper } from './styles'


const schema = Yup.object().shape({
  password: Yup.string()
    .required('Informe a senha!')
    .min(8, 'A senha deve conter mais de 8 letras!'),
  email: Yup.string()
    .required('Informe o email!')
    .email('Informe um email válido!')
})

const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
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
          <Field name="email" placeholder="Email" /> <br />
          <ErrorMessage name="email" />
        </div>
        <div>
          <Field name="password" placeholder="Senha" type="password"/> <br />
          <ErrorMessage name="password" />
        </div>
        <button type="submit">ACESSAR</button>
      </Form>
    </Wrapper>
  )
}

export default enhanceWithFormik(MyForm)

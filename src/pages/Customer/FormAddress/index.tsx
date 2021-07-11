import React, { HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
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
}

const FormAddress: React.FC<FormProps> = ({ functionAction, ...rest }) => {
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
            <Input name="name" label="Nome do Endereço" />
            <Input name="cep" label="CEP" />
            <Input name="city" type="text" label="Cidade" />
            <Input name="neighborbood" label="Bairro" />
            <Input name="street" label="Rua" />
            <Input name="number" type="text" label="Número" />
            <Button colorTheme="primary">Salvar</Button>
          </Form>
        </Formik>
      </FormCustom>
    </>
  );
};

export default FormAddress;

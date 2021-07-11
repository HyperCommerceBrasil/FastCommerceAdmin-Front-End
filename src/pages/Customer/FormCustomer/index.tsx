import React, { HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { formatCPF } from '../../../utils/masks/cpfMask';

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
  disabledPassword?: string;
}

const FormCustomer: React.FC<FormProps> = ({
  customer,
  disabledPassword,
  functionAction,
  ...rest
}) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
    name: Yup.string().required('Informe um nome de usuario!'),
  });

  return (
    <>
      <FormCustom>
        <Formik
          enableReinitialize
          initialValues={{
            name: customer?.name,
            email: customer?.email,
            password: '',
            cpf: formatCPF(String(customer?.cpf)),
          }}
          onSubmit={functionAction}
          validationSchema={schema}
        >
          <Form>
            <Input name="name" label="Nome do Cliente" />
            <Input name="email" label="E-mail" />
            <Input
              disabled={disabledPassword}
              placeholder={disabledPassword ? 'Campo Bloqueado :(' : ''}
              cursor="pointer"
              name="password"
              type="password"
              label="Password"
            />
            <Input name="cpf" type="text" label="CPF" />
            <Button colorTheme="primary">Salvar</Button>
          </Form>
        </Formik>
      </FormCustom>
    </>
  );
};

export default FormCustomer;

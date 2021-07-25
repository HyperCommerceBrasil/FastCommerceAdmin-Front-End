import React, { HTMLAttributes } from 'react';
import { Form, Formik } from 'formik';
// import * as Yup from 'yup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { FormCustom } from './styles';

interface Address {
  id: string;
  name: string;
  cep: string;
  uf: string;
  city: string;
  street: string;
  district: string;
  number: string;
  addressDefault: boolean;
}

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  functionAction: any;
  address: Address;
}

const FormAddress: React.FC<FormProps> = ({
  functionAction,
  address,
  ...rest
}) => {
  return (
    <>
      <FormCustom>
        <Formik
          initialValues={{
            cep: address.cep,
            name: address.name,
            city: address.city,
            district: address.district,
            street: address.street,
            number: address.number,
          }}
          enableReinitialize
          onSubmit={functionAction}
        >
          <Form>
            <Input name="name" label="Nome do Endereço" />
            <Input name="cep" label="CEP" />
            <Input name="city" label="Cidade" />
            <Input name="district" label="Bairro" />
            <Input name="street" label="Rua" />
            <Input name="number" label="Número" />
            <Button colorTheme="primary">Salvar</Button>
          </Form>
        </Formik>
      </FormCustom>
    </>
  );
};

export default FormAddress;

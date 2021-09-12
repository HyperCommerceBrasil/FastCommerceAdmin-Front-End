import React, { useState, useCallback, useEffect } from 'react';
import { Container } from './styles';

import Layout from '../layout';
import Table from '../../components/table';
import { Button } from '@material-ui/core';
import Button2 from './../../components/Button';
import ModalCustom from '../../components/Modal';
import Input from '../../components/Input';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { resolveResponse } from '../../utils/resolverResponse';
import Loader from './../../components/Loader/LinearLoader';

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  created_at: string;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get<Supplier[]>('/suppliers');
        setSuppliers(response.data);
      } catch {
        toast('Ocorreu um erro ao obter os dados :(', {
          type: 'error',
        });
      }
    }

    getData();
  }, []);

  const handleCreateSupplier = useCallback(async (data, { resetForm }) => {
    try {
      await api.post('/suppliers', data);
      setShowModal(false);
      const response = await api.get<Supplier[]>('/suppliers');
      setSuppliers(response.data);
      toast('Registro Criado com sucesso');
      resetForm({});
    } catch (err) {
      const msg = resolveResponse(err);

      toast(msg, {
        type: 'error',
      });
    }
  }, []);

  return (
    <>
      <ModalCustom show={showModal} closeModal={setShowModal}>
        <Formik
          initialValues={{
            name: '',
            cnpj: '',
          }}
          onSubmit={handleCreateSupplier}
          enableReinitialize
        >
          <Form>
            <Input
              name="name"
              placeholder="Nome do Fornecedor"
              label="Nome do Fornecedor"
            ></Input>
            <Input
              name="cnpj"
              placeholder="CNPJ do Fornecedor"
              label="CNPJ do Fornecedor"
            ></Input>
            <Button2 colorTheme="secondary">Criar Fornecedor</Button2>
          </Form>
        </Formik>
      </ModalCustom>
      <Layout>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Novo Fornecedor
        </Button>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>Nome do Fornecedor</th>
                <th>CNPJ</th>
                <th>Data de Criaçãop</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr>
                  <td>{supplier.name}</td>
                  <td>{supplier.cnpj}</td>
                  <td>{supplier.created_at}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Layout>
    </>
  );
};
export default SupplierList;

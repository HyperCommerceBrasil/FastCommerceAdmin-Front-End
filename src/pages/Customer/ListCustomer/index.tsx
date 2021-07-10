import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { error, success } from '@pnotify/core';
import { useLocation, useParams } from 'react-router-dom';

import api from '../../../services/api';
import Layout from '../../layout';
import Modal from '../../../components/Modal';
import Paginate from '../../../components/paginate';

import FormCustomer from '../FormCustomer';

import { Content, Title, ButtonsHeader, Container } from './styles';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader/LinearLoader';
import CircularLoader from '../../../components/Loader/SpinnerLoader';

interface Customer {
  name: string;
  email: string;
  cpf: string;
}

interface IResponse {
  customers: Customer[];
  totalPages: number;
}

const ListCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [loadTable, setLoadTable] = useState(false);
  const [loadForm, setLoadForm] = useState(false);

  const handleSaveCustomer = useCallback(
    async data => {
      try {
        setLoadForm(true);
        const response = await api.post('/customers', data);

        if (response.data) {
          success('Cliente cadastrado com sucesso');
          setShowModal(false);
        }

        window.location.reload();

        setLoadForm(false);
      } catch (err) {
        if (err) {
          error(err.response.data.message);
        }
        setLoadForm(false);
      }
    },
    [customers],
  );

  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const pageLink = query.get('page');

  useEffect(() => {
    async function getCustomers() {
      try {
        setLoadTable(true);
        const customers = await api.get<IResponse>(
          `/admin/customers?page=${pageLink}`,
        );

        setCustomers(customers.data.customers);
        setNumPages(customers.data.totalPages);
        setLoadTable(false);
      } catch (err) {
        setLoadTable(false);

        alert(err.response.data.message);
      }
    }

    getCustomers();
  }, []);

  return (
    <>
      <Layout>
        <Modal title="Novo Cliente" show={showModal} closeModal={setShowModal}>
          <CircularLoader show={loadForm} />
          <FormCustomer functionAction={handleSaveCustomer} />
        </Modal>
        <Container>
          <header>
            <Title>Clientes</Title>

            <ButtonsHeader>
              <Button
                colorTheme="secondary"
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Novo Cliente
              </Button>
            </ButtonsHeader>
          </header>
          <Content>
            <table>
              {/* <Loader show={loadTable} /> */}
              <thead>
                <tr>
                  <th>Nome do Cliente</th>
                  <th>CPF</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => {
                  return (
                    <tr key={customer.email}>
                      <td>{customer.name}</td>
                      <td>{customer.cpf}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button>Editar</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {/* <div>1</div>
                <div>2</div>
                <div>3</div> */}
            </table>
          </Content>
          <div
            style={{
              marginLeft: 'auto',
              width: '100%',
            }}
          >
            <>
              <Paginate nPages={numPages} />
            </>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default ListCustomer;

import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { error, success } from '@pnotify/core';
import { useHistory, useLocation } from 'react-router-dom';

import { FaArrowLeft } from 'react-icons/fa';
import api from '../../../services/api';
import Layout from '../../layout';
import Modal from '../../../components/Modal';
import { formatCPF } from '../../../utils/masks/cpfMask';

import FormCustomer from '../FormCustomer';

import { Content, Title, ButtonsHeader, Container } from './styles';
import Button from '../../../components/Button';
import CircularLoader from '../../../components/Loader/SpinnerLoader';

interface Customer {
  id: string;
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

  const [loadForm, setLoadForm] = useState(false);

  const handleSaveCustomer = useCallback(async data => {
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
        // error(err.response.data.message);
      }
      setLoadForm(false);
    }
  }, []);

  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const pageLink = query.get('page');

  useEffect(() => {
    async function getCustomers() {
      try {
        const customers = await api.get<IResponse>(
          `/admin/customers?page=${pageLink}`,
        );

        setCustomers(customers.data.customers);
      } catch (err) {
        error(err.response.data.message);
      }
    }

    getCustomers();
  }, [pageLink]);

  const history = useHistory();

  return (
    <>
      <Layout>
        <Modal title="Novo Cliente" show={showModal} closeModal={setShowModal}>
          <CircularLoader show={loadForm} />
          <FormCustomer functionAction={handleSaveCustomer} />
        </Modal>
        <Container>
          <header>
            <FaArrowLeft
              size={32}
              cursor="pointer"
              style={{ marginRight: '32px' }}
              onClick={() => {
                history.goBack();
              }}
            />
            <Title>Clientes</Title>
            <ButtonsHeader>
              <Button
                colorTheme="primary"
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
                      <td>{formatCPF(customer.cpf || '')}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            history.push(`/customers/update/${customer.id}`);
                          }}
                        >
                          Editar
                        </button>
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
          ></div>
        </Container>
      </Layout>
    </>
  );
};

export default ListCustomer;

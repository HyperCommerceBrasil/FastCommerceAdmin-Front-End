import React, { useState } from 'react';
import { useEffect } from 'react';
import api from '../../../services/api';
import Layout from '../../layout';

import { Content, Title, ButtonsHeader, Container } from './styles';

interface Customer {
  name: string;
  email: string;
  cpf: string;
}

const ListCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function getCustomers() {
      try {
        const customers = await api.get<Customer[]>('/admin/customers');

        setCustomers(customers.data);
      } catch (err) {
        alert(err.message);
      }
    }

    getCustomers();
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <header>
            <Title>Clientes</Title>

            <ButtonsHeader>
              <button>Novo Cliente</button>
            </ButtonsHeader>
          </header>
          <Content>
            <table>
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
                    <tr>
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
            </table>
          </Content>
        </Container>
      </Layout>
    </>
  );
};

export default ListCustomer;

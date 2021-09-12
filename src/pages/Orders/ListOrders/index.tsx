import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';

import Layout from '../../layout';
import Table from './../../../components/table';
import Loader from '../../../components/Loader/SpinnerLoader';
import Button from './../../../components/Button';
import Label from './../../../components/Label';
import api from '../../../services/api';
import Paginate from './../../../components/paginate';

import { useLocation } from 'react-router-dom';
import TableMaterial from '../../../components/TableMaterial';

interface Status {
  code: string;
  description: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  numberOrder: string;
  customer: Customer;
  status: Status;
  created_at: string;
}

const NewProduct: React.FC = () => {
  const [statusLoad, setStatusLoad] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [numPages, setNumPages] = useState(0);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const pageLink = query.get('page');

  const parseStatusColor = useCallback((status: string) => {
    switch (status) {
      case '1':
        return 'warning';
      case '2':
        return 'success';
      case '3':
        return 'danger';
      case '3':
        return 'warning';
    }
  }, []);
  useEffect(() => {
    const getOrders = async function () {
      try {
        console.log('response');
        const response = await api.get<Order[]>(`/orders?page=${pageLink}`);

        console.log(response.data);
        setOrders(response.data);
        // let pages = response.data[1] / 8;
        // setNumPages(response.data[1] / 8);
      } catch {
        alert('Ocorreu um asdas');
      }
    };
    console.log('response');
    getOrders();
  }, []);

  return (
    <>
      <Layout>
        <Loader show={statusLoad}></Loader>

        <Container>
          <header>
            <h1>Movimentação / Pedidos</h1>
          </header>
          <TableMaterial orders={orders}></TableMaterial>
          <section>
            {/* <Table>
              <thead>
                <tr>
                  <th>N. Pedido</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Pagamento</th>
                  <th>Data</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {orders[0].map(order => (
                  <>
                    <tr
                      onDoubleClick={() => {
                        alert('Clicou no pedido: ' + order.numberOrder);
                      }}
                    >
                      1231313
                      <td
                        style={{
                          width: '200px',
                        }}
                      >
                        {order.numberOrder}
                      </td>
                      <td>{order.customer.name}</td>
                      <td>
                        <Label colorTheme={parseStatusColor(order.status.code)}>
                          {order.status.description}
                        </Label>
                      </td>
                      <td>Cartão</td>
                      <td>
                        {Intl.DateTimeFormat('pt-BR').format(
                          new Date(order.created_at),
                        )}
                      </td>
                      <td>
                        <Button
                          colorTheme="primary"
                          onClick={() => {
                            alert(
                              'Clicou no botão de pedido: ' + order.numberOrder,
                            );
                          }}
                        >
                          Gerar Embarque
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table> */}
            {/* <Paginate
              nPages={numPages > 10 ? 10 : numPages}
              route="orders"
            ></Paginate> */}
            <strong style={{ color: 'red' }}>
              São mostrados sómente as 10 primeiras páginas da consulta
            </strong>
          </section>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;

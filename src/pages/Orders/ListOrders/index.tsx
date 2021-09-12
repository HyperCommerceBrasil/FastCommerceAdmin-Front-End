import React, { useEffect, useState } from 'react';
import { Container } from './styles';

import Layout from '../../layout';

import api from '../../../services/api';

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
  const [orders, setOrders] = useState<Order[]>([]);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const pageLink = query.get('page');

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
  }, [pageLink]);

  return (
    <>
      <Layout>
        <Container>
          <header>
            <h1>Movimentação / Pedidos</h1>
          </header>
          <TableMaterial orders={orders}></TableMaterial>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;

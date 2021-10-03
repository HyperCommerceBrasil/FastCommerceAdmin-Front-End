import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  PaymentAndFreight,
  CardDataOrder,
  CardCustom,
  ValueOrder,
  Totais,
  ComponentGroup,
  CardShipping,
} from './styles';

import Layout from '../../layout';
import MenuTab from '../../../components/MenuTab';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Table from '../../../components/table';
import { useParams } from 'react-router-dom';
import { resolveResponse } from '../../../utils/resolverResponse';
import { toast } from 'react-toastify';
import api from '../../../services/api';

interface Status {
  code: string;
  description: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}
interface Shipiment {
  id: string;
  shipmentNumber: string;
  tracking: string;
  shipmentItems: ShipmentItem[];
}

interface Image {
  id: string;
  image: string;
  key: string;
}

interface Product {
  id?: string;
  name: string;
  price: string;
  is_active: boolean;
  ean: string;
  price_promotional: string;
  description: string;
  details: string;
  trending: boolean;
  images: Image[];
  quantity: string;
  collectionId: string;
  isFreeShipping: boolean;
  supplierId: string;
  typeStorage: string;
}

interface OrderItem {
  id: string;
  quantity: number;
  value: number;
}

interface ShipmentItem {
  productId: string;
  product: Product;
  detailsItem: OrderItem;
}

interface Order {
  id?: string;
  numberOrder: string;
  customer: Customer;
  status: Status;
  created_at: string;
  street: string;
  uf: string;
  district: string;
  numberHouse: string;
  city: string;
  cep: string;
  total: number;
  shipments: Shipiment[];
}

const NewProduct: React.FC = () => {
  const [indiceMenu, setIndiceMenu] = useState(1);
  const [order, setOrder] = useState<Order>({} as Order);

  const { idOrder } = useParams<{ idOrder: string }>();

  useEffect(() => {
    async function getDataOrder() {
      try {
        const response = await api.get<Order>(`/orders/admin/${idOrder}`);

        setOrder(response.data);
      } catch (err) {
        const msg = resolveResponse(err.response);
        toast(msg, {
          type: 'error',
        });
      }
    }

    getDataOrder();
  }, [idOrder]);

  return (
    <>
      <Layout>
        <Container>
          <header>
            <h1>Detalhes do Pedido</h1>
          </header>

          <MenuTab
            setIndice={setIndiceMenu}
            indice={indiceMenu}
            tabs={[
              { name: 'DETALHES', value: 1 },
              { name: 'PRODUTOS', value: 2 },
            ]}
          />

          <Content show={indiceMenu === 1}>
            <section>
              <ComponentGroup>
                <PaymentAndFreight>
                  <h2>Metodo de Pagamento</h2>
                  <span>Cartão de Crédito</span>
                  <br />
                  <h2>Previsão de Entrega</h2>
                  <span>Será entregue de 31/08/2021 até 10/09/2021</span>
                  <br></br>
                  <span>
                    Rastreios:
                    {order.shipments?.map(shipped => {
                      return (
                        <>
                          <a
                            href="https://www.correios.com.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {shipped.tracking} <br></br>
                          </a>
                        </>
                      );
                    })}
                  </span>
                </PaymentAndFreight>
                <CardDataOrder>
                  <CardCustom>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <h1>Pedido #{order.numberOrder}</h1>
                      <strong style={{ color: '#1597D4', cursor: 'pointer' }}>
                        Ver Embarque
                      </strong>
                    </div>

                    <ValueOrder>
                      <div>
                        <strong>Frete:</strong>
                        <span>R$ 50,00</span>
                      </div>

                      <div>
                        <strong>Total dos Produtos:</strong>
                        <span>R$ 8.453,00</span>
                      </div>
                    </ValueOrder>

                    <Totais>
                      <h2>
                        Total do pedido:{' '}
                        {Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(order.total + 50)}
                      </h2>
                      <span>Em 3x de R$ 2.834,65 sem juros</span>
                    </Totais>
                  </CardCustom>
                </CardDataOrder>
              </ComponentGroup>
            </section>
            <section
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                margin: '0',
              }}
            >
              <h1>Cliente</h1>

              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Opções</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.customer?.name}</td>
                    <td>{order.customer?.email}</td>
                    <td>
                      <Button colorTheme="primary"> Detalhes</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </section>
            <section>
              <h1>Endereço</h1>

              <Card iconColor="green" color="white" style={{ width: '300px' }}>
                <span>
                  {order.street} - {order.numberHouse}
                </span>
                <span>
                  {order.district} {order.city}, {order.uf}
                </span>
                <span>{order.cep} Brasil</span>
              </Card>
            </section>
          </Content>

          <Content show={indiceMenu === 2}>
            <h1>Produtos</h1>

            {order.shipments?.map(shipped => {
              return (
                <>
                  <CardShipping>
                    <header>
                      <strong>Remessa: {shipped.shipmentNumber}</strong>
                      <span>Rastreio: {shipped.tracking}</span>
                    </header>

                    <Table>
                      <thead>
                        <tr>
                          <td>Image</td>
                          <td>Nome</td>
                          <td>Valor Unit</td>
                          <td>Quantidade</td>
                          <td>Total</td>
                        </tr>
                      </thead>
                      <tbody>
                        {shipped.shipmentItems.map(shipItem => {
                          return (
                            <tr>
                              <td>
                                <img
                                  src={shipItem.product.images[0].image}
                                  alt={shipItem.product.name}
                                ></img>
                              </td>
                              <td>{shipItem.product.name}</td>
                              <td>
                                {Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(shipItem.detailsItem.value)}
                              </td>
                              <td>{shipItem.detailsItem.quantity}</td>
                              <td>
                                {Intl.NumberFormat('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                }).format(
                                  shipItem.detailsItem.value *
                                    shipItem.detailsItem.quantity,
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </CardShipping>
                </>
              );
            })}
          </Content>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;

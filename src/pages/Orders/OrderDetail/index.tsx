import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Content,
  PaymentAndFreight,
  CardDataOrder,
  CardCustom,
  ValueOrder,
  Totais,
  ComponentGroup,
} from './styles';

import Layout from '../../layout';
import Loader from '../../../components/Loader/SpinnerLoader';
import MenuTab from '../../../components/MenuTab';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Table from '../../../components/table';

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
  id?: string;
  numberOrder: string;
  customer: Customer;
  status: Status;
  created_at: string;
}

const NewProduct: React.FC = () => {
  const [statusLoad, setStatusLoad] = useState(false);
  const [indiceMenu, setIndiceMenu] = useState(1);

  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <Loader show={statusLoad}></Loader>
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
                    Rastreios: QB257001984BR, QB25799548BR, BR4564984923
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
                      <h1>Pedido #2131859</h1>
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
                      <h2>Total do pedido: R$ 8.503,97</h2>
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
                    <td>Thales Morais de Almeida</td>
                    <td>thales.morais21@gmail.com</td>
                    <td>03809764043</td>
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
                <span>Rua Ernesto Alves - 1431</span>
                <span>Bairro Monsenhor WOlski São Luiz Gonzaga, RS</span>
                <span>978000-00 Brasil</span>
              </Card>
            </section>
          </Content>

          <Content show={indiceMenu === 2}>
            <h1>Produtos</h1>
          </Content>
        </Container>
      </Layout>
    </>
  );
};
export default NewProduct;

import React from 'react';

import { FaBoxes, FaDollarSign } from 'react-icons/fa';
import { Container, Content, CardCustom } from './style';
import Card from '../../components/Card';

const Dashboard: React.FC = () => {


  return (
    <Container>
      <h1>Dashboard</h1>

      <Content>
        <Card
          color="#45B45D"
          Icon={FaDollarSign}
          title="Vendas"
          subtitle="R$ 100,00 neste mês"
        />
        <Card
          color="#F08456"
          title="Pedidos"
          subtitle="R$ 100,00 neste mês"
          Icon={FaBoxes}
        />
      </Content>

      <CardCustom>
        <h1>Últimos Pedidos</h1>
        <div style={{ height: 400, width: '100%' }}>
          
        </div>
      </CardCustom>
    </Container>
  );
};

export default Dashboard;

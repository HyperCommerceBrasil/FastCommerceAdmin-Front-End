import React from 'react';
import Card from '../Card';

import { Container } from './styles';

const Table: React.FC = ({ children }) => {
  return (
    <Container>
      <Card color="white">
        <table>{children}</table>
      </Card>
    </Container>
  );
};

export default Table;

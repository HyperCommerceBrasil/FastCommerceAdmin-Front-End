import React from 'react';

import { Container } from './styles';

interface LabelProps {
  colorTheme?: 'danger' | 'success' | 'warning';
}

const Table: React.FC<LabelProps> = ({ colorTheme, children }) => {
  return (
    <Container colorTheme={colorTheme}>
      <label>{children}</label>
    </Container>
  );
};

export default Table;

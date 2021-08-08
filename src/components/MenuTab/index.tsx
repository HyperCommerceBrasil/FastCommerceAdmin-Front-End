import React from 'react';

import { Container, MenuItem } from './styles';

interface Tab {
  name: string;
  value: number;
}

interface PropsTabMenu {
  setIndice: any;
  indice: number;
  tabs: Tab[];
}

const MenuTab: React.FC<PropsTabMenu> = ({ setIndice, indice, tabs }) => {
  return (
    <Container>
      <ul>
        {tabs.map(tab => (
          <MenuItem
          key={tab.name}
            active={indice === tab.value}
            onClick={() => {
              setIndice(tab.value);
            }}
          >
            {tab.name}
          </MenuItem>
        ))}
      </ul>
    </Container>
  );
};

export default MenuTab;

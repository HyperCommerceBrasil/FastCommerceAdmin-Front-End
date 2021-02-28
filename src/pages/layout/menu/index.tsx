import React from 'react';

import { Link } from 'react-router-dom';
import {
  FaDashcube,
  FaProductHunt,
  FaDollarSign,
  FaChevronRight,
} from 'react-icons/fa';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import { MenuContainer, DropdownItems, MenuItem } from './style';

interface MenuProps {
  isVisible?: boolean;
}

const Layout: React.FC<MenuProps> = ({ children, isVisible }) => {
  return (
    <MenuContainer isVisible={isVisible}>
      <ul>
        <MenuItem>
          <Accordion
            style={{
              width: '100%',
              border: '0px',
              background: 'transparent',
              boxShadow: '0px 0px 0px 0px',
            }}
          >
            <AccordionSummary
              style={{
                background: 'transparent',
                border: 'transparent',
                minHeight: '40px',
                height: '24px',
              }}
            >
              <Link to="/">
                <FaDashcube size={16} /> Dashboard
              </Link>
            </AccordionSummary>
          </Accordion>
        </MenuItem>
        <MenuItem>
          <Accordion
            style={{
              width: '100%',
              border: '0px',
              background: 'transparent',
              boxShadow: '0px 0px 0px 0px',
            }}
          >
            <AccordionSummary
              expandIcon={<FaChevronRight />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                background: 'transparent',
                border: 'transparent',
                minHeight: '40px',
                height: '24px',
              }}
            >
              <FaProductHunt size={16} /> Produtos
            </AccordionSummary>

            <DropdownItems>
              <AccordionDetails id="dropdownmenu">
                <ul>
                  <li>
                    <Link to="/collections">Cadastro de Coleções</Link>
                  </li>
                  <li>
                    <Link to="/products">Cadastro de Produtos</Link>
                  </li>
                </ul>
              </AccordionDetails>
            </DropdownItems>
          </Accordion>
        </MenuItem>
        <MenuItem>
          <Accordion
            style={{
              width: '100%',
              border: '0px',
              background: 'transparent',
              boxShadow: '0px 0px 0px 0px',
            }}
          >
            <AccordionSummary
              expandIcon={<FaChevronRight />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                background: 'transparent',
                border: 'transparent',
                minHeight: '40px',
                height: '24px',
              }}
            >
              <Link to="/">
                <FaDollarSign size={16} /> Vendas
              </Link>
            </AccordionSummary>

            <DropdownItems>
              <AccordionDetails id="dropdownmenu">
                <ul>
                  <li>Pedidos</li>
                  <li>Pagamentos</li>
                </ul>
              </AccordionDetails>
            </DropdownItems>
          </Accordion>
        </MenuItem>
      </ul>
    </MenuContainer>
  );
};

export default Layout;

import React, { useState } from 'react';

import { FaAlignLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

import Menu from './menu';

import {
  Container,
  Options,
  Content,
  ContentContent,
  DropdownItens,
  ItemDropdown,
  ArrowBaloon,
} from './style';

const Layout: React.FC = ({ children }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [showUserOptions, setUserOptions] = useState(false);
  return (
    <Container>
      <header>
        <div>
          <img src={logo} alt="logo" />
        </div>
        <button
          type="button"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <FaAlignLeft size={24} />
        </button>

        <Options>
          <button
            onClick={() => {
              setUserOptions(!showUserOptions);
            }}
            type="button"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="user"
            />
          </button>
          <DropdownItens>
            <ItemDropdown>
              <Link to="/">Sair</Link>
            </ItemDropdown>
          </DropdownItens>
        </Options>
      </header>

      <Content>
        <Menu isVisible={showMenu} />

        <ContentContent>{children}</ContentContent>
      </Content>
    </Container>
  );
};

export default Layout;

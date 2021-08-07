import styled from 'styled-components';

interface MenuItemProps {
  active?: boolean;
}

export const Container = styled.div`
  padding: 16px;
  height: 60px;
  width: 100%;
  background: white;
  border: 1px silver solid;

  ul {
    display: inline-flex;
    list-style: none;
  }
`;

export const MenuItem = styled.li<MenuItemProps>`
  margin: 0 16px;
  cursor: pointer;
  color: ${props => (props.active ? '#34a3d7' : 'black')};
  font-weight: ${props => (props.active ? 'bold' : '400')};
  transition: 0.7s;
  &:hover {
    opacity: 0.3;
  }
`;

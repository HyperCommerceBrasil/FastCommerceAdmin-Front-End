import styled, { keyframes } from 'styled-components';

interface MenuProps {
  isVisible?: boolean;
}

const showMenuAnimation = keyframes`
  from { width: 100px; }
  to { width: -10px; display: none }
`;
export const MenuContainer = styled.div<MenuProps>`
  display: flex;
  flex-direction: column;
  transition: width 0.7s;
  flex-wrap: nowrap;

  width: ${props => (props.isVisible ? '300px' : '0px')};
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};

  height: ${`${window.innerHeight - 100}px`};
  overflow: hidden;
  background: #fbfbfb;
  margin-top: 1.5px;
  padding: 16px;
  animation: ${showMenuAnimation} 1s;

  ul {
    list-style: none;
    width: 100%;

    li {
      cursor: pointer;
      transition: ease-in-out 0.2s;

      svg {
        color: black;
      }
      a {
        font-weight: 700;
        overflow: hidden;
      }

      &:hover {
        margin-left: 4px;
        a {
          color: #34a3d7;
        }
        svg {
          color: #34a3d7;
        }
      }
    }
  }

  ::-webkit-scrollbar-track {
    background-color: #f4f4f4;
  }
  ::-webkit-scrollbar {
    width: 6px;
    background: #f4f4f4;
  }
  ::-webkit-scrollbar-thumb {
    background: #dad7d7;
  }
`;

export const DropdownItems = styled.div``;

export const MenuItem = styled.li`
  overflow: hidden;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  svg {
    margin-right: 8px;
  }
  a {
    text-decoration: none;
    color: #000;
  }

  ul {
    list-style: circle;
    margin-left: 24px;
    min-width: 200px;

    li {
      margin: 10px;
      font-weight: lighter;
      transition: color 0.5s;

      &:hover {
        color: #34a3d7;
        font-weight: 500;
      }
    }
  }
`;

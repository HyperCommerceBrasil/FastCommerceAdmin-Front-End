import styled, { keyframes } from 'styled-components';

const showMenuAnimation = keyframes`
  from { visibility: hidden; }
  to { visibility: visible }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  header {
    display: flex;
    flex-direction: row;
    background: #fbfbfb;
    box-shadow: 0px 4px 7px -3px rgba(0, 0, 0, 0.25);
    width: 100%;
    padding: 30px;
    padding-top: 20px;
    padding-bottom: 20px;

    
  }
  svg {
    color: #34a3d7;
  }
`;

export const ButtonHeader = styled.div`
  height: 30px;
  width: 30px;
  background: transparent;
  border: transparent;
  margin-left: 64px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const Options = styled.div`
  margin-left: auto;
  margin-right: 50px;

  &:hover {
    ul {
      visibility: visible;
    }
    div {
      visibility: visible;
    }
  }
  img {
    border-radius: 100%;
    height: 48px;
    width: 48px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const ContentContent = styled.div`
  padding: 32px;
  width: 100%;
  overflow: scroll;
`;

export const DropdownItens = styled.ul`
  background: #fff;
  box-shadow: 1px 2px 4px 0px rgb(93 90 90 / 23%);
  border: silver 1px solid;
  border-radius: 4px;

  position: absolute;
  right: 20px;
  width: 100px;
  top: 80px;
  visibility: hidden;
  animation: ${showMenuAnimation};
  list-style: none;
  min-height: 50px;
  display: flex;
`;

export const ItemDropdown = styled.li`
  background-size: cover;
  width: 100%;
  margin: 10px 0;
  display: flex;

  a {
    text-decoration: none;
    text-align: center;
    margin: auto;
    color: #000;
  }

  &:hover {
    background: silver;
  }
`;

export const ArrowBaloon = styled.div`
  width: 20px;
  background: transparent;
  border: silver 1px solid;
  visibility: hidden;
  position: absolute;
  height: 30px;
  top: 75px;
  transform: rotate(45deg);
  right: 30px;
`;

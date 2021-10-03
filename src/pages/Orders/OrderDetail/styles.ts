import styled from 'styled-components';

interface ContentProps {
  show: boolean;
}

export const ContentMenu = styled.div``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    border-bottom: 1px solid silver;
    button {
      margin-left: auto;
      margin-right: 50px;
      width: 200px;
      height: 50px;
      color: white;
      background: #60b4da;
      border-radius: 8px;
    }
  }
`;

export const CardShipping = styled.div`
  border-radius: 5px;
  header {
    display: flex;
    flex-direction: row;
    background: #f0f2f2;
    height: 50px;
    border-radius: 10px 10px 0 0;
    border: 1px black solid;

    span {
      margin-left: auto;
    }
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  padding: 32px;
  background: white;
  display: ${props => (props.show ? 'flex' : 'none')};
  flex: 1;
  flex-direction: column;

  section {
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-top: 16px;
    width: 100%;

    h1 {
      margin-left: 32px;
      margin-bottom: 8px;
    }
  }
`;

export const ComponentGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
`;

export const PaymentAndFreight = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 128px;

  h3 {
    margin-top: 8px;
  }
`;

export const CardDataOrder = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardCustom = styled.div`
  background: white;
  border: silver 1px solid;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
  height: 255px;
`;

export const ValueOrder = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  border-bottom: 1px solid black;

  div {
    display: flex;
    flex-direction: row;
    span {
      margin-left: auto;
    }
  }
`;

export const Totais = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-top: 16px;

  h2 {
    color: #b12705;
    font-size: 20px;
  }
`;

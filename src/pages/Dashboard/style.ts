import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: row;
  flex-wrap: wrap;

  > div {
    width: 45%;
    margin: 16px;

    @media (max-width: 930px) {
      width: 100%;
    }
  }
`;

export const CardCustom = styled.div`
  background: white;
  border: 1px silver solid;
  border-radius: 8px solid !important;
  box-shadow: 1px 1px 0px 0px rgb(0 0 0 / 34%);
  height: 500px;
  padding: 15px;
`;

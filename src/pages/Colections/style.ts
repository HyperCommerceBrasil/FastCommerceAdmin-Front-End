import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid rgb(216 216 216 / 73%);
  }
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
  border-radius: 0, 0, 15px;
  height: 500px;
  padding: 15px;
  overflow-y: scroll;
`;

export const Options = styled.div`
  margin-left: auto;

  button {
    width: 200px;
    background: #303f9f;
  }
`;

export const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  color: #9f9f9f;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 16px;
`;

export const ContentModal = styled.div``;

export const FooterModal = styled.div`
  border-top: 1px silver solid;
  button {
    width: 100px;
    height: 40px;
    margin: 8px;
  }
`;

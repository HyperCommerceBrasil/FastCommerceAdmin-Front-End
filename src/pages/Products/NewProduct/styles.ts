import styled from 'styled-components';

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

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: white;
  padding: 5vh 0vw;
`;

export const GridImages = styled.div`
  border: 1px solid black;
  display: 'flex';
  flex-wrap: 'wrap';
  justify-content: 'space-around';
  overflow-y: scroll;
  height: 350px;
  width: 500px;
  img {
    height: 150px;
    width: 150px;
  }
`;

export const FormCustom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div {
    margin: 8px 16px;
    width: 100%;
  }
  margin-bottom: 16px;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: row;

  form {
    display: flex;
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

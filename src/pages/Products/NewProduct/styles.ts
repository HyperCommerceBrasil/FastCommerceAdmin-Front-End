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
  width: 100%;
  padding: 16px;
  background: white;
  display: flex;
  flex: 1;
  flex-direction: row;

  form {
    width: 100%;
  }
`;

export const ContentDropZone = styled.div`
  border: 1px solid silver;
  margin: 16px;
  padding: 8px;
  width: 350px;
  transition: 0.7 ease-in-out;
  div {
    margin: auto;
   
  }

  &:hover {
    border: #1698D3 solid 1px;
    border-radius: 5px;
  }
  
  max-height: 400px;
  min-width: 320px;
  border-style: dotted;


  img {
    max-width: 100%;
    max-height: 100%;
  }
  display: flex;

  p{
    text-align: center;
    margin: auto;
  }
`;




export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    margin: 8px 0;
    width: 100%;
  }

`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

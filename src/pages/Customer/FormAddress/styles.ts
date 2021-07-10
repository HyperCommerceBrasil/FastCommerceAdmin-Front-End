import styled from 'styled-components';

export const FormCustom = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;

    button {
      width: 100%;
      margin: auto;
    }
    > div {
      margin: 5px 5px;
      width: 100%;
    }
  }
`;
